import styled, { css } from 'styled-components';
import theme from '../../styles/themes';

interface IProps {
  open: boolean;
}

export const Container = styled.div<IProps>`
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
  button.float-add-establishment {
    font-size: 2.5em;
    position: fixed;
    bottom: 8vh;
    right: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    border-radius: 2em;
    border: 0;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    background: ${theme.secondary};
    color: ${theme.white};
    transition: transform 0.5s;
    ${(props) =>
      props.open &&
      css`
        transform: translateY(-18vh);
      `}
  }
`;
