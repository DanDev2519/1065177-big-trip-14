import {createElement} from '../utils';

const createTripEventsListMarkup = () => {
  return `<ul class="trip-events__list">
    </ul>`;
};

class TripEventsLis {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripEventsListMarkup();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default TripEventsLis;
