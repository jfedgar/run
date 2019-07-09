import React from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';

export const TripListItem = ({ trip, selectTripFunction }) => {
  return (
    <View style={{ textAlign: 'center', borderWidth: 1, borderColor: 'green' }}>
      <List.Item
        style={{ borderWidth: 1 }}
        title={trip.name}
        titleStyle={{ textAlign: 'center' }}
        description={`distance: ${trip.distance} time: ${trip.elapsedTime}`}
        descriptionStyle={{ textAlign: 'center' }}
        onPress={() => selectTripFunction(trip)}
        left={() => <List.Icon color="#000" icon="directions-run" />}
        right={() => <List.Icon color="#000" icon="chevron-right" />}
      />
    </View>
  );
};
