import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import OrphanagesMap from '../pages/OrphanagesMap'

// Orphanage folder
import Success from '../pages/orphanage/Success'
import EditOrphanage from '../pages/orphanage/EditOrphanage'

const AppRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={OrphanagesMap} />

        <Route path="/orphanages/edit/:id" component={EditOrphanage} />
        <Route path="/success" component={Success} />
      </Switch>
    </BrowserRouter>
  )
}

export default AppRoute;