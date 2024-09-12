import React from "react";
import { Marker } from "react-map-gl";
import { useState, useEffect } from "react";

const Ambulance = ({ lon, lat, path }) => {
  const [newLon, setNewLon] = useState(lon);
  const [newLat, setNewLat] = useState(lat);

  useEffect(() => {
    if (path) {
      const interval = setInterval(() => {
        if (path.length === 0) {
          clearInterval(interval);
          return;
        }
        const [newLon, newLat] = path.shift();
        setNewLon(newLon);
        setNewLat(newLat);
      }, 5);
      return () => clearInterval(interval);
    }
  }, [path]);

  return (
    <Marker longitude={newLon} latitude={newLat}>
      <img
        width="24"
        height="24"
        src="https://img.icons8.com/parakeet/48/ambulance.png"
        alt="ambulance"
      />
    </Marker>
  );
};

export default Ambulance;
