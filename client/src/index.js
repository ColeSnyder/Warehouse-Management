import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Index.js holds the app.js main component. This is the root component
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
