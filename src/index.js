import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import { Switch, Router, Route } from 'react-router-dom'
import history from './History';

import Room from './Components/Room';
import Play from './Components/Play';
import App from './App';

const route = (
  <Router history={history}>
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/room' render={(props) => <Room {...props} />} />
      <Route path='/play' render={(props) => <Play {...props} />} />
    </Switch>
  </Router >
);

ReactDOM.render(route, document.getElementById('root'));
