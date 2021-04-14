import {sortObjByField} from '../utils';
import dayjs from 'dayjs';


const tripNameMarkup = (objArr) => {
  const size = objArr.length;
  return size > 3
    ? `${objArr[0].destination} &mdash; ... &mdash; ${objArr[size - 1].destination}`
    : objArr.map(({destination}) => destination).join(' &mdash; ');
};

const tripDurationMarkup = (start, finish) => {
  let result = '';
  if (start.length !== 0 && finish.length !== 0) {
    let date1 = dayjs(start[0]);
    let date2 = dayjs(finish[finish.length -1]);
    const difference = dayjs.duration(date2.diff(date1));
    date1 = date1.format('MMM DD');

    date2 = difference.asMonths() > 1 ? date2.format('MMM DD') : date2.format('DD');

    result = `<p class="trip-info__dates">${date1}&nbsp;&mdash;&nbsp;${date2}</p>`;
  }
  return result;
};

const createTripInfoMarkup = (points) => {
  const sarts = points.map((point) => point.dateIn).sort();
  const finishes = points.map((point) => point.dateOut).sort();
  const pointsByDateIn = points.sort(sortObjByField('dateIn'));
  const sumPrices = points.reduce((accumulator, current) => accumulator + current.price, 0);
  const sumOptionsPointArr = points.map((point) => point.options.reduce((accumulator, current) => accumulator + current.cost, 0));
  const sumOptions = sumOptionsPointArr.reduce((accumulator, current) => accumulator + current, 0);
  const costTotal = sumOptions + sumPrices;

  return `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripNameMarkup(pointsByDateIn)}</h1>
        ${tripDurationMarkup(sarts, finishes)}
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${costTotal}</span>
      </p>
    </section>
  `;
};

export {createTripInfoMarkup};
