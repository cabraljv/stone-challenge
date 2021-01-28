import styled, { keyframes } from 'styled-components';
import theme from '../../styles/themes';

const onOpen = keyframes`
  from {
    left: -500px;
  }
  to {
    left: 0;
  }
`;

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;

  z-index: 10;
  background: rgba(0, 0, 0, 0.7);
  ul {
    position: absolute;
    animation: ${onOpen} 0.5s linear;
    height: 100vh;
    width: 60%;
    background: #fff;
    border-radius: 0 2em 2em 0;
    display: flex;
    flex-direction: column;
    li:first-of-type {
      font-size: 2em;
      margin-top: 60px;
      button {
        width: 80%;
        margin: 0 auto;
        border: 0;
        background: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
          margin-left: 70px;
          width: 200px;
        }
        font-size: 1.5em;
        color: ${theme.secondary};
      }
      padding-bottom: 30px;
    }
    li {
      width: 100%;
      display: flex;
      margin: 5px 0;
      a {
        text-decoration: none;
        font-size: 1.5em;
        color: ${theme.dark};
        width: 80%;
        margin: 0 auto;
      }
    }
  }
`;
