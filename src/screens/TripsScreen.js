import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { List, FAB, Portal } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import * as actions from '../actions';
import { TripListItem } from '../components/TripListItem';
import { PreviousTripModal } from '../components/PreviousTripModal';

class TripsScreen extends Component {
  constructor(props) {
    super(props);
    props.fetchTrips();
  }

  state = {
    fabOpen: false,
    selectedTripItem: null
  };

  newTrip() {
    this.props.navigation.navigate('map');
  }

  addGoal() {
    //show modal
  }

  unselectItem() {
    this.setState({ selectedTripItem: null });
  }

  selectItem(trip) {
    this.setState({ selectedTripItem: trip });
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

  renderItem(trip) {
    return (
      <TripListItem
        trip={trip.item}
        selectTripFunction={this.selectItem.bind(this)}
      />
    );
  }

  render() {
    const { trips } = this.props;
    return (
      <View style={styles.container}>
        <PreviousTripModal
          trip={this.state.selectedTripItem}
          hideModalFunction={this.unselectItem.bind(this)}
        />
        <FlatList
          data={trips}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(trip, index) => index.toString()}
          ListEmptyComponent={this.defaultList}
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
    marginTop: 40,
    borderWidth: 5,
  },
};

const mapStateToProps = ({ trip: { previousTrips } }) => {
  return { trips: previousTrips };
};

export default connect(mapStateToProps, actions)(TripsScreen);
