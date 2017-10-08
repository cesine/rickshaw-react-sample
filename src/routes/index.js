import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from './Dashboard';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/year/:year/month/:month/week/:week" exact component={Dashboard} />
      <Route path="/year/:year/month/:month" exact component={Dashboard} />
      <Route path="/year/:year" exact component={Dashboard} />
      <Route path="/start/:startYear/:startWeek/:startDay/end/:endYear/:endWeek/:endDay" exact component={Dashboard} />
      <Route path="/start/:startYear/:startWeek/:startDay" exact component={Dashboard} />
      <Route path="/" exact component={Dashboard} />
    </Switch>
  </BrowserRouter>);
