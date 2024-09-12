import { Marker } from "react-map-gl";

export default function Incident({ lon, lat }) {
  return (
    <Marker longitude={lon} latitude={lat}>
      <img
        width="24"
        height="24"
        src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/external-ambulance-medical-kiranshastry-lineal-color-kiranshastry-1.png"
        alt="external-ambulance-medical-kiranshastry-lineal-color-kiranshastry-1"
      />
    </Marker>
  );
}
