// libs
import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
// others
import classes from "./VietNamMap.module.scss";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import MarkersRenderer from "../MarkersRenderer";
import { HANOI_COORDINATES } from "@/constants/coordinates";

function shortenCoordinatesList({
  _coordinates,
  pointsQty,
}: {
  _coordinates: any[];
  pointsQty: number;
}): [number, number][] {
  const coordinates = flat(flat(flat(_coordinates)));
  const coordsQty = coordinates.length;
  const increaseUnit = Math.round(coordsQty / pointsQty);
  const result = [];

  for (let i = 0; i < pointsQty; i += 1) {
    const coords = getCoords(coordinates[i * increaseUnit]);
    result.push(coords);
  }
  return result;

  function getCoords(coords: any[]): [number, number] {
    if (typeof coords[0] === "number") return coords as any;
    return getCoords(coords[0]);
  }
  function flat(coords: any[]): any[] {
    let result: any[] = [];
    for (let i = 0; i < coords.length; i += 1) {
      if (typeof coords[i][0] === "number") result.push(coords[i]);
      else result = [...result, ...coords[i]];
    }
    return result;
  }
}
function getCenterCoordinates(
  coordinates: [number, number][],
): [number, number] {
  const numCoords = coordinates.length;

  if (numCoords === 0) {
    return [0, 0];
  }

  let x = 0;
  let y = 0;
  let z = 0;

  for (let i = 0; i < coordinates.length; i += 1) {
    const coord = coordinates[i];
    const latitude = (coord[1] * Math.PI) / 180;
    const longitude = (coord[0] * Math.PI) / 180;

    x += Math.cos(latitude) * Math.cos(longitude);
    y += Math.cos(latitude) * Math.sin(longitude);
    z += Math.sin(latitude);
  }

  x /= numCoords;
  y /= numCoords;
  z /= numCoords;

  const centralLongitude = Math.atan2(y, x);
  const centralSquareRoot = Math.sqrt(x * x + y * y);
  const centralLatitude = Math.atan2(z, centralSquareRoot);

  const center: [number, number] = [
    (centralLatitude * 180) / Math.PI,
    (centralLongitude * 180) / Math.PI,
  ];

  return center;
}

/**
 * VietNamMap
 */
export default function VietNamMap() {
  const [json, setJson] = useState<any>();
  const [ducht, setDucht] = useState([0, 0]);

  useEffect(() => {
    fetch("/geojson/vnm1.geojson")
      .then((res) => res.json())
      .then((res) => {
        const shorterCoordinates = shortenCoordinatesList({
          _coordinates: res.features[0].geometry.coordinates,
          pointsQty: 10,
        });
        setDucht(getCenterCoordinates(shorterCoordinates));
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
        center={HANOI_COORDINATES}
        zoom={12}
        style={{ height: "calc(100vh - 37px)" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
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
        <MarkersRenderer ducht={ducht} />
      </MapContainer>
    </div>
  );
}
