import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Redirect,
} from 'react-router-dom';
import { isAuthenticated } from './fire';
import Room from './Components/Room';
import Play from './Components/Play';
import App from './App';
import Signout from './Signout';

const MatchWhenAuthorized = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={renderProps => (
      isAuthenticated()
        ? <Component {...renderProps} />
        : <Redirect to={{ pathname: '/' }} />
    )}
  />
);

const route = (
  <BrowserRouter>
    <div>
      <div>
        {isAuthenticated() && <Signout />}
      </div>
      <div>
        <Route exact path="/" component={App} />
        <MatchWhenAuthorized exact path="/room" component={Room} />
        <MatchWhenAuthorized exact path="/play" component={Play} />
      </div>
    </div>
  </BrowserRouter>
);

ReactDOM.render(route, document.getElementById('root'));
