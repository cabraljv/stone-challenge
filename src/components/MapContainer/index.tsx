import React, { useState, useEffect, useCallback } from 'react';
import GoogleMap from 'google-map-react';
import map_style from '../../assets/map/mapstyle.json';
import { Container, Marker } from './styles';
import marker_icon from '../../assets/icons/store_marker.svg';
import lead_icon from '../../assets/icons/lead_marker.svg';
import theme from '../../styles/themes';

interface IEstablishment {
  _id: string;
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

  const handleApiLoaded = useCallback(
    (map: any, maps: any, data_points: IEstablishment[]) => {
      if (data_points) {
        const triangleCoords = data_points.map((item) => ({
          lat: item.lat,
          lng: item.lng,
        }));
        const triangle = new maps.Polygon({
          paths: triangleCoords,
          strokeColor: theme.secondary,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillOpacity: 0.35,
        });
        triangle.setMap(map);
      }
    },
    []
  );

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
        center={location}
        bootstrapURLKeys={{
          key: process.env.REACT_APP_MAPS_KEY || '',
          language: 'pt-br',
        }}
        defaultZoom={18}
        options={{
          styles: map_style,
        }}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, data)}
      >
        {data.map((item) => (
          <Marker
            lat={item.lat}
            lng={item.lng}
            key={`${item._id}-${item.name}`}
            onClick={() => onClickMarker(item._id)}
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
