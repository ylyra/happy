import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing'
import OrphanagesMap from './pages/OrphanagesMap'

// Orphanage folder
import Orphanage from './pages/orphanage/Orphanage'
import Success from './pages/orphanage/Success'
import CreateOrphanage from './pages/orphanage/CreateOrphanage'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={OrphanagesMap} />

        {/*Orphanage*/}
        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />
        <Route path="/success" component={Success} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;