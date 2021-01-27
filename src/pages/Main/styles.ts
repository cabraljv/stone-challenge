import styled from 'styled-components';
import theme from '../../styles/themes';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  button.sidemenu-button {
    font-size: 2.5em;
    position: fixed;
    top: 1em;
    left: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    border-radius: 2em;
    border: 0;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    background: ${theme.white};
    color: ${theme.secondary};
  }
`;
