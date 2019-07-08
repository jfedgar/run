// this will display a spinner and check whether the user is logged in, if they are it will send them to the map screen

// this gets invoked immediately and on any auth changes or removal of the current user
// so it should be good to use here to determine where to go, and also to ensure if the user's login expires
// they are sent back to the login screen:
//    firebase.auth().onAuthStateChanged(user => {
//      this.props.navigation.navigate(user ? 'MapScreen' : 'LoginScreen')
//    })
// if not it will send them to the login form (which will have a link to the sign up form)


// note: we will need to use a stack navigator for the auth / login / signup screen

// note also: we will need to alter the auth actions and reducers to reflect the fact that we aren't just
//   automatically signing them up if they don't have an account

import React, { Component } from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import { Spinner } from '../components/common';

export default class AuthScreen extends Component {

  constructor(props) {
    super(props);
    const config = {
      apiKey: 'AIzaSyCM1ZYrx16FGTYFC4dTEOYfINdvTvLpOdM',
      authDomain: 'runn-1ef1a.firebaseapp.com',
      databaseURL: 'https://runn-1ef1a.firebaseio.com',
      projectId: 'runn-1ef1a',
      storageBucket: 'runn-1ef1a.appspot.com',
      messagingSenderId: '581622038504',
      appId: '1:581622038504:web:d7de9a1605376408'
    };
    firebase.initializeApp(config);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log('firebase auth onAuthStateChanged');
      console.log(user);

      this.props.navigation.navigate(user ? 'trips' : 'login');
    });
  }

  render() {
    return (
      <View style={styles.spinnerContainer}>
        <Spinner />
      </View>
    );
  }
}

const styles = {
  spinnerContainer: {
    flex: 1,
    justifyContent: 'space-around'
  }
};
