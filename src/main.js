import SiteMenuView from './view/site-menu';
import TripInfoView from './view/trip-info';
import FilterView from './view/site-filters';
import TripSortView from './view/trip-sort';
import TripEventsLisView from './view/trip-point-list';
import TripPointView from './view/trip-point';
import TripEditPointView from './view/trip-edit';
import TripAddPointView from './view/trip-create';
import MessageCreatePointView from './view/trip-message';
import {generatePoint} from './mock/point';
import {generateDestination} from './mock/destination';
import {generateOfferList} from './mock/offer';
import {generateFilter} from './mock/filter';
import {render, RenderPosition, replace} from './utils/render';

const TRIP_POINT_COUNT = 15;

const destinations = generateDestination();
const offers = generateOfferList();
const points = new Array(TRIP_POINT_COUNT).fill().map(() => {return generatePoint(offers);});
const filters = generateFilter(points);

const renderPoint = (pointListElement, point, offersPoints, destinationsPoints) => {
  const destinationPoint = destinationsPoints.find((obj) => obj.name === point.destination);
  const offersPointArr = offersPoints.find((obj) => obj.type === point.type).offers;
  const pointComponent = new TripPointView(point);
  const pointEditComponent = new TripEditPointView(point, offersPointArr, destinationPoint);

  const switchPointToEdit = () => {
    replace(pointEditComponent, pointComponent);
  };

  const switchPointToView = () => {
    replace(pointComponent, pointEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      switchPointToView();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.setEditClickHandler(() => {
    switchPointToEdit();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setFormSubmitHandler(() => {
    switchPointToView();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(pointListElement, pointComponent);
};

const renderEvents = (containerEvents, pointsEvent, offersEvent, destinationsEvent) => {
  if (pointsEvent.length) {
    render(containerEvents, new TripSortView());
    render(containerEvents, new TripEventsLisView());

    const tripEventsList = containerEvents.querySelector('.trip-events__list');

    render(tripEventsList, new TripAddPointView(offersEvent, destinationsEvent), RenderPosition.AFTERBEGIN);

    for (let i = 0; i < TRIP_POINT_COUNT; i++) {
      renderPoint(tripEventsList, pointsEvent[i], offersEvent, destinationsEvent);
    }
  } else {
    render(containerEvents, new MessageCreatePointView());
  }
};

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripControlsNavigation = tripMain.querySelector('.trip-controls__navigation');
const tripControlsFilters = tripMain.querySelector('.trip-controls__filters');
const pageMain = document.querySelector('.page-main');
const tripEvents = pageMain.querySelector('.trip-events');

render(tripControlsNavigation, new SiteMenuView());
render(tripMain, new TripInfoView(points), RenderPosition.AFTERBEGIN);
render(tripControlsFilters, new FilterView(filters));

renderEvents(tripEvents, points, offers, destinations);

