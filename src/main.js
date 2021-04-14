import {createSiteMenuMarkup} from './view/site-menu';
import {createTripInfoMarkup} from './view/trip-info';
import {createSiteFiltersMarkup} from './view/site-filters';
import {createTripSortMarkup} from './view/trip-sort';
import {createTripPointListMarkup} from './view/trip-point-list';
import {createTripPointMarkup} from './view/trip-point';
import {createTripEditMarkup} from './view/trip-edit';
// import {createTripAddMarkup} from './view/trip-create';
import {createTripMessageMarkup} from './view/trip-message';
import {generatePoint} from './mock/point';
import {generateDestination} from './mock/destination';
import {generateOfferList} from './mock/offer';
import {generateFilter} from './mock/filter';
import {renderTemplate} from './utils.js';

const TRIP_POINT_COUNT = 4;

const destinations = generateDestination();
const offers = generateOfferList();
const points = new Array(TRIP_POINT_COUNT).fill().map(() => {return generatePoint(offers);});
const filters = generateFilter(points);

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripControlsNavigation = tripMain.querySelector('.trip-controls__navigation');
const tripControlsFilters = tripMain.querySelector('.trip-controls__filters');
const pageMain = document.querySelector('.page-main');
const tripEvents = pageMain.querySelector('.trip-events');

renderTemplate(tripControlsNavigation, createSiteMenuMarkup());
renderTemplate(tripMain, createTripInfoMarkup(points), 'afterbegin');
renderTemplate(tripControlsFilters, createSiteFiltersMarkup(filters));

if (points.length) {
  renderTemplate(tripEvents, createTripSortMarkup());
  renderTemplate(tripEvents, createTripPointListMarkup());

  const tripEventsList = tripEvents.querySelector('.trip-events__list');

  // renderTemplate(tripEventsList, createTripAddMarkup(offers, destinations));
  const destination = destinations.find((obj) => obj.name === points[0].destination);
  const offerArr = offers.find((obj) => obj.type === points[0].type).offers;
  renderTemplate(tripEventsList, createTripEditMarkup(points[0], offerArr, destination));

  for (let i = 1; i < TRIP_POINT_COUNT; i++) {
    renderTemplate(tripEventsList, createTripPointMarkup(points[i]));
  }
} else {
  renderTemplate(tripEvents, createTripMessageMarkup());
}

