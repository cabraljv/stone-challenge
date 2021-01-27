import styled from 'styled-components';
import ReactSelect from 'react-select';
import theme from '../../styles/themes';

export const Select = styled(ReactSelect)`
  div.css-yk16xz-control {
    min-height: 90px;
    font-size: 1.2em;
  }
  div.css-1pahdxg-control {
    min-height: 90px;
    font-size: 1.2em;
  }
`;

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background: ${theme.light_blue};
  form {
    padding: 30px 1.5em;
    div.label {
      display: flex;
      flex-direction: column;
      margin-bottom: 80px;
      div.location-picker {
        width: 100%;
        height: 30em;
      }
      select {
        height: 80px;
      }
      span {
        font-weight: bold;
        color: ${theme.secondary};
        text-transform: uppercase;
      }
      input {
        width: 100%;
        border: 0;
        border-radius: 0.1em;
        font-size: 1.2em;
        padding: 20px;
        color: ${theme.dark};
      }
      input:focus {
        border: 1px solid ${theme.secondary};
      }
    }
    label {
      font-weight: bold;
      color: ${theme.secondary};
      text-transform: uppercase;
      display: flex;
      flex-direction: column;
      margin-bottom: 80px;
      input {
        width: 100%;
        border: 0;
        border-radius: 0.1em;
        font-size: 1.2em;
        padding: 20px;
        color: ${theme.dark};
      }
      input:focus {
        border: 1px solid ${theme.secondary};
      }
    }
    button.submit {
      width: 100%;
      font-size: 1.5em;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 3px;
      padding: 20px 0%;
      border: 0;
      border-radius: 10px;
      background: ${theme.secondary};
      color: #fff;
    }
  }
`;
