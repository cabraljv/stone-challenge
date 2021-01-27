import React, { useState, useEffect } from 'react';
import GoogleMap from 'google-map-react';
import map_style from '../../assets/map/mapstyle.json';
import { Container, Marker } from './styles';
import marker_icon from '../../assets/icons/store_marker.svg';
import lead_icon from '../../assets/icons/lead_marker.svg';

interface IEstablishment {
  id: string;
  lat: number;
  lng: number;
  name: string;
  negociation_status: string;
}

interface IProps {
  data: IEstablishment[];
  onClickMarker: (establishment_id: string) => void;
}

const MapContainer: React.FC<IProps> = ({ data, onClickMarker }) => {
  const [location, setLocation] = useState({
    lat: -19.9243479,
    lng: -43.950911,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return (
    <Container>
      <GoogleMap
        defaultCenter={location}
        bootstrapURLKeys={{
          key: process.env.REACT_APP_MAPS_KEY || '',
          language: 'pt-br',
        }}
        defaultZoom={18}
        options={{
          styles: map_style,
        }}
      >
        {data.map((item) => (
          <Marker
            lat={item.lat}
            lng={item.lng}
            key={`${item.id}-${item.name}`}
            onClick={() => onClickMarker(item.id)}
          >
            <img
              src={
                item.negociation_status === 'CONCLUIDO'
                  ? marker_icon
                  : lead_icon
              }
              alt="store"
            />
          </Marker>
        ))}
      </GoogleMap>
    </Container>
  );
};

export default MapContainer;
