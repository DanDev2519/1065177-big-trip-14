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
  INIT: 'INIT',
};

const FilterType = {
  EVERYTHING: 'everything ',
  FUTURE: 'future ',
  PAST: 'past ',
};

const MenuItem = {
  TABLE: 'Table',
  STATS: 'Stats',
};

export { SortType, UserAction, UpdateType, FilterType, MenuItem };
