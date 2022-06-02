import React from 'react'
import { ThemeProvider } from 'styled-components'
import GlogalStyles from './styles/GlobalStyles'

import Routes from './routes'

import dark from './styles/themes/dark'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={dark}>
      <GlogalStyles />
      <Routes />
    </ThemeProvider>
  )
}

export default App
