import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-paper';
import Map from '../components/Map';
import {
  signOut
} from '../actions';
import BackImage from '../../assets/images/back2x.png';

class MapScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 2, width: '100%', zIndex: -1 }}>
          <TouchableOpacity onPress={() => { console.log("foo"); }} style={{ borderRadius: 1, borderColor: 'black', width: '10%', height: '10%', position: 'absolute' }}>
            <Image source={require('../../assets/images/back2x.png')} style={{ resizeMode: 'contain', width: '100%' }} />
          </TouchableOpacity>

          <Map containerStyle={{ zIndex: -1 }} />
        </View>
        <View style={{ flex: 2, borderWidth: 1 }}>
          <Text>Open up App.js to start working on your app!</Text>
          <Button title="Sign Out" onPress={this.props.signOut}>sign out</Button>

        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
};

export default connect(null, { signOut })(MapScreen);
