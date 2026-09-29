"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function MapComponent({ properties = [] }: { properties?: any[] }) {
  return (
    <div className="w-full h-full min-h-[500px] rounded-lg overflow-hidden border border-white/10 z-0">
      <MapContainer
        center={[9.0820, 8.6753]}
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {properties.map((loc) => (
          loc.lat && loc.lng ? (
            <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={customIcon}>
              <Popup>
                <div className="font-semibold">{loc.title}</div>
                <div className="text-black font-bold">₦{loc.price.toLocaleString()} / {loc.rentalPeriod === 'DAILY' ? 'day' : loc.rentalPeriod === 'WEEKLY' ? 'wk' : loc.rentalPeriod === 'MONTHLY' ? 'mo' : 'yr'}</div>
              </Popup>
            </Marker>
          ) : null
        ))}
      </MapContainer>
    </div>
  );
}
