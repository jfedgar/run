import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo';
import Map from '../components/Map';
import TripInfoBar from '../components/TripInfoBar';
import BackButton from '../../assets/images/back2x.png';
import PauseButton from '../../assets/images/pause2x.png';
import PlayButton from '../../assets/images/play2x.png';
import {
  signOut,
  startTrip,
  stopTrip
} from '../actions';

class MapScreen extends Component {

  toggleTrip() {
    if (this.props.running) {
      this.props.stopTrip();
    } else {
      this.props.startTrip();
    }
  }

  renderPlayButton() {
    if (this.props.running) {
      return (<Image
        source={PauseButton}
        style={{ resizeMode: 'contain', width: '100%', height: '100%' }}
      />);
    }
    return (<Image
      source={PlayButton}
      style={{ resizeMode: 'contain', width: '100%', height: '100%' }}
    />);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ width: '15%', aspectRatio: 1, position: 'absolute', top: '7%', left: '2%' }}>
          <TouchableOpacity onPress={() => { console.log('foo'); }} >
            <Image
              source={BackButton}
              style={{ resizeMode: 'contain', width: '100%', height: '100%' }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ width: '15%', aspectRatio: 1, position: 'absolute', top: '7%', right: '2%' }}>
          <TouchableOpacity onPress={this.toggleTrip.bind(this)} >
            {this.renderPlayButton()}
          </TouchableOpacity>
        </View>

        <View style={{ flex: 2, width: '100%', zIndex: -1 }}>
          <Map containerStyle={{ zIndex: -1 }} />
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'white']}
            style={styles.overlayStyle}
          />
        </View>

        <View style={{ flex: 2 }}>

          <TripInfoBar running={this.props.running} />

          <Button
            style={{ borderRadius: 1, borderColor: "black", position: 'absolute', bottom: 0 }}
            title="Sign Out"
            onPress={this.props.signOut}
          >
            sign out
          </Button>

        </View >
      </View >
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  overlayStyle: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    width: '100%',
    height: '25%',
  },
  stopWatchOptions: {
    container: {
      backgroundColor: '#fff',
      padding: 5,
      borderRadius: 5,
      width: 220,
    },
    text: {
      fontSize: 30,
      color: '#000',
      marginLeft: 7,
      font: 'nunito-bold'
    }
  }
};

const mapStateToProps = ({ trip }) => {
  console.log("map state to props called in mapscreen")
  return {
    running: trip.running
  };
};

export default connect(mapStateToProps, { signOut, startTrip, stopTrip })(MapScreen);
