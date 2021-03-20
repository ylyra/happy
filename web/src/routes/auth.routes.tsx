import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from '../pages/Landing'
import OrphanagesMap from '../pages/OrphanagesMap'

// Orphanage folder
import Orphanage from '../pages/orphanage/Orphanage'


// Dashboard folder
import DashboardLogin from '../pages/dashboard/Login'
import DashboardForgetPassword from '../pages/dashboard/ForgetPassword'
import DashboardReset from '../pages/dashboard/Reset'
import CreateOrphanage from '../pages/orphanage/CreateOrphanage';

const AuthRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>        
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={OrphanagesMap} />
        <Route path="/admin" component={DashboardLogin} />

        {/*Orphanage*/}
        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />

        <Route path="/login" component={DashboardLogin} />
        <Route path="/esqueci" component={DashboardForgetPassword} />
        <Route path="/resetar/" component={DashboardReset} />
      </Switch>
    </BrowserRouter>
  )
}

export default AuthRoute;