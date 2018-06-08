import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import WebFont from 'webfontloader';
import { BrowserRouter } from 'react-router-dom';
import App from './Components/App';

WebFont.load({
  google: {
    families: ['Boogaloo', 'Lato:400'],
  },
});

ReactDOM.render(
  (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('root'),
);
