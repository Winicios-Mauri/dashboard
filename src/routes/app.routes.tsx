import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Layout from '../components/Layout'
import Dashboard from '../pages/Dashboard'
import List from '../pages/List'

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/list/:type" exact component={List} />
      </Switch>
    </Layout>
  </BrowserRouter>
  // <Switch>
  //   <Route path="/dashboard" element={<Dashboard />} />
  //   <Route path="/list/:type" element={<List />} />
  // </Switch>
)

export default AppRoutes
