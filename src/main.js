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
import TripPresenter from './presenter/trip';

const TRIP_POINT_COUNT = 15;

const destinations = generateDestination();
const offers = generateOfferList();
const points = new Array(TRIP_POINT_COUNT).fill().map(() => {return generatePoint(offers);});
const filters = generateFilter(points);

// console.log(points.slice(), offers.slice(), destinations.slice());

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripControlsNavigation = tripMain.querySelector('.trip-controls__navigation');
const tripControlsFilters = tripMain.querySelector('.trip-controls__filters');
const pageMain = document.querySelector('.page-main');
const tripEvents = pageMain.querySelector('.trip-events');

render(tripControlsNavigation, new SiteMenuView());
render(tripMain, new TripInfoView(points), RenderPosition.AFTERBEGIN);
render(tripControlsFilters, new FilterView(filters));

const tripPresenter = new TripPresenter(tripEvents);

tripPresenter.init(points, offers, destinations);
