import {createElement} from '../utils';

const createTripMessageMarkup = () => {
  return `
    <p class="trip-events__msg">Click New Event to create your first point</p>
  `;
};

class MessageCreatePoint {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripMessageMarkup();
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

export default MessageCreatePoint;
