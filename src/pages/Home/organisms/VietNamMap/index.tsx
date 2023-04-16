// libs
import Leaflet from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  useMapEvent,
} from "react-leaflet";
// others
import classes from "./VietNamMap.module.scss";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import SitesRenderer from "../SitesRenderer";
import { HANOI_COORDINATES } from "@/constants/coordinates";
import { useAsync } from "@/hooks/useAsync";
import { TGeoKey, TMarkerData, TMarkerKey } from "../../types";
import FruitRenderer from "../FruitRenderer";

/**
 * VietNamMap
 */
export default function VietNamMap() {
  const [geoJson, setGeoJson] = useState<any>();
  const [geoKey, setGeoKey] = useState<TGeoKey>("");
  const [markersData, setMarkersData] = useState<TMarkerData[]>([]);
  const [markerKey, setMarkerkey] = useState<TMarkerKey>("");
  const [zoom, setZoom] = useState(10);
  const {
    response: provinceGeoJson,
    execute: fetchProvinceGeoJson,
  } = useAsync(() =>
    fetch("/geojson/vn_provinces.geojson").then((res) => res.json()),
  );
  const {
    response: districtGeoJson,
    execute: fetchDistrictGeoJson,
  } = useAsync(() =>
    fetch("/geojson/vn_districts.geojson").then((res) => res.json()),
  );
  const {
    response: { data: provinceCenters = [] } = {},
    execute: fetchProvinceCenters,
  } = useAsync(() =>
    fetch("/geojson/vn_provinces_center_points.json").then((res) => res.json()),
  );
  const {
    response: { data: districtCenters = [] } = {},
    execute: fetchDistrictCenters,
  } = useAsync(() =>
    fetch("/geojson/vn_districts_center_point.json").then((res) => res.json()),
  );

  useEffect(() => {
    fetchProvinceGeoJson({
      cbSuccess: (res) => {
        setGeoJson(res as any);
        setGeoKey("province");
        setMarkerkey("province");
        setTimeout(() => {
          fetchDistrictGeoJson({});
        }, 100);
      },
    });
    fetchProvinceCenters({
      cbSuccess: (res) => {
        setMarkersData(res.data as any);
        setTimeout(() => {
          fetchDistrictCenters({});
        }, 100);
      },
    });
  }, []);

  useMapEvent("zoomend", (e) => {
    const currentZoom = e.target.getZoom();
    setZoom(currentZoom);
    switch (true) {
      case currentZoom >= 11:
        if (districtCenters && districtGeoJson) {
          setMarkersData(districtCenters as any);
          setGeoJson(districtGeoJson);
          setGeoKey("district");
          setMarkerkey("district");
        }
        break;
      case currentZoom >= 8:
        setMarkersData(provinceCenters as any);
        setGeoJson(provinceGeoJson);
        setGeoKey("province");
        setMarkerkey("province");
        break;
      default:
        setMarkersData([]);
        setGeoJson(provinceGeoJson);
        setGeoKey("province");
        setMarkerkey("");
    }
  });

  if (!geoJson) return null;

  return (
    <div className={classes.root}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
        minZoom={6}
        maxZoom={18}
      />
      <GeoJSON
        key={geoKey}
        data={geoJson}
        onEachFeature={(feature, layer) => {
          layer.bindPopup(feature.properties.NAME_1);
        }}
        style={{
          fill: true,
          fillOpacity: 0.07,
          weight: 1,
        }}
      />
      <FruitRenderer zoom={zoom} />
      <SitesRenderer markersData={markersData} markerKey={markerKey} />
    </div>
  );
}
