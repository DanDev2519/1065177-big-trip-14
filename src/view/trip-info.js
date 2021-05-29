import {sortObjByFieldUp} from '../utils/common';
import dayjs from 'dayjs';
import AbstractView from './abstract';


const tripNameMarkup = (pointsByDateIn) => {
  const size = pointsByDateIn.length;
  return size > 3
    ? `${pointsByDateIn[0].destination.name} &mdash; ... &mdash; ${pointsByDateIn[size - 1].destination.name}`
    : pointsByDateIn.map((destination) => destination.name).join(' &mdash; ');
};

const tripDurationMarkup = (start, finish) => {
  let result = '';
  if (start.length !== 0 && finish.length !== 0) {
    let date1 = dayjs(start[0]);
    let date2 = dayjs(finish[finish.length - 1]);
    const isDifferentMonths = date1.month() !== date2.month();
    date1 = date1.format('MMM DD');
    date2 = isDifferentMonths ? date2.format('MMM DD') : date2.format('DD');
    result = `<p class="trip-info__dates">${date1}&nbsp;&mdash;&nbsp;${date2}</p>`;
  }
  return result;
};

const createTripInfoMarkup = (points) => {
  const starts = points.map((point) => point.dateIn).sort();
  const finishes = points.map((point) => point.dateOut).sort();
  const pointsByDateIn = points.sort(sortObjByFieldUp('dateIn'));
  const sumPrices = points.reduce((accumulator, current) => accumulator + current.price, 0);
  const sumOptionsPoints = points.map((point) => point.options.reduce((accumulator, current) => accumulator + current.cost, 0));
  const sumOptions = sumOptionsPoints.reduce((accumulator, current) => accumulator + current, 0);
  const costTotal = sumOptions + sumPrices;

  return `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripNameMarkup(pointsByDateIn)}</h1>
        ${tripDurationMarkup(starts, finishes)}
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${costTotal}</span>
      </p>
    </section>`;
};


class TripInfo extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripInfoMarkup(this._points);
  }
}

export default TripInfo;
