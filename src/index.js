import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'normalize.css';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Boogaloo', 'Lato:400'],
  },
});

ReactDOM.render(<App />, document.getElementById('root'));
