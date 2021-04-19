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
import {render, RenderPosition} from './utils';

const TRIP_POINT_COUNT = 15;

const destinations = generateDestination();
const offers = generateOfferList();
const points = new Array(TRIP_POINT_COUNT).fill().map(() => {return generatePoint(offers);});
const filters = generateFilter(points);

const renderPoint = (pointListElement, point) => {
  const destination = destinations.find((obj) => obj.name === point.destination);
  const offerArr = offers.find((obj) => obj.type === point.type).offers;
  const pointComponent = new TripPointView(point);
  const pointEditComponent = new TripEditPointView(point, offerArr, destination);

  const switchPointToEdit = () => {
    pointListElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const switchPointToView = () => {
    pointListElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      switchPointToView();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    switchPointToEdit();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    switchPointToView();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(pointListElement, pointComponent.getElement());
};

const renderEvents = () => {
  if (points.length) {
    render(tripEvents, new TripSortView().getElement());
    render(tripEvents, new TripEventsLisView().getElement());

    const tripEventsList = tripEvents.querySelector('.trip-events__list');

    render(tripEventsList, new TripAddPointView(offers, destinations).getElement(), RenderPosition.AFTERBEGIN);

    for (let i = 0; i < TRIP_POINT_COUNT; i++) {
      renderPoint(tripEventsList, points[i]);
    }
  } else {
    render(tripEvents, new MessageCreatePointView().getElement());
  }
};

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripControlsNavigation = tripMain.querySelector('.trip-controls__navigation');
const tripControlsFilters = tripMain.querySelector('.trip-controls__filters');
const pageMain = document.querySelector('.page-main');
const tripEvents = pageMain.querySelector('.trip-events');

render(tripControlsNavigation, new SiteMenuView().getElement());
render(tripMain, new TripInfoView(points).getElement(), RenderPosition.AFTERBEGIN);
render(tripControlsFilters, new FilterView(filters).getElement());

renderEvents();

