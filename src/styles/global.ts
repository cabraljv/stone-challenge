import { createGlobalStyle } from 'styled-components';
import theme from './themes';

const global = createGlobalStyle`

 *{
    margin: 0;
    padding:0;
    outline:0;
    box-sizing: border-box;
  }
  html, border-style, #root {
    height: 100%;
  }
  body{
    font-family: 'Montserrat', sans-serif;
    background: ${theme.white};
    color: ${theme.dark};
    -webkit-font-smoothing: antaliased !important;
    @media only screen and (min-width: 900px) {
      font-size: 32px;
    }
  }
  ul{
    list-style: none;
  }
`;

export default global;
