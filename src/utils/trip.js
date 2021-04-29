import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import duration from 'dayjs/plugin/duration';
dayjs.extend(isSameOrBefore);
dayjs.extend(duration);

const subtractDT = (start, end) => {
  const date1 = dayjs(end);
  const date2 = dayjs(start);
  const difference = dayjs.duration(date1.diff(date2));
  return difference;
};

const setDifferenceHum = (difference) => {
  let diffHum;
  const diffAsHour = difference.asHours();
  if (diffAsHour < 1) {
    diffHum = difference.format('mm[M]');
  } else if (diffAsHour < 24 && diffAsHour >= 1) {
    diffHum = difference.format('HH[H] mm[M]');
  } else {
    diffHum = difference.format('DD[D] HH[H] mm[M]');
  }
  return diffHum;
};

const isTripPast = (dueDate) => {
  return dayjs().isAfter(dueDate, 'D');
};

const isTripFuture = (dueDate) => {
  return dayjs().isSameOrBefore(dueDate, 'D');
};

const sortPointDayDown = (pointA, pointB) => {
  const dayA = subtractDT(pointA.dateIn, pointA.dateOut).asMilliseconds();
  const dayB = subtractDT(pointB.dateIn, pointB.dateOut).asMilliseconds();

  return dayjs(pointA.dateIn).diff(dayjs(pointB.dateIn));

  // if (dayA === dayB) {
  //   return 0;
  // }

  // if (dayA > dayB) {
  //   return -1;
  // }

  // if (dayA < dayB) {
  //   return 1;
  // }
};

const sortPointTimeDown = (pointA, pointB) => {
  const timeA = subtractDT(pointA.dateIn, pointA.dateOut).asMilliseconds();
  const timeB = subtractDT(pointB.dateIn, pointB.dateOut).asMilliseconds();
  if (timeA === timeB) {
    return 0;
  }

  if (timeA > timeB) {
    return -1;
  }

  if (timeA < timeB) {
    return 1;
  }
};

const sortPointPriceDown = (pointA, pointB) => {
  const priceA = pointA.price;
  const priceB = pointB.price;
  if (priceA === priceB) {
    return 0;
  }

  if (priceA > priceB) {
    return -1;
  }

  if (priceA < priceB) {
    return 1;
  }
};

export {
  subtractDT,
  setDifferenceHum,
  isTripPast,
  isTripFuture,
  sortPointDayDown,
  sortPointTimeDown,
  sortPointPriceDown
};
