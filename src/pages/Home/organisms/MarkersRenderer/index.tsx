// libs
import { HANOI_COORDINATES, HCM_COORDINATES } from "@/constants/coordinates";
import Leaflet from "leaflet";
import { Marker, Popup, useMapEvent } from "react-leaflet";

// const markerIcon = Leaflet.icon({
//   iconUrl: "/images/location-marker.png",
//   iconRetinaUrl: "/images/location-marker.png",
//   iconSize: new Leaflet.Point(100, 100),
// });

export default function MarkersRenderer({ ducht }:any) {
  useMapEvent("zoomend", (e) => {
    console.log(e.target.getZoom());
  });

  const saigonIcon = Leaflet.divIcon({ html: "<div>ssssS</div>" });

  return (
    <>
      <Marker position={ducht} icon={saigonIcon}>
        <Popup>
          <div>
            <h2>Hanoi</h2>
            <p>Hanoi is the capital of Vietnam.</p>
          </div>
        </Popup>
      </Marker>
      {/* <Marker position={HCM_COORDINATES} icon={saigonIcon}>
        <Popup>
          <div>
            <h2>Ho Chi Minh City</h2>
            <p>Ho Chi Minh City is the largest city in Vietnam.</p>
          </div>
        </Popup>
      </Marker> */}
    </>
  );
}
