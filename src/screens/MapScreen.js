import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Map from '../components/Map';
import { Button } from '../components/common';
import {
  signOut
} from '../actions';


class MapScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 2, width: '100%' }}>
          <Map />
        </View>
        <View style={{ flex: 2, borderWidth: 1 }}>
          <Text>Open up App.js to start working on your app!</Text>
          <Button style={styles.buttonStyle} onPress={this.props.signOut}>sign out</Button>
        </View>
      </View>
    );
  }
}

const styles = {
  buttonStyle: {
    height: 50,
    borderColor: 'black'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default connect(null, { signOut })(MapScreen);
