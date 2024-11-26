import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    background: rgba(10, 15, 25, 0.95);
    overflow-x: hidden;
    width: 100%;
  }

  #root {
    width: 100%;
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle; 