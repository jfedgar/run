import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Button, FAB, Portal } from 'react-native-paper';
import { LinearGradient } from 'expo';
import Map from '../components/Map';
import TripInfoBar from '../components/TripInfoBar';
import BackButton from '../../assets/images/back2x.png';
import PauseButton from '../../assets/images/pause2x.png';
import PlayButton from '../../assets/images/play2x.png';
import * as actions from '../actions';

class MapScreen extends Component {

  state = {
    fabOpen: false
  };

  toggleTrip() {
    if (this.props.trip.running) {
      this.props.pauseTrip();
    } else {
      this.props.startTrip();
    }
  }

  resetTrip() {
    console.log('reset trip');
    this.props.resetTrip();
  }

  saveTrip() {
    console.log('save trip');
    this.props.saveTrip(this.props.trip);
  }

  renderPlayButton() {
    if (this.props.trip.running) {
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
    const { trip } = this.props;
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

          <TripInfoBar />

          <Button
            style={{ borderRadius: 1, borderColor: "black", position: 'absolute', bottom: 0 }}
            title="Sign Out"
            onPress={this.props.signOut}
          >
            sign out
          </Button>

          <Portal>
            <FAB.Group
              open={this.state.fabOpen}
              icon={this.state.fabOpen ? 'close' : 'add'}
              color='black'
              actions={[
                {
                  icon: trip.running ? 'pause' : 'play-arrow',
                  label: trip.running ? 'pause' : 'start',
                  style: { backgroundColor: '#25BECA' },
                  onPress: this.toggleTrip.bind(this)
                },
                {
                  icon: 'loop',
                  label: 'reset',
                  style: { backgroundColor: '#25BECA' },
                  onPress: this.resetTrip.bind(this)
                },
                {
                  icon: 'save',
                  label: 'save',
                  style: { backgroundColor: '#25BECA' },
                  onPress: this.saveTrip.bind(this)
                },
              ]}
              onStateChange={({ open }) => this.setState({ fabOpen: open })}
            />
          </Portal>

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
  console.log('map state to props called in mapscreen');
  return { trip };
};

export default connect(mapStateToProps, actions)(MapScreen);
