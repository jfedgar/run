import React from 'react';

// redux
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';

import { Font } from 'expo';
import NunitoBold from './assets/fonts/Nunito-Bold.ttf';
import MainNav from './MainNav';

// this is for redux devtools, we use this in place of 'compose' when applying other middleware to the store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default class App extends React.Component {

  state = { fontLoaded: false };

  componentDidMount() {
    Font.loadAsync({
      'nunito-bold': NunitoBold,
    })
      .then(() => this.setState({ fontLoaded: true }));
  }

  render() {
    const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(ReduxThunk)));

    return (
      <Provider store={store}>
        <MainNav />
      </Provider>
    );
  }
}
