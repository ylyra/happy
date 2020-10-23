import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing'
import OrphanagesMap from './pages/OrphanagesMap'
import Orphanage from './pages/Orphanage'
import Success from './pages/Success'
import CreateOrphanage from './pages/CreateOrphanage'

// Dashboard
import DashboardLogin from './pages/DashboardLogin'
import DashboardForgetPassword from './pages/DashboardForgetPassword'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={OrphanagesMap} />

        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />
        <Route path="/success" component={Success} />
        
        {/* Dashboard */}
        <Route path="/dashboard/login" component={DashboardLogin} />
        <Route path="/dashboard/esqueci" component={DashboardForgetPassword} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;