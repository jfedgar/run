import haversine from 'haversine';
import {
  LOCATION_ADD,
  TRIP_START,
  TRIP_PAUSE,
  TRIP_RESET,
  TRIP_SAVE,
  TRIPS_FETCH_SUCCESS,
  SET_TIME
} from '../actions/types';

const INITIAL_STATE = {
  previousTrips: [],
  running: false,
  locations: [],
  distance: 0,
  startTime: null,
  endTime: null,
  elapsedTime: 0
};

const calculateDistance = (existingLocations, currentLocation) => {
  if (existingLocations.length === 0) return 0;
  const [lastLocation] = existingLocations.slice(-1);
  const dist = haversine(lastLocation.coords, currentLocation.coords);
  return Math.round(dist * 1000) / 1000;
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRIP_START: {
      // if it is already started, use the original start time
      //   otherwise, fill it in with the current time
      const start = state.startTime || new Date().getTime();
      return { ...state, startTime: start, running: true, endTime: null };
    }
    case TRIP_PAUSE: {
      const end = new Date().getTime();
      return { ...state, running: false, endTime: end };
    }
    case TRIP_RESET: {
      return { ...INITIAL_STATE, previousTrips: state.previousTrips };
    }
    case LOCATION_ADD: {
      const distance = calculateDistance(state.locations, action.payload);
      const locations = [...state.locations, action.payload];
      return { ...state, locations, distance };
    }
    case TRIPS_FETCH_SUCCESS: {
      return { ...state, previousTrips: action.payload };
    }
    case SET_TIME: {
      return { ...state, elapsedTime: action.payload };
    }
    default:
      return state;
  }
};
