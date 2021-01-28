import styled from 'styled-components';
import theme from '../../styles/themes';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${theme.light_blue};
  display: flex;
  flex-direction: column;
  div.loading {
    margin: auto;
  }
  section.content {
    width: 85%;
    margin: 60px auto;
    p.adress {
      opacity: 0.7;
      font-size: 1.1em;
      padding-bottom: 50px;
    }
    p.visitToday {
      font-size: 1.3em;
      padding-top: 10px;
    }
    div.infos {
      margin-top: 70px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      div {
        p {
          padding: 5px 0;
          font-size: 1.4em;
          display: flex;
          align-items: center;
          opacity: 0.9;
        }
      }
    }
  }
  div.date-picker {
    width: 85%;
    margin: 0 auto;
    display: flex;
    .MuiInputBase-root {
      font-size: 1.5em;
      opacity: 0.7;
    }
  }
  button {
    background: none;
    border: none;
    margin: 20px 0;
    font-size: 1.3em;
    color: ${theme.secondary};
    text-transform: uppercase;
    font-weight: bold;
    margin-top: 60px;
  }
`;
