import dayjs from 'dayjs';
// import he from 'he';
import {TRIP_TYPE, CITIES_VISITED} from '../const';
import {upFirst} from '../utils/common';
import SmartView from './smart.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

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

const createTripEditMarkup = (point, offer, destinationInfo) => {
  const {type, dateIn, dateOut, destination, price, options, isDisabled, isSaving, isDeleting} = point;
  const {description = '', img = []} = destinationInfo;

  return `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>
            ${createTypeListMarkup(TRIP_TYPE, type)}
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${upFirst(type)}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" ${CITIES_VISITED.length == 0 ? '' : 'list="destination-list-1"'} ${isDisabled ? 'disabled' : ''}>
            ${createDestinationListMarkup(CITIES_VISITED)}
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
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
            ${isDeleting ? 'Deleting...' : 'Delete'}
          </button>
          <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">
          ${createSectionOffersMarkup(offer, options, isDisabled)}
          ${createSectionDestinationMarkup(description, img)}
        </section>
      </form>
    </li>`;
};

class TripEditPoint extends SmartView {
  constructor(point, offer, destination) {
    super();
    this._pointData = TripEditPoint.parsePointToData(point);
    this._offer = offer;
    this._destination = destination;

    this._startDatepicker = null;
    this._endDatepicker = null;

    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);
    this._formResetHandler = this._formResetHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createTripEditMarkup(this._pointData, this._offer, this._destination);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormResetHandler(this._callback.formReset);
    this.setPointEditChangeHandler(this._callback.pointEditChange);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setDatepicker();
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
    this._callback.pointEditChange(TripEditPoint.parseDataToPoint(this._pointData));
  }

  _destinationInputHandler(evt) {
    evt.preventDefault();
    // _Правильная ли проверка
    if (!CITIES_VISITED.includes(evt.target.value)) {
      evt.target.setCustomValidity('Select a destination from the list');
      evt.target.reportValidity();
      return;
    }
    this.updateData({
      destination: evt.target.value,
    });
    this._callback.pointEditChange(TripEditPoint.parseDataToPoint(this._pointData));
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    // _Правильная ли проверка
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

  _formResetHandler(evt) {
    evt.preventDefault();
    this._callback.formReset();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(TripEditPoint.parseDataToPoint(this._pointData));
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(TripEditPoint.parseDataToPoint(this._pointData));
  }

  setFormResetHandler(callback) {
    this._callback.formReset = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._formResetHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setPointEditChangeHandler(callback) {
    this._callback.pointEditChange = callback;
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._destinationInputHandler);
    this.getElement()
      .querySelector('.event__type-list')
      .addEventListener('change', this._eventTypeChangeHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
      {
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
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
    delete data.isDeleting;

    return data;
  }
}

export default TripEditPoint;
