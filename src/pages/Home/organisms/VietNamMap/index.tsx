// libs
import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
// others
import classes from "./VietNamMap.module.scss";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

const hanoiPosition = { lat: 21.0278, lng: 105.8342 };
const saigonPosition = { lat: 10.8231, lng: 106.6297 };
const markerIcon = Leaflet.icon({
  iconUrl: "/images/location-marker.png",
  iconRetinaUrl: "/images/location-marker.png",
  iconSize: new Leaflet.Point(100, 100),
});

/**
 * VietNamMap
 */
export default function VietNamMap() {
  const [json, setJson] = useState<any>();
  useEffect(() => {
    fetch("/geojson/vnm1.geojson")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setJson(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (!json) return null;
  return (
    <div className={classes.root}>
      <MapContainer
        center={hanoiPosition}
        zoom={12}
        style={{ height: "calc(100vh - 37px)" }}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          minZoom={0}
          maxZoom={18}
        />
        <GeoJSON
          key="VN"
          data={json}
          onEachFeature={(feature, layer) => {
            layer.bindPopup(feature.properties.NAME_1);
          }}
          style={{
            fill: false,
            weight: 1,
          }}
        />
        <Marker position={hanoiPosition} icon={markerIcon}>
          <Popup>
            <div>
              <h2>Hanoi</h2>
              <p>Hanoi is the capital of Vietnam.</p>
            </div>
          </Popup>
        </Marker>
        <Marker position={saigonPosition} icon={markerIcon}>
          <Popup>
            <div>
              <h2>Ho Chi Minh City</h2>
              <p>Ho Chi Minh City is the largest city in Vietnam.</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
