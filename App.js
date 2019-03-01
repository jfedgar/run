import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Font } from 'expo';
import Map from './src/components/Map';

export default class App extends React.Component {

  state = { fontLoaded: false };

  componentDidMount() {
    Font.loadAsync({
      'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
    })
    .then(() => this.setState({ fontLoaded: true }));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 2, width: '100%' }}>
          <Map />
        </View>
        <View style={{ flex: 2 }}>
          <Text>Open up App.js to start working on your app!</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
