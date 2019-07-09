import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Button, FAB, Portal } from 'react-native-paper';
import { captureRef as takeSnapshotAsync } from 'react-native-view-shot';
import { LinearGradient } from 'expo-linear-gradient';
import Map from '../components/Map';
import TripInfoBar from '../components/TripInfoBar';
import BackButton from '../../assets/images/back2x.png';
import PauseButton from '../../assets/images/pause2x.png';
import PlayButton from '../../assets/images/play2x.png';
import * as actions from '../actions';

class MapScreen extends Component {

  constructor(props) {
    super(props);
    // used for snapshot
    this.mapRef = React.createRef();
  }

  state = {
    fabOpen: false,
  };

  toggleTrip() {
    if (this.props.running) {
      this.props.pauseTrip();
    } else {
      this.props.startTrip();
    }
  }

  resetTrip() {
    this.props.resetTrip();
  }

  saveTrip() {
    this.takeSnapshot().then((snapshot) => {
      setTimeout(this.props.saveTrip, 2000, snapshot);
    });
  }

  takeSnapshot = async () => {
    const options = { width: 100, height: 100, quality: 0.8 };
    const result = await takeSnapshotAsync(this.mapRef, options);
    return result;
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
    const { running } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ width: '15%', aspectRatio: 1, position: 'absolute', top: '7%', left: '2%' }}>
          <TouchableOpacity onPress={() => { this.props.navigation.navigate('trips'); }} >
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

        <View ref={this.mapRef} style={{ flex: 2, width: '100%', zIndex: -1 }}>
          <Map containerStyle={{ zIndex: -1 }} />
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'white']}
            style={styles.overlayStyle}
          />
        </View>

        <View style={{ flex: 2 }}>

          <TripInfoBar />

          <Button
            style={{ position: 'absolute', bottom: 0 }}
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
                  icon: running ? 'pause' : 'play-arrow',
                  label: running ? 'pause' : 'start',
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

const mapStateToProps = ({ trip: { running } }) => {
  return { running };
};

export default connect(mapStateToProps, actions)(MapScreen);
