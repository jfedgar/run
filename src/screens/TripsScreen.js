import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { List, FAB, Portal } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import _ from 'lodash';
import * as actions from '../actions';

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
    console.log('new trip');
  }

  addGoal() {
    //show modal
  }

  renderItem({ item }) {
    return (
      <View style={{ textAlign: 'center', borderWidth: 1, borderColor: 'green' }}>
        <List.Item
          style={{ borderWidth: 1 }}
          title={item.name}
          titleStyle={{ textAlign: 'center' }}
          description={`distance: ${item.distance} time: ${item.elapsedTime}`}
          descriptionStyle={{ textAlign: 'center' }}
          left={() => <List.Icon color="#000" icon="directions-run" />}
          right={() => <List.Icon color="#000" icon="chevron-right" />}
        />
      </View>
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
    const { trips } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={trips}
          renderItem={this.renderItem}
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
