const TRIP_TYPE = [
  'taxi',
  'bus',
  'train',
  'ship',
  'transport',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const CITIES_VISITED = [
  'Chamonix',
  'Amsterdam',
  'Geneva',
];

const SortType = {
  DAY_DOWN: 'day-down',
  PRICE_DOWN: 'price-down',
  TIME_DOWN: 'Time-down',
};


const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export { TRIP_TYPE, CITIES_VISITED, SortType, UserAction, UpdateType };
