// libs
import { HANOI_COORDINATES, HCM_COORDINATES } from "@/constants/coordinates";
import { useAsync } from "@/hooks/useAsync";
import Leaflet from "leaflet";
import { memo, useEffect, useState } from "react";
import { Marker, Popup, useMapEvent } from "react-leaflet";
import { TGeoKey, TMarkerData, TMarkerKey } from "../../types";

const markerIcon = Leaflet.icon({
  iconUrl: "/images/qua-nhan.png",
  iconRetinaUrl: "/images/qua-nhan.png",
  iconSize: new Leaflet.Point(100, 100),
});

const SitesRenderer = memo(
  ({
    markersData,
    markerKey,
  }: {
    markerKey: TMarkerKey;
    markersData: TMarkerData[];
  }) => (
    <>
      {markersData.map((marker, i) => (
        <Marker
          position={marker.CENTER}
          icon={Leaflet.divIcon({
            html: `<div style="width: max-content;">${marker.NAME}</div>`,
          })}
          key={i}
        >
          <Popup>
            <div>
              <h2>{marker.NAME}</h2>
              <p>
                {marker.NAME} là một {marker.TYPE} của Việt Nam.
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
      {!!markersData && markersData.length > 0 && (
        <>
          <Marker
            position={[16.664272, 112.724576]}
            icon={Leaflet.divIcon({
              html: '<div style="width: max-content;">Quần đảo Hoàng Sa</div>',
            })}
            key="HS"
          >
            <Popup>
              <div>
                <h2>Quần đảo Hoàng Sa</h2>
              </div>
            </Popup>
          </Marker>
          <Marker
            position={[9.972254, 115.445072]}
            icon={Leaflet.divIcon({
              html: '<div style="width: max-content;">Quần đảo Trường Sa</div>',
            })}
            key="TS"
          >
            <Popup>
              <div>
                <h2>Quần đảo Trường Sa</h2>
              </div>
            </Popup>
          </Marker>
        </>
      )}
    </>
  ),
  (previousProps, currentProps) => {
    if (previousProps.markerKey !== currentProps.markerKey) return false;
    return true;
  },
);

export default SitesRenderer;
