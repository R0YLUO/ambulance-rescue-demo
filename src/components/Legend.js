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
  "margin-left": "3px",
};

const logo2Style = {
  "margin-right": "3px",
};

const textStyle = {
  margin: "10px",
  display: "flex",
  "justify-content": "center" /* Horizontally center text */,
  "align-items": "center" /* Vertically center text */,
  display: "inline-block",
};

const Legend = () => {
  return (
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
  );
};

export default Legend;
