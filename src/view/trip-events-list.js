import AbstractView from './abstract';

const createTripEventsListMarkup = () => {
  return `<ul class="trip-events__list">
    </ul>`;
};

class TripEventsList extends AbstractView {
  getTemplate() {
    return createTripEventsListMarkup();
  }
}

export default TripEventsList;
