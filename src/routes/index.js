import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Dashboard from './Dashboard';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={props => <Home {...props} />} />
      <Route path="/year/:year/month/:month/week/:week" exact render={props => <Dashboard {...props} />} />
      <Route path="/year/:year/month/:month" exact render={props => <Dashboard {...props} />} />
      <Route path="/year/:year" exact render={props => <Dashboard {...props} />} />
      <Route path="/start/:start/end/:end" exact render={props => <Dashboard {...props} />} />
      <Route path="/start/:start" exact render={props => <Dashboard {...props} />} />
    </Switch>
  </BrowserRouter>);
