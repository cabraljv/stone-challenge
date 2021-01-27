import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;
interface IMarker {
  lat: number;
  lng: number;
}
export const Marker = styled.div<IMarker>`
  width: 75px;
  height: 114px;
  img {
    height: 100%;
    width: 100%;
  }
  transform: translate(-37.5px, -114px);
`;
