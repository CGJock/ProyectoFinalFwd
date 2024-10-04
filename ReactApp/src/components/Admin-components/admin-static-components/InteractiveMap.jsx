import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// posición del ícono del marcador
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
});


const InteractiveMap = () => {
  const [markers, setMarkers] = useState([]);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const newMarker = { lat: e.latlng.lat, lng: e.latlng.lng };
        // Al hacer clic en el mapa, obtiene las coordenadas (latitud y longitud) del lugar donde se hizo clic.
        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
        
      },
    });
    return null;
  };

  return (
    <MapContainer center={[9.9758, -84.8351]} zoom={13} style={{ height: "500px", width: "100%",  minHeight: "500px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEvents />
      {markers.map((position, idx) => (
        <Marker key={idx} position={position}>
          <Popup>
            Has hecho clic aquí!<br />{`Lat: ${position.lat}, Lng: ${position.lng}`}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default InteractiveMap;