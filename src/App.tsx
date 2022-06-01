import React from 'react'
import { ThemeProvider } from 'styled-components'
import GlogalStyles from './styles/GlobalStyles'

import Dashboard from './pages/Dashboard'
import Layout from './components/Layout'
import dark from './styles/themes/dark'
// import light from './styles/themes/light'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={dark}>
      <GlogalStyles />
      <Layout>
        <Dashboard />
      </Layout>
    </ThemeProvider>
  )
}

export default App
