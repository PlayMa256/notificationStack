import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import app from './reducers'
import NotificationItem from './NotificationItem'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppComponent from './AppComponent'
let store = createStore(app)


class App extends Component {
  render() {
    return (
      <AppComponent />
    );
  }
}

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
