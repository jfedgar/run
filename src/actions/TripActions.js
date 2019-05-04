import {
  LOCATION_ADD
} from './types';

export const locationAdd = (location) => {
  return {
    type: LOCATION_ADD,
    payload: location
  };
};
