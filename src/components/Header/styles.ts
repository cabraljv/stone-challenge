import styled from 'styled-components';
import theme from '../../styles/themes';

export const Container = styled.header`
  display: flex;
  flex-direction: column;
  header {
    margin-right: auto;
    button {
      font-size: 1.6em;
      background: none;
      border: 0;
      color: ${theme.secondary};
    }
  }
  align-items: center;
  padding: 60px 1.5em;
  color: ${theme.secondary};
  font-size: 1.6em;

  div {
    display: flex;
    padding: 0 30px;
    h1 {
      padding-left: 20px;
      font-size: 1.1em;
    }
    img {
      width: 8em;
    }
  }
`;
