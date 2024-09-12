import { useState, useEffect } from "react";
import Map, { Popup, Source, Layer } from "react-map-gl";
import Station from "@/components/Station";
import Incident from "@/components/Incident";
import Ambulance from "@/components/Ambulance";
import Route from "@/components/Route";
import Legend from "@/components/Legend";
import { incidents, coordinates, r1, r2 } from "@/data/test";
import stations from "@/data/stations";
import extractCoordinates from "@/util/geojsonToLonLat";
import * as turf from "@turf/turf";
import axios from "axios";
import polyline from "@mapbox/polyline";
import { ambulances } from "@/data/ambulance";
import interpolateCoordinates from "@/util/interpolate";
import findClosestCoordinate from "@/util/findClosest";

import "mapbox-gl/dist/mapbox-gl.css";

// const line = turf.lineString(coordinates);
const stationCoords = extractCoordinates(stations);
const MAP_KEY =
  "pk.eyJ1Ijoicm9sdW8iLCJhIjoiY2xseWozaHpvMWEwNTNjcDRuM3RjaHFlZiJ9.sQ7E4iUHjiS88_iHLlMJvA";

function App() {
  const [popup, setPopup] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [routes, setRoutes] = useState([]); // List of polylines
  const [incidentLoading, setIncidentLoading] = useState(false);
  const [error, setError] = useState("");
  const [vehicle1, setVehicle1] = useState();
  const [vehicle2, setVehicle2] = useState();
  const [vehicle3, setVehicle3] = useState();
  const [vehicle4, setVehicle4] = useState();
  const [vehicles, setVehicles] = useState(ambulances);


  const fetchRouteData = async (start, finish) => {
    const res = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${finish[0]},${finish[1]}?access_token=${MAP_KEY}&geometries=polyline&language=en&overview=full&steps=true`
    );
    return res.data.routes[0].geometry;
  };

  const handleMapClick = (event) => {
    setPopup({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    });
  };

  const createIncident = async () => {
    const closestCoordinateId = findClosestCoordinate(
      [popup.longitude, popup.latitude],
      vehicles
    );
    const closestAmbulance = vehicles[closestCoordinateId - 1];
    const res = await fetchRouteData(
      [popup.longitude, popup.latitude],
      [closestAmbulance.lon, closestAmbulance.lat]
    );

    setIncidents([
      ...incidents,
      { longitude: popup.longitude, latitude: popup.latitude },
    ]);
    setVehicles(
      vehicles.map((vehicle) => {
        if (vehicle.id === closestAmbulance.id) {
          return {
            ...vehicle,
            available: false,
          };
        }
        return vehicle;
      })
    );
    return {
      res,
      vehicle: closestAmbulance,
    };
  };

  const getRouteData = async (incidentProperties) => {
    const flippedCoords = polyline
      .decode(incidentProperties.res)
      .map(([lat, lng]) => [lng, lat]);
    const coordinates = flippedCoords.reverse();
    setRoutes([...routes, turf.lineString(coordinates)]);
    switch (incidentProperties.vehicle.id) {
      case 1:
        setVehicle1(interpolateCoordinates(coordinates));
        break;
      case 2:
        setVehicle2(interpolateCoordinates(coordinates));
        break;
      case 3:
        setVehicle3(interpolateCoordinates(coordinates));
        break;
      case 4:
        setVehicle4(interpolateCoordinates(coordinates));
        break;
    }
    return true;
  };

  const executeDispatch = async () => {
    setIncidentLoading(true);
    const incidentId = await createIncident();
    if (!incidentId) {
      setError("Incident creation failed");
      setIncidentLoading(false);
    }
    if (!(await getRouteData(incidentId))) {
      setError("Route data failed");
      setIncidentLoading(false);
    }
    setIncidentLoading(false);
    setPopup(null);
  };

  const handleReport = () => {
    executeDispatch();
    // if (routes.length == 0) {
    //   const coordinates = polyline.decode(r1).map(([lat, lng]) => [lng, lat]);
    //   setRoutes([...routes, turf.lineString(coordinates)]);
    //   setVehicle1(interpolateCoordinates(coordinates));
    //   return
    // }
    // const coordinates2 = polyline.decode(r2).map(([lat, lng]) => [lng, lat]);
    // setRoutes([...routes, turf.lineString(coordinates2)]);
    // setVehicle2(interpolateCoordinates(coordinates2));
  };

  return (
    <Map
      mapboxAccessToken={MAP_KEY}
      initialViewState={{
        longitude: 144.9631,
        latitude: -37.8136,
        zoom: 14,
      }}
      style={{ width: "100%", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/light-v10"
      onClick={handleMapClick}
    >
      {popup && (
        <Popup
          longitude={popup.longitude}
          latitude={popup.latitude}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setPopup(null)}
        >
          {incidentLoading ? (
            <p>Reporting incident...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <button onClick={handleReport}>Report an incident</button>
          )}
        </Popup>
      )}

      {stationCoords &&
        stationCoords.map((coords, index) => {
          return (
            <Station key={index} lon={coords.lon} lat={coords.lat} id={index} />
          );
        })}

      {incidents.length > 0 &&
        incidents.map((incident, index) => (
          <Incident
            lon={incident.longitude}
            lat={incident.latitude}
            id={index}
            key={index}
          />
        ))}

      {routes.length > 0 &&
        routes.map((route, index) => (
          <Route route={route} key={index} id={index} />
        ))}

      <Ambulance
        lon={ambulances[0].lon}
        lat={ambulances[0].lat}
        path={vehicle1}
      />
      <Ambulance
        lon={ambulances[1].lon}
        lat={ambulances[1].lat}
        path={vehicle2}
      />
      <Ambulance
        lon={ambulances[2].lon}
        lat={ambulances[2].lat}
        path={vehicle3}
      />
      <Ambulance
        lon={ambulances[3].lon}
        lat={ambulances[3].lat}
        path={vehicle4}
      />

      <Legend />
    </Map>
  );
}

export default App;
