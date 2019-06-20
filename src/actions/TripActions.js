import firebase from 'firebase';
import 'firebase/firestore';
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

export const saveTrip = ({ locations, distance, startTime, endTime, elapsedTime }) => {
  return (dispatch) => {
    const { currentUser } = firebase.auth();
    const name = new Date(startTime).toLocaleString();
    const trip = { locations, distance, startTime, endTime, name, elapsedTime };
    const db = firebase.firestore();

    db.collection('users')
      .doc(currentUser.uid)
      .collection('trips')
      .doc(startTime.toString())
      .set(trip, { merge: true })
      .then(() => {
        dispatch({ type: TRIP_SAVE });
      });
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
