import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Portal, Modal, Button, Searchbar } from 'react-native-paper';
import firebase from 'firebase';
import 'firebase/storage';


export const PreviousTripModal = ({ trip, hideModalFunction }) => {
  const [{ screenshotURL }, setState] = useState({
    screenshotURL: null
  });

  if (screenshotURL === null) { fetchScreenshot(trip, setState); }

  return (
    <Portal>
      <Modal
        contentContainerStyle={{ marginBottom: '5%', height: '50%', justifyContent: 'center', alignItems: 'center' }}
        visible={trip !== null}
        onDismiss={hideModalFunction}
      >
        {renderTripDetails(trip, screenshotURL, hideModalFunction)}
      </Modal>
    </Portal >
  );
};

const fetchScreenshot = async (trip, setState) => {
  if (trip === null || trip.imagePath === null) { return; }
  const storage = firebase.storage();
  const ref = storage.ref();
  let url = await ref.child(trip.imagePath).getDownloadURL();
  setState({ screenshotURL: url });
};

const renderTripDetails = (trip, screenshotURL, hideModalFunction) => {
  if (trip === null) return (<View />);

  return (
    <View style={{ width: '90%', height: '100%', backgroundColor: 'white', borderColor: 'green' }}>
      <Text>trip: {trip.name}</Text>
      <Text>distance: {trip.distance}</Text>
      <Text>duration: {trip.elapsedTime}</Text>
      <Image
        style={{ width: 100, height: 100 }}
        source={{ uri: screenshotURL }}
      />
      <View style={{
        position: 'absolute',
        bottom: 0,
        borderWidth: 1,
        flex: 1,
        alignItems: 'center',
        width: '100%'
      }}>
        <Button style={{}} onPress={hideModalFunction}>Close</Button>
      </View>
    </View>
  );
};
