import React, { useEffect, useState, useCallback } from 'react';
import GoogleMap from 'google-map-react';
import map_style from '../../assets/map/mapstyle.json';
import { Container, Marker } from './styles';
import marker_icon from '../../assets/icons/store_marker.svg';

interface IPicked {
  lat: number;
  lng: number;
}

interface IPicker {
  onSelectLocation: (location: IPicked) => void;
}

const LocationPicker: React.FC<IPicker> = ({ onSelectLocation }) => {
  const [location, setLocation] = useState({
    lat: -19.9243479,
    lng: -43.950911,
  });
  const [picked, setPicked] = useState<IPicked | null>(null);

  const onPickLocation = useCallback(
    (e: GoogleMap.ClickEventValue) => {
      setPicked(null);
      setPicked({
        lat: e.lat,
        lng: e.lng,
      });
      onSelectLocation({
        lat: e.lat,
        lng: e.lng,
      });
    },
    [onSelectLocation]
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
        onClick={onPickLocation}
      >
        {picked && (
          <Marker lat={picked.lat} lng={picked.lng}>
            <img src={marker_icon} alt="store" />
          </Marker>
        )}
      </GoogleMap>
    </Container>
  );
};

export default LocationPicker;
