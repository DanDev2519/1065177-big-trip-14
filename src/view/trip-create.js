import dayjs from 'dayjs';
import {TRIP_TYPE, CITIES_VISITED} from '../mock/const';
import {upFirst} from '../mock/utils';

const createTypeListMarkup = (list, type) => {
  return list.length == 0 ? '' : `
    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${list.map((el) => `
        <div class="event__type-item">
          <input id="event-type-${el}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${el}" ${el === type ? 'checked' : ''}>
          <label class="event__type-label  event__type-label--${el}" for="event-type-${el}-1">${upFirst(el)}</label>
        </div>`).join('')}
      </fieldset>
    </div>`;
};

const createDestinationListMarkup = (list) => {
  return list.length == 0 ? '' : `
    <datalist id="destination-list-1">
      ${list.map((el) => `<option value="${el}"></option>`).join('')}
    </datalist>`;
};

const createSectionOffersMarkup = (offerArr, optionsArr) => {
  return offerArr.length == 0 ? '' : `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offerArr.map(({name = '', cost}) => `
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${name.toLowerCase()}-1" type="checkbox" name="event-offer-luggage"  ${optionsArr.filter((opt) => opt.name == name)[0] ? 'checked' : ''}>
            <label class="event__offer-label" for="event-offer-luggage-1">
              <span class="event__offer-title">${name}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${cost}</span>
            </label>
          </div>`).join('')}
      </div>
    </section>`;
};

const createSectionDestinationMarkup = (descriptionInfo, imgArr) => {
  return descriptionInfo == '' ? '' :`
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${descriptionInfo}</p>
      ${imgArr.length == 0 ? '' : `
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${imgArr.map(({src, alt}) => `<img class="event__photo" src="${src}" alt="${alt}">`).join('')}
        </div>
      </div>`}
    </section>`;
};

const createTripAddMarkup = (offers, destinations) => {
  const type = TRIP_TYPE[0],
    dateIn = dayjs().hour(0).minute(0).format('DD/MM/YY HH:mm'),
    dateOut = dayjs().hour(0).minute(0).format('DD/MM/YY HH:mm'),
    destination = CITIES_VISITED[0],
    price = '',
    options = [],
    offer = offers.find((obj) => obj.type === type).offers,
    {description = '', img = []} = destinations.find((obj) => obj.name === destination);

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            ${createTypeListMarkup(TRIP_TYPE, type)}
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${upFirst(type)}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" ${CITIES_VISITED.length == 0 ?'' : 'list="destination-list-1"'}>
            ${createDestinationListMarkup(CITIES_VISITED)}
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateIn}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateOut}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
        </header>

        <section class="event__details">
          ${createSectionOffersMarkup(offer, options)}
          ${createSectionDestinationMarkup(description, img)}
        </section>
      </form>
    </li>
  `;
};

export {createTripAddMarkup};
