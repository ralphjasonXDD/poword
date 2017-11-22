import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Redirect,
} from 'react-router-dom';
import {
  fbKey,
  isAuthenticated,
} from './fire';
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

const CustomRoute = () => {
  const user = JSON.parse(window.localStorage.getItem(fbKey));

  return (
    <BrowserRouter>
      <div>
        <div>
          {isAuthenticated() && <Signout />}
        </div>
        <div>
          {isAuthenticated() && (<div>Username: {user.username}</div>)}
        </div>
        <div>
          <Route exact path="/" component={App} />
          <MatchWhenAuthorized exact path="/room" component={Room} />
          <MatchWhenAuthorized exact path="/play" component={Play} />
        </div>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<CustomRoute />, document.getElementById('root'));
