import dayjs from 'dayjs';
import {getRandomInteger} from './utils';
import {TRIP_TYPE} from './const';
import {generateOffer} from './offer';

const generateTypePoint = () => {
  const randomIndex = getRandomInteger(0, TRIP_TYPE.length - 1);
  return TRIP_TYPE[randomIndex];
};

const generateDateIn = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const hourGap = getRandomInteger(-24, 24);
  const minuteGap = getRandomInteger(-60, 60);
  return dayjs().add(daysGap, 'day').add(hourGap, 'hour').add(minuteGap, 'minute').format('YYYY-MM-DDTHH:mm');
};

const addRandomDateTime = (DTin, d = 1, h = 24, m = 60) => {
  const daysGap = getRandomInteger(0, d);
  const hourGap = getRandomInteger(0, h);
  const minuteGap = getRandomInteger(0, m);
  return dayjs(DTin).add(daysGap, 'day').add(hourGap, 'hour').add(minuteGap, 'minute').format('YYYY-MM-DDTHH:mm');
};

const generateCity = () => {
  const city = [
    'Chamonix',
    'Amsterdam',
    'Geneva',
  ];
  const randomIndex = getRandomInteger(0, city.length - 1);
  return city[randomIndex];
};

const generatePoint = () => {
  const dateIn = generateDateIn();
  const dateOut = addRandomDateTime(dateIn);
  const type = generateTypePoint();

  return {
    type,
    dateIn,
    dateOut,
    destination: generateCity(),
    price: getRandomInteger(10, 1000),
    options: generateOffer(type),
    isFavorite: Boolean(getRandomInteger()),
  };
};

export {generatePoint};
