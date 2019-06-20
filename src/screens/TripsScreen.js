import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { List, FAB, Portal } from 'react-native-paper';
import _ from 'lodash';
import * as actions from '../actions';
import { FlatList } from 'react-native-gesture-handler';

class TripsScreen extends Component {

  state = {
    fabOpen: false
  };

  constructor(props) {
    super(props);
    props.fetchTrips();
  }

  newTrip() {
    // go to mapscreen
    console.log("new trip");
  }

  addGoal() {
    //show modal
  }

  renderItem({ item }) {
    console.log("ITEM", item);
    return (
      <List.Item
        title={item.name}
        description={`distance: ${item.distance} time: ${item.elapsedTime}`}
        left={() => <List.Icon color="#000" icon="directions-run" />}
      />
    );
  }

  defaultList() {
    return (
      <List.Item
        title="Empty!"
        description="a description"
        left={() => <List.Icon color="#000" icon="directions-run" />}
      />
    );
  }

  render() {
    console.log("TRIPP", this.props.trips)
    return (
      <View style={styles.container}>
        <FlatList
        />
        <Portal>
          <FAB.Group
            open={this.state.fabOpen}
            icon={this.state.fabOpen ? 'close' : 'add'} color='black'
            actions={[
              {
                icon: 'play-arrow',
                label: 'New Run',
                style: { backgroundColor: '#25BECA' },
                onPress: this.newTrip.bind(this)
              },
              {
                icon: 'add',
                label: 'Add Goal',
                style: { backgroundColor: '#25BECA' },
                onPress: this.newTrip.bind(this)
              },
            ]}
            onStateChange={({ open }) => this.setState({ fabOpen: open })}
          />
        </Portal>

      </View >
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
};

const mapStateToProps = ({ trip: { previousTrips } }) => {
  return { trips: previousTrips };
};

export default connect(mapStateToProps, actions)(TripsScreen);
