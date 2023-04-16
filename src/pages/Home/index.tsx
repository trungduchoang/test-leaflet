import TopTitle from "./organisms/TopTitle";
import VietNamMap from "./organisms/VietNamMap"; // components

// others
import classes from "./Home.module.scss";
import { MapContainer } from "react-leaflet";
import { HANOI_COORDINATES } from "@/constants/coordinates";

/**
 * HomePage
 */
export default function HomePage() {
  return (
    <div className={classes.root}>
      <TopTitle />
      <MapContainer
        center={HANOI_COORDINATES}
        zoom={10}
        style={{ height: "calc(100vh - 37px)" }}
      >
        <VietNamMap />
      </MapContainer>
    </div>
  );
}
