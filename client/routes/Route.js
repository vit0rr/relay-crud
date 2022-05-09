import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import ViewerQuery from './ViewerQuery';
import AppContainer from '../components/App/AppContainer';
// import UserContainer from '../components/User/UserContainer';
import SignupComponent from '../components/Signup/SignupComponent';
import LoginComponent from '../components/Login/LoginComponent';

export default (
  <Route path="/" component={AppContainer} queries={ViewerQuery}>
    {/* <IndexRoute component={UserContainer} queries={ViewerQuery} /> */}
    <IndexRoute queries={ViewerQuery} />
    <Route path="signup" component={SignupComponent} />
    <Route path="login" component={LoginComponent} />
    <Redirect from="*" to="/" />
  </Route>
);
