import {FilterType} from '../const';
import {isTripPast, isTripFuture} from '../utils/trip';

// _Для FilterType.EVERYTHING так оставить или есть жругие варианты?
export const filter = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.FUTURE]: (points) => points.filter((point) => isTripFuture(point.dateOut)),
  [FilterType.PAST]: (points) => points.filter((point) => isTripPast(point.dateIn)),
};
