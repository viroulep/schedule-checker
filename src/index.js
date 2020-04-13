import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'fomantic-ui-css/semantic.css';

// NOTE:
//import { Link } from 'react-router-dom'
//import { Button } from 'semantic-ui-react'

//// 💡 `to` prop is not handled in `Button` and will be passed to `Link` component
//<Button as={Link} to="/home">
  //To homepage
//</Button>

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
