import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/MainPage';
import * as serviceWorker from './serviceWorker';
import Animation from './components/Animation/Animation'

ReactDOM.render(
  <React.StrictMode>
    <Animation />
  </React.StrictMode>,
  document.querySelector('#content')
  // document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
