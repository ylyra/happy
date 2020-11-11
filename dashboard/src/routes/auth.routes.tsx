import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Dashboard folder
import DashboardLogin from '../pages/dashboard/Login'
import DashboardForgetPassword from '../pages/dashboard/ForgetPassword'
import DashboardReset from '../pages/dashboard/Reset'

const AuthRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>        
        <Route path="/" exact component={DashboardLogin} />
        <Route path="/login" component={DashboardLogin} />
        <Route path="/esqueci" component={DashboardForgetPassword} />
        <Route path="/resetar/" component={DashboardReset} />
      </Switch>
    </BrowserRouter>
  )
}

export default AuthRoute;