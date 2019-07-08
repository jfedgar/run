import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';
import {
  LOCATION_ADD,
  TRIP_START,
  TRIP_PAUSE,
  TRIPS_FETCH_SUCCESS,
  TRIP_RESET,
  TRIP_SAVE,
  SET_TIME
} from './types';

// note that this will continue to listen for updates to the 'trips' for
//  this user automatically update the 'trips' in the store when trips are changed
export const fetchTrips = () => {
  return (dispatch) => {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();

    //https://firebase.google.com/docs/firestore/query-data/listen#listen_to_multiple_documents_in_a_collection
    db.collection('users')
      .doc(currentUser.uid)
      .collection('trips')
      .onSnapshot((querySnapshot) => {
        const trips = [];
        querySnapshot.forEach((doc) => {
          trips.push(doc.data());
        });
        dispatch({
          type: TRIPS_FETCH_SUCCESS,
          payload: trips
        });
      });
  };
};

const storeScreenshot = async (localImageURI, snapshotName) => {
  const storage = firebase.storage();

  let response = await fetch(localImageURI);
  let blob = await response.blob();
  let storageRef = await storage.ref(`trip_screenshots/${snapshotName}`);
  let result = await storageRef.put(blob);
  return result;
}

export const saveTrip = (imageURI) => {
  return async (dispatch, getState) => {
    const db = firebase.firestore();
    const { locations, distance, startTime, endTime, elapsedTime } = getState().trip;
    const tripName = new Date(startTime).toLocaleString();
    const trip = { name: tripName, locations, distance, startTime, endTime, elapsedTime };
    const { currentUser } = firebase.auth();

    try {
      let result = await storeScreenshot(imageURI, startTime);
      trip.imagePath = result.metadata.fullPath;
      db.collection('users')
        .doc(currentUser.uid)
        .collection('trips')
        .doc(startTime.toString())
        .set(trip, { merge: true })
        .then(() => {
          dispatch({ type: TRIP_SAVE });
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export const setTime = (time) => {
  return {
    type: SET_TIME,
    payload: time
  };
};

export const locationAdd = (location) => {
  console.log("location add");
  return {
    type: LOCATION_ADD,
    payload: location
  };
};

export const startTrip = () => {
  return {
    type: TRIP_START
  };
};

export const pauseTrip = () => {
  return {
    type: TRIP_PAUSE
  };
};

export const resetTrip = () => {
  return {
    type: TRIP_RESET
  };
};
