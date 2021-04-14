import dayjs from 'dayjs';
import {getRandomInteger} from '../utils';
import {TRIP_TYPE, CITIES_VISITED} from '../const';

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
  const randomIndex = getRandomInteger(0, CITIES_VISITED.length - 1);
  return CITIES_VISITED[randomIndex];
};

const generateOptions = (type, offers) => {
  let options = [];
  const allOffersPoint = offers.filter((obj) => obj.type === type)[0].offers;
  if (allOffersPoint.length !== 0) {
    let count = getRandomInteger(0, 4);
    while (count) {
      options.push(allOffersPoint[getRandomInteger(0, allOffersPoint.length - 1)]);
      count--;
    }
    options = Array.from(new Set(options));
  }
  return options;
};

const generatePoint = (offers) => {
  const dateIn = generateDateIn();
  const dateOut = addRandomDateTime(dateIn);
  const type = generateTypePoint();

  return {
    type,
    dateIn,
    dateOut,
    destination: generateCity(),
    price: getRandomInteger(10, 1000),
    options: generateOptions(type, offers),
    isFavorite: Boolean(getRandomInteger()),
  };
};

export {generatePoint};
