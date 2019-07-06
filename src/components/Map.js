import React, { Component } from 'react';
import { View } from 'react-native';
import { MapView, Location, Permissions, Constants } from 'expo';
import { connect } from 'react-redux';
import { locationAdd } from '../actions';

const deltas = {
  latitudeDelta: 0.0080,
  longitudeDelta: 0.0040
};

const { Polyline } = MapView;

class Map extends Component {
  constructor(props) {
    super(props);
    this.setInitialRegionAsync();
    setInterval(() => this.getLocationAsync(), 5000);
    //Hack to ensure the showsMyLocationButton is shown initially. Idea is to force a repaint
    setTimeout(() => this.setState({ statusBarHeight: Constants.statusBarHeight }), 1000);
  }

  state = {
    region: null,
    errorMessage: '',
    statusBarHeight: 5
  }

  onRegionChangeComplete(region) {
    this.setState({ region });
  }

  getLocationAsync = async () => {
    if (this.props.running) {
      this.getPermission();
      const location = await Location.getCurrentPositionAsync({});
      this.updateLocations(location);
    }
  }

  setInitialRegionAsync = async () => {
    console.log('setInitialRegionAsync running (getting permission)');
    await this.getPermission();
    console.log('setInitialRegionAsync running (permission granted)');
    const location = await Location.getCurrentPositionAsync({});
    this.updateLocations(location);
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      ...deltas
    };
    await this.setState({ region });
  }

  getPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }
  }

  updateLocations(location) {
    if (this.props.running) {
      this.props.locationAdd(location);
    }
  }

  renderPolyline() {
    const coords = this.props.locations.map((location) => location.coords);
    return (
      <Polyline
        coordinates={coords}
        strokeWidth={10}
        strokeColor={'#50E636'}
      />
    );
  }

  render() {
    const { region } = this.state;
    return (
      // Setting a value (padding) we can change to force a repaint
      // this is a hack to force a rerender and get the location button to show
      // https://github.com/react-native-community/react-native-maps/issues/1033
      <View style={[{ paddingTop: this.state.statusBarHeight }, this.props.containerStyle]}>
        <MapView
          showsUserLocation
          showsMyLocationButton
          showsScale
          style={[styles.mapView, this.props.mapStyle]}
          initialRegion={region}
          onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
          mapPadding={styles.mapPadding}
        >
          {this.renderPolyline()}
        </MapView>
      </View>
    );
  }
}

const styles = {
  mapView: {
    width: '100%',
    height: '100%',
    zIndex: -1
  },
  mapPadding: {
    top: 20,
  }
};

const mapStateToProps = ({ trip }) => {
  return {
    running: trip.running,
    locations: trip.locations
  };
};

export default connect(mapStateToProps, { locationAdd })(Map);
