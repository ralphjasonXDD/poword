import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'normalize.css';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Boogaloo', 'sans-serif'],
  },
});

ReactDOM.render(<App />, document.getElementById('root'));
