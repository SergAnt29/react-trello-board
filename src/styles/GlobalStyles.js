import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Arial;
  }

  input, button, div {
    box-sizing: border-box;
  }
`

export default GlobalStyle;