import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    scroll-behavior: smooth;
  }
  
  *, *::after, *::before {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Veranda', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    overflow-x: hidden;
    /* overflow-y: hidden; */
    max-width: 100vw;
    min-height: 100vh;
  }

  a, button {
    font-family: 'Veranda', sans-serif;
    text-decoration: none;
    color: inherit;
  }

  #root{
    /* position: relative; */
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

`
