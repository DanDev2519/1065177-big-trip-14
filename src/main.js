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

const TRIP_POINT_COUNT = 4;

const destinations = generateDestination();
const offers = generateOfferList();
const points = new Array(TRIP_POINT_COUNT).fill().map(() => {return generatePoint(offers);});
console.log(points);
console.log(offers);
console.log(destinations);
const filters = generateFilter(points);

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripControlsNavigation = tripMain.querySelector('.trip-controls__navigation');
const tripControlsFilters = tripMain.querySelector('.trip-controls__filters');
const pageMain = document.querySelector('.page-main');
const tripEvents = pageMain.querySelector('.trip-events');

render(tripControlsNavigation, createSiteMenuMarkup());
render(tripMain, createTripInfoMarkup(points), 'afterbegin');
render(tripControlsFilters, createSiteFiltersMarkup(filters));

if (points.length) {
  render(tripEvents, createTripSortMarkup());
  render(tripEvents, createTripPointListMarkup());

  const tripEventsList = tripEvents.querySelector('.trip-events__list');

  // render(tripEventsList, createTripAddMarkup(offers, destinations));
  const destination = destinations.find((obj) => obj.name === points[0].destination);
  const offerArr = offers.find((obj) => obj.type === points[0].type).offers;
  render(tripEventsList, createTripEditMarkup(points[0], offerArr, destination));

  for (let i = 1; i < TRIP_POINT_COUNT; i++) {
    render(tripEventsList, createTripPointMarkup(points[i]));
  }
} else {
  render(tripEvents, createTripMessageMarkup());
}

