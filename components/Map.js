import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, ZoomControl } from "react-leaflet";

export default function Map({ position }) {
  const locationIcon = L.icon({
    iconUrl: "/images/icon1.svg",
    iconSize: [76, 86], // size of the icon
    iconAnchor: [37, 82], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -56], // point from which the popup should open relative to the iconAnchor
  });

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "80vh", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      />
      <Marker position={position} icon={locationIcon}></Marker>
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}
