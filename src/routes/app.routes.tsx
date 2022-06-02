import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from '../components/Layout'
import Dashboard from '../pages/Dashboard'
import List from '../pages/List'

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/list/:type" element={<List />} />
      </Routes>
    </Layout>
  </BrowserRouter>
  // <Switch>
  //   <Route path="/dashboard" element={<Dashboard />} />
  //   <Route path="/list/:type" element={<List />} />
  // </Switch>
)

export default AppRoutes
