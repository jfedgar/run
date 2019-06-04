import {
  LOCATION_ADD,
  TRIP_START,
  TRIP_END
} from './types';

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

export const stopTrip = () => {
  return {
    type: TRIP_END
  };
};
