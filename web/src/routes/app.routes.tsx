import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from '../pages/Landing'
import OrphanagesMap from '../pages/OrphanagesMap'

// Orphanage folder
import Orphanage from '../pages/orphanage/Orphanage'
import CreateOrphanage from '../pages/orphanage/CreateOrphanage'
import EditOrphanage from '../pages/orphanage/EditOrphanage'
import Success from '../pages/orphanage/Success'

const AppRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={OrphanagesMap} />
        <Route path="/admin" component={OrphanagesMap} />

        {/*Orphanage*/}
        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />

        <Route path="/orphanages/edit/:id" component={EditOrphanage} />
        <Route path="/success" component={Success} />
      </Switch>
    </BrowserRouter>
  )
}

export default AppRoute;