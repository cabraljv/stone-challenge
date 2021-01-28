import styled, { css } from 'styled-components';
import theme from '../../styles/themes';

interface IProps {
  open?: boolean;
}

export const Container = styled.div<IProps>`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: ${theme.white};
  border-radius: 60px 60px 0 0;
  height: 23vh;
  transition: transform 0.5s;
  button.more-info {
    width: 100%;
    font-size: 1.2em;
    padding: 10px 0;
    border-radius: 10px;
    background: none;
    border: 0;
    color: ${theme.secondary};
  }
  ${(props) =>
    !props.open
      ? css`
          transform: translateY(16.5vh);
        `
      : css`
          transform: translateY(0);
        `}
  header {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    button {
      font-size: 2.5em;
      color: ${theme.secondary};
      background: none;
      border: 0;
      transform: rotateZ(90deg);
    }
  }
  section {
    padding: 10px 2em;
    div.item-header {
      p:first-of-type {
        font-size: 1.5em;
      }
      p:last-of-type {
        font-size: 0.9em;
        opacity: 0.8;
      }
    }
    div.item-content {
      padding: 30px 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 100px;
      div {
        p {
          display: flex;
          align-items: center;
          padding: 5px 0;
          opacity: 0.8;
          font-size: 1.1em;
          span {
            padding-left: 5px;
          }
        }
      }
    }
  }
`;
