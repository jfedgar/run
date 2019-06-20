import React from 'react';

// redux
import { Provider } from 'react-redux';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { createStore, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';

import { Font } from 'expo';
import PoppinsBold from './assets/fonts/Poppins-Bold.ttf';
import PoppinsSemiBold from './assets/fonts/Poppins-SemiBold.ttf';
import PoppinsLight from './assets/fonts/Poppins-Light.ttf';
import PoppinsExtraLight from './assets/fonts/Poppins-ExtraLight.ttf';
import MainNav from './MainNav';

// this is for redux devtools, we use this in place of 'compose' when applying other middleware to the store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default class App extends React.Component {

  state = { fontLoaded: false };

  componentDidMount() {
    Font.loadAsync({
      'poppins-bold': PoppinsBold,
      'poppins-semi-bold': PoppinsSemiBold,
      'poppins-light': PoppinsLight,
      'poppins-extra-light': PoppinsExtraLight,
    });
    //.then(() => this.setState({ fontLoaded: true }));
  }

  render() {
    const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(ReduxThunk)));
    store.subscribe(() => {
      console.log("Store state changed");
      console.log(store.getState());
    });

    const theme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        text: 'black',
        primary: '#50E636',
        accent: '#25BECA',
        background: 'black'
      }
    };

    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <MainNav />
        </PaperProvider>
      </Provider >
    );
  }
}
