import dayjs from 'dayjs';
import {subtractDT} from '../mock/utils';


const createPointSelectedOffersMarkup = (options) => {
  return options.length == 0
    ? ''
    : `<ul class="event__selected-offers">
        ${options.map(({name, cost}) => `<li class="event__offer">
          <span class="event__offer-title">${name}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${cost}</span>
        </li>`).join('')}
      </ul>`;
};

const createTripPointMarkup = (point) => {
  const {type, dateIn, dateOut, destination, price, options, isFavorite} = point;

  const duration = subtractDT(dateIn, dateOut);

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';

  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dayjs(dateIn).format('YYYY-MM-DD')}">${dayjs(dateIn).format('MMM DD')}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dayjs(dateIn).format('YYYY-MM-DDTHH:mm')}">${dayjs(dateIn).format('HH:mm')}</time>
            &mdash;
            <time class="event__end-time" datetime="${dayjs(dateOut).format('YYYY-MM-DDTHH:mm')}">${dayjs(dateOut).format('HH:mm')}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        ${createPointSelectedOffersMarkup(options)}
        <button class="${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
};

export {createTripPointMarkup};
