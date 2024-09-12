import React from "react";
import { Marker } from "react-map-gl";
import { ambulances } from "@/data/test";
import { Source, Layer } from "react-map-gl";
import * as turf from "@turf/turf";
import Incident from "./Dispatch";

const legendStyle = {
  position: "absolute",
  top: "20px",
  left: "20px",
  background: "rgba(255, 255, 255, 0.8)",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  display: "flex",
  "flex-direction": "column",
};

const itemStyle = {
  display: "flex",
  "align-items": "center",
};

const logo1Style = {
  "margin-right": "6px",
  "margin-left": "3px"
};

const logo2Style = {
  "margin-right": "3px",
};

const incident = {
  lon: 144.966248,
  lat: -37.807689,
};

const route = [
  [144.958313, -37.817809],
  [144.958345, -37.8178],
  [144.958907, -37.817637],
  [144.958948, -37.817625],
  [144.958984, -37.817614],
  [144.959016, -37.817605],
  [144.959067, -37.817592],
  [144.959102, -37.817581],
  [144.959165, -37.817562],
  [144.959215, -37.817547],
  [144.959245, -37.817538],
  [144.959688, -37.817408],
  [144.96, -37.817319],
  [144.960031, -37.817311],
  [144.960202, -37.817261],
  [144.960313, -37.817229],
  [144.96045, -37.817189],
  [144.960643, -37.817133],
  [144.961098, -37.817],
  [144.961387, -37.816916],
  [144.961416, -37.816907],
  [144.961508, -37.816881],
  [144.961487, -37.816841],
  [144.961337, -37.816532],
  [144.961201, -37.816253],
  [144.961136, -37.816105],
  [144.961094, -37.81601],
  [144.961077, -37.815965],
  [144.961061, -37.815932],
  [144.960745, -37.815274],
  [144.960665, -37.815087],
  [144.960632, -37.815014],
  [144.960615, -37.814972],
  [144.960603, -37.814942],
  [144.960587, -37.814904],
  [144.960575, -37.814878],
  [144.96051, -37.814734],
  [144.960415, -37.814528],
  [144.960354, -37.814396],
  [144.960195, -37.81405],
  [144.960169, -37.813995],
  [144.960158, -37.81396],
  [144.959865, -37.813302],
  [144.959787, -37.813127],
  [144.959752, -37.813055],
  [144.959707, -37.812961],
  [144.959681, -37.812907],
  [144.959576, -37.812679],
  [144.95931, -37.812086],
  [144.959287, -37.812039],
  [144.959266, -37.811991],
  [144.959115, -37.811681],
  [144.959062, -37.811572],
  [144.95888, -37.811176],
  [144.95887, -37.811153],
  [144.958836, -37.811083],
  [144.958817, -37.81104],
  [144.958807, -37.811017],
  [144.958794, -37.810986],
  [144.958943, -37.810944],
  [144.959008, -37.810925],
  [144.959376, -37.810819],
  [144.959848, -37.810684],
  [144.960295, -37.810553],
  [144.96081, -37.810403],
  [144.960934, -37.810368],
  [144.961185, -37.810297],
  [144.96126, -37.810276],
  [144.961317, -37.810257],
  [144.96135, -37.810246],
  [144.961403, -37.810231],
  [144.96146, -37.810215],
  [144.961517, -37.810198],
  [144.962137, -37.810022],
  [144.96282, -37.809819],
  [144.963588, -37.809585],
  [144.963622, -37.809575],
  [144.963653, -37.809566],
  [144.963718, -37.809549],
  [144.963743, -37.809542],
  [144.963777, -37.809533],
  [144.963786, -37.809531],
  [144.96382, -37.809521],
  [144.963861, -37.80951],
  [144.963949, -37.809486],
  [144.963973, -37.809478],
  [144.96436, -37.809365],
  [144.964833, -37.809226],
  [144.965546, -37.809017],
  [144.966106, -37.808853],
  [144.966125, -37.808848],
  [144.966208, -37.808823],
  [144.966183, -37.808772],
  [144.965984, -37.808345],
  [144.965739, -37.80782],
  [144.965891, -37.807775],
  [144.965955, -37.807757],
  [144.966241, -37.807673],
];

const textStyle = {
  margin: "10px",
  display: "flex",
  "justify-content": "center" /* Horizontally center text */,
  "align-items": "center" /* Vertically center text */,
  display: "inline-block",
};

const Hardcoded = () => {
  return (
    <div>
      <div style={legendStyle}>
        <h2>Legend</h2>
        <div style={itemStyle}>
          <img
            width="18"
            height="18"
            src="https://img.icons8.com/fluency-systems-filled/48/triangle.png"
            alt="triangle"
            style={logo1Style}
          />
          <span style={textStyle}>Reported incident</span>
        </div>
        <div style={itemStyle}>
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/color/48/hospital.png"
            alt="hospital"
            style={logo2Style}
          />
          <span style={textStyle}>AV Station</span>
        </div>
      </div>

      {ambulances &&
        ambulances.map((ambulance, index) => (
          <Marker
            longitude={ambulance.lon}
            latitude={ambulance.lat}
            key={index}
          >
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/parakeet/48/ambulance.png"
              alt="external-ambulance-medical-kiranshastry-lineal-color-kiranshastry-1"
            />
          </Marker>
        ))}
      <Source
        id={`route-source-4`}
        type="geojson"
        data={turf.lineString(route)}
      >
        <Layer
          id={`route-layer-4`}
          type="line"
          paint={{
            "line-color": "lightblue",
            "line-width": 2,
          }}
        />
      </Source>
      <Marker longitude={incident.lon} latitude={incident.lat}>
        <img
          width="12"
          height="12"
          src="https://img.icons8.com/fluency-systems-filled/48/triangle.png"
          alt="triangle"
        />
      </Marker>
    </div>
  );
};

export default Hardcoded;
