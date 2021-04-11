import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import duration from 'dayjs/plugin/duration';
// const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
// const duration = require('dayjs/plugin/duration');
dayjs.extend(isSameOrBefore);
dayjs.extend(duration);

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const sortObjByField = (field) => {
  return (a, b) => a[field] > b[field] ? 1 : -1;
};

const upFirst = (str) => {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
};

const subtractDT = (start, end) => {
  const date1 = dayjs(end);
  const date2 = dayjs(start);
  const difference = dayjs.duration(date1.diff(date2));
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

export {
  getRandomInteger,
  upFirst,
  sortObjByField,
  subtractDT,
  isTripPast,
  isTripFuture
};
