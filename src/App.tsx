import React from 'react'
import { ThemeProvider } from 'styled-components'
import GlogalStyles from './styles/GlobalStyles'

import { useTheme } from './hooks/theme'

import Routes from './routes'

const App: React.FC = () => {
  const { theme } = useTheme()
  return (
    <ThemeProvider theme={theme}>
      <GlogalStyles />
      <Routes />
    </ThemeProvider>
  )
}

export default App
