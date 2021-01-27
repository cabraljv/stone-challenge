import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

interface IMarker {
  lat: number;
  lng: number;
}
export const Marker = styled.div<IMarker>`
  width: 50px;
  height: 76px;
  img {
    height: 100%;
    width: 100%;
  }
  transform: translate(-25px, -76px);
`;
