import AbstractView from './abstract';

const createTripMessageMarkup = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>
  `;
};

class MessageCreatePoint extends AbstractView {
  getTemplate() {
    return createTripMessageMarkup();
  }
}

export default MessageCreatePoint;
