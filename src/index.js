import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App1 from './App1';
import { BrowserRouter } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
// import App from './App';
// import Clock from './Clock';

ReactDOM.render(<BrowserRouter>
<App1 />
</BrowserRouter> , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
