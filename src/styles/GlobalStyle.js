import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background: #0f0f0f;
    color: white;
    overflow-x: hidden;
  }

  section {
    min-height: 100vh;
    padding: 100px 50px;
    position: relative;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
  }
`;

export default GlobalStyle; 