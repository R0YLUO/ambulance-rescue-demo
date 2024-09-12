import React from "react";
import { Marker } from "react-map-gl";

export default function Station({ lon, lat, id }) {
  return (
    <Marker longitude={lon} latitude={lat}>
      <img
        width="24"
        height="24"
        src="https://img.icons8.com/color/48/hospital.png"
        alt="hospital"
      />
    </Marker>
  );
}
