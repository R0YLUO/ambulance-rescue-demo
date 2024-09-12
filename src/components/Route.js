import React, { useState, useEffect } from "react";
import { Source, Layer } from "react-map-gl";

const Route = ({ route, id }) => {

  return (
    <Source
      id={`route-source-${id}`}
      type="geojson"
      data={route}
    >
      <Layer
        id={`route-layer-${id}`}
        type="line"
        paint={{
          "line-color": "lightblue",
          "line-width": 2,
        }}
      />
    </Source>
  );
};

export default Route;
