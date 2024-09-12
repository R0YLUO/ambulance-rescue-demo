import React from "react";
import { Marker } from "react-map-gl";

export default function Incident({ lon, lat, id }) {
  return (
    <Marker longitude={lon} latitude={lat} key={id}>
      <img
        width="12"
        height="12"
        src="https://img.icons8.com/fluency-systems-filled/48/triangle.png"
        alt="triangle"
      />
    </Marker>
  );
}
