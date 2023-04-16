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

const FruitRenderer = ({ zoom }: { zoom: number }) => {
  let marker;
  if (zoom === 6)
    marker =
      '<div style="width: max-content;"><img style="width: 20px;" src="/images/point.png"/></div>';
  if (zoom === 7)
    marker =
      '<div style="width: max-content;"><img style="width: 26px;" src="/images/point.png"/></div>';
  if (zoom === 8)
    marker =
      '<div style="width: max-content;"><img style="width: 38px;" src="/images/point.png"/></div>';
  if (zoom >= 9)
    marker =
      '<div style="width: max-content;"><img style="width: 45px;" src="/images/qua-nhan.png"/></div>';
  return (
    <>
      <Marker
        position={[20.939827975396902, 105.99007722755701]}
        icon={Leaflet.divIcon({
          html: marker,
        })}
      >
        <Popup>
          <div>
            <h4>Nhãn là đặc sản của Hưng Yên</h4>
            <div style={{ textAlign: "center" }}>
              <img src="/images/qua-nhan.png" alt="" style={{ width: 70 }} />
            </div>
          </div>
        </Popup>
      </Marker>{" "}
      <Marker
        position={[20.739827975396902, 106.09007722755701]}
        icon={Leaflet.divIcon({
          html: marker,
        })}
      >
        <Popup>
          <div>
            <h4>Nhãn là đặc sản của Hưng Yên</h4>
            <div style={{ textAlign: "center" }}>
              <img src="/images/qua-nhan.png" alt="" style={{ width: 70 }} />
            </div>
          </div>
        </Popup>
      </Marker>
    </>
  );
};

export default FruitRenderer;
