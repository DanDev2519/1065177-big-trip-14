import dayjs from 'dayjs';
// import he from 'he';
import {upFirst} from '../utils/common';
import SmartView from './smart.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const INITIAL_POINT = {
  type: '',
  dateIn: dayjs().hour(0).minute(0).format('YYYY-MM-DDTHH:mm'),
  dateOut: dayjs().hour(0).minute(0).format('YYYY-MM-DDTHH:mm'),
  destination: {},
  price: '',
  options: [],
  isFavorite: false,
};

const createTypeListMarkup = (list, type) => {
  return list.length == 0 ? ''
    : `<div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${list.map((el) => `<div class="event__type-item">
          <input id="event-type-${el}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${el}" ${el === type ? 'checked' : ''}>
          <label class="event__type-label  event__type-label--${el}" for="event-type-${el}-1">${upFirst(el)}</label>
        </div>`).join('')}
      </fieldset>
    </div>`;
};

const createDestinationListMarkup = (list) => {
  return list.length == 0 ? ''
    : `<datalist id="destination-list-1">
      ${list.map((el) => `<option value="${el}"></option>`).join('')}
    </datalist>`;
};

const createSectionOffersMarkup = (offerArr, optionsArr, isDisabled) => {
  return offerArr.length == 0 ? ''
    : `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offerArr.map(({name = '', cost}, i) => `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden"
              id="event-offer-${name.toLowerCase()}-${i}"
              type="checkbox"
              data-name="${name}"
              data-cost="${cost}"
              name="event-offer-${name.toLowerCase()}-${i}"
              ${optionsArr.filter((obj) => obj.name === name && obj.cost === cost)[0] ? 'checked' : ''}
              ${isDisabled ? 'disabled' : ''}>
            <label class="event__offer-label" for="event-offer-${name.toLowerCase()}-${i}">
              <span class="event__offer-title">${name}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${cost}</span>
            </label>
          </div>`).join('')}
      </div>
    </section>`;
};

const createSectionDestinationMarkup = (descriptionInfo, imgArr) => {
  return descriptionInfo == '' ? ''
    :`<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${descriptionInfo}</p>
      ${imgArr.length == 0 ? ''
    : `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${imgArr.map(({src, alt}) => `<img class="event__photo" src="${src}" alt="${alt}">`).join('')}
        </div>
      </div>`}
    </section>`;
};

const createTripAddMarkup = (point, offer, destinationInfo, offersType, destinationsCity) => {
  const {type, dateIn, dateOut, destination, price, options, isDisabled, isSaving} = point;
  const {description = '', img = [], name = ''} = destinationInfo;

  return `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>
            ${createTypeListMarkup(offersType, type)}
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${upFirst(type)}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" ${destinationsCity.length == 0 ?'' : 'list="destination-list-1"'} ${isDisabled ? 'disabled' : ''} required>
            ${createDestinationListMarkup(destinationsCity)}
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dateIn).format('DD/MM/YY HH:mm')}" ${isDisabled ? 'disabled' : ''}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dateOut).format('DD/MM/YY HH:mm')}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}" ${isDisabled ? 'disabled' : ''} required>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>
            ${isSaving ? 'Saving...' : 'Save'}
          </button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>Delete</button>
        </header>

        <section class="event__details">
          ${createSectionOffersMarkup(offer, options, isDisabled)}
          ${createSectionDestinationMarkup(description, img)}
        </section>
      </form>
    </li>`;
};

class TripAddPoint extends SmartView {
  constructor(offers, destinations, offersType, destinationsCity, point = INITIAL_POINT) {
    super();
    this._offers = offers.slice();
    this._destinations = destinations.slice();
    this._offersType = offersType.slice();
    this._destinationsCity = destinationsCity.slice();
    this._point = Object.assign(
      {},
      point,
      {type: this._offersType[0]},
    );
    this._pointData = TripAddPoint.parsePointToData(this._point);

    this._startDatepicker = null;
    this._endDatepicker = null;

    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);

    this._setInnerHandlers();
    this.setDatepicker();
  }

  getTemplate() {
    return createTripAddMarkup(this._pointData, this._getCurrentOffers(), this._getCurrentDestination(), this._offersType, this._destinationsCity);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setDatepicker();
  }

  _getCurrentOffers() {
    return this._offers.find((obj) => obj.type === this._pointData.type).offers;
  }

  _getCurrentDestination() {
    const currentDestination = this._destinations.find((obj) => obj.name === this._pointData.destination.name);
    return currentDestination || {};
  }

  _setStartDatepicker() {
    this._removerStartDatepicker();

    this._startDatepicker = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        maxDate: dayjs(this._pointData.dateOut).format('DD/MM/YY HH:mm'),
        defaultDate: dayjs(this._pointData.dateIn).format('DD/MM/YY HH:mm'),
        onChange: this._startDateChangeHandler,
      },
    );
  }

  _removerStartDatepicker() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }
  }

  _setEndDatepicker() {
    this._removerEndDatepicker();

    this._endDatepicker = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        minDate: dayjs(this._pointData.dateIn).format('DD/MM/YY HH:mm'),
        defaultDate: dayjs(this._pointData.dateOut).format('DD/MM/YY HH:mm'),
        onChange: this._endDateChangeHandler,
      },
    );
  }

  _removerEndDatepicker() {
    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }
  }

  setDatepicker() {
    this._setStartDatepicker();
    this._setEndDatepicker();
  }

  removerDatepicker() {
    this._removerStartDatepicker();
    this._removerEndDatepicker();
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._destinationInputHandler);
    this.getElement()
      .querySelector('.event__type-list')
      .addEventListener('change', this._eventTypeChangeHandler);
    this.getElement()
      .querySelector('.event__input--price')
      .addEventListener('input', this._priceInputHandler);
    this.getElement()
      .querySelector('.event__available-offers')
      && this.getElement()
        .querySelector('.event__available-offers')
        .addEventListener('change', this._offersChangeHandler);
  }

  _eventTypeChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      options: [],
    });
  }

  _destinationInputHandler(evt) {
    evt.preventDefault();
    if (!this._destinationsCity.includes(evt.target.value)) {
      evt.target.setCustomValidity('Select a destination from the list');
      evt.target.reportValidity();
      return;
    }
    const newDestination = this._destinations.find((obj) => obj.name === evt.target.value);
    this.updateData({
      destination: Object.assign(
        {},
        {
          name: newDestination.name,
          description: newDestination.description,
          pictures: newDestination.img.map(({src, alt}) => {
            return {src, description: alt};
          }),
        },
      ),
    });
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    evt.target.value = evt.target.value.replace(/[^\d]/g, '');
    if (!Number.isInteger(+evt.target.value)) {
      evt.target.value = this._pointData.price;
      return;
    }
    this.updateData({
      price: +evt.target.value,
    }, true);
  }

  _offersChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      options: this._changeOffers(evt.target.dataset.name, +evt.target.dataset.cost),
    }, true);
  }

  _changeOffers(name, cost) {
    let newArr = this._pointData.options;
    const isContain = newArr.some((el) => el.name === name && el.cost === cost);

    if(isContain) {
      newArr = newArr.filter((el) => !(el.name === name && el.cost === cost));
    } else {
      newArr.push({name:name, cost:cost});
    }

    return newArr;
  }

  _startDateChangeHandler([userDate]) {
    this.updateData({
      dateIn: flatpickr.formatDate(userDate, 'Y-m-dTH:i'),
    });
  }

  _endDateChangeHandler([userDate]) {
    this.updateData({
      dateOut: flatpickr.formatDate(userDate, 'Y-m-dTH:i'),
    });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(TripAddPoint.parseDataToPoint(this._pointData));
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
      {options: []},
      {
        isDisabled: false,
        isSaving: false,
      },
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign(
      {},
      data,
    );

    delete data.isDisabled;
    delete data.isSaving;

    return data;
  }
}

export default TripAddPoint;
