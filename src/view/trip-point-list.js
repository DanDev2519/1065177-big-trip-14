import AbstractView from './abstract';

const createTripEventsListMarkup = () => {
  return `<ul class="trip-events__list">
    </ul>`;
};

class TripEventsLis extends AbstractView {
  getTemplate() {
    return createTripEventsListMarkup();
  }
}

export default TripEventsLis;
