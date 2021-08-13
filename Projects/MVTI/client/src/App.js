import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import route from './route';
import './reset.css';
import './main.css';
import './index.css';
import store from './redux/configureStore';

const App = () => route();

export default App;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
