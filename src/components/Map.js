import React, { Component } from 'react';
import { MapView, Location, Permissions } from 'expo';

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

const { Marker } = MapView;

class Map extends Component {
  constructor(props) {
    super(props);
    this.setInitialRegionAsync();
    setInterval(() => this.getLocationAsync(), 10000);
  }

  state = {
    region: null,
    locations: [],
    errorMessage: ''
  }

  onRegionChangeComplete(region) {
    this.setState({ region });
  }

  getLocationAsync = async () => {
    this.getPermission();
    const location = await Location.getCurrentPositionAsync({});
    this.updateLocations(location);
  }

  setInitialRegionAsync = async () => {
    this.getPermission();
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
    console.log(this.state.locations);
    this.setState({ locations: [...this.state.locations, location] });
  }

  renderMarkers() {
    console.log("here");
    return this.state.locations.map((location) => {
      console.log("wwooo");
      return (
        <Marker
          coordinate={location.coords}
          title="foo"
          description="foo"
        />
      );
    });
  }

  render() {
    const { region } = this.state;
    return (
      <MapView
        style={styles.container}
        region={region}
        onRegionChange={this.onRegionChangeComplete}
        showsUserLocation
        showsMyLocationButton
      >
        {this.renderMarkers()}
      </MapView>
    );
  }
}
const styles = {
  container: {
    width: '100%',
    height: '80%',
  }
};

export default Map;
