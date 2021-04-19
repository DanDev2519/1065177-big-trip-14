import {isTripPast, isTripFuture} from '../utils';

const pointToFilterMap = {
  everything: (points) => points.length,
  future: (points) => points
    .filter((point) => isTripFuture(point.dateIn)).length,
  past: (points) => points
    .filter((point) => isTripPast(point.dateOut)).length,
};

const generateFilter = (points) => {
  return Object.entries(pointToFilterMap).map(([filterName, countPoints]) => {
    return {
      name: filterName,
      count: countPoints(points),
    };
  });
};

export {generateFilter};
