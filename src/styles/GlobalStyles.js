import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Arial;
  }

  input, button, div, section {
    box-sizing: border-box;
  }

  button {
    cursor: pointer;
  }
`

export default GlobalStyle;