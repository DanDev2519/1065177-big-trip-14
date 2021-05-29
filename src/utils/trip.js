import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const HOURS_IN_DAY = 24;

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
  } else if (diffAsHour < HOURS_IN_DAY && diffAsHour >= 1) {
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
  return dayjs().isBefore(dueDate, 'D');
};

const sortPointDayDown = (pointA, pointB) => {
  return dayjs(pointA.dateIn).diff(dayjs(pointB.dateIn));
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
