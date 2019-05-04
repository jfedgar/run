import haversine from 'haversine';
import {
  LOCATION_ADD,
  TRIP_START,
  TRIP_END
} from '../actions/types';

const INITIAL_STATE = {
  locations: [],
  distance: 0,
  startTime: null,
  endTime: null
};

const calculateDistance = (existingLocations, currentLocation) => {
  if (existingLocations.length === 0) return 0;
  const [lastLocation] = existingLocations.slice(-1);
  return haversine(lastLocation.coords, currentLocation.coords);
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRIP_START: {
      const start = new Date().getTime();
      return { ...state, startTime: start };
    }
    case TRIP_END: {
      const end = new Date().getTime();
      return { ...state, endTime: end };
    }
    case LOCATION_ADD: {
      const distance = calculateDistance(state.locations, action.payload);
      const locations = [...state.locations, action.payload];
      return { ...state, locations, distance };
    }
    default:
      return state;
  }
};
