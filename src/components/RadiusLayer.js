import React from "react";
import { Marker, Layer, Source } from "react-map-gl";
import * as turf from "@turf/turf";

export default function RadiusLayer({ lon, lat, radius, id }) {
  const circle = turf.circle([lon, lat], radius);
  const line = turf.lineString(...circle.geometry.coordinates);

  return (
    <>
      <Marker longitude={lon} latitude={lat}>
        <img
          width="24"
          height="24"
          src="https://img.icons8.com/color/48/hospital.png"
          alt="hospital"
        />
      </Marker>

      <Source id={`circleSource${id}`} type="geojson" data={circle}>
        <Layer
          id={`circleLayer${id}`}
          type="fill"
          paint={{
            "fill-color": "#FF0000",
            "fill-opacity": 0.1,
            "fill-outline-color": "yellow",
          }}
        />
      </Source>

      <Source id={`lineSource${id}`} type="geojson" data={line}>
        <Layer
          id={`lineLayer${id}`}
          type="line"
          paint={{
            "line-color": "black",
            "line-width": 0.5,
          }}
        />
      </Source>
    </>
  );
}
