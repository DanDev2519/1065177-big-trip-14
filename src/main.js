import {createSiteMenuMarkup} from './view/site-menu';
import {createTripInfoMarkup} from './view/trip-info';
import {createSiteFiltersMarkup} from './view/site-filters';
import {createTripSortMarkup} from './view/trip-sort';
import {createTripPointListMarkup} from './view/trip-point-list';
import {createTripPointMarkup} from './view/trip-point';
import {createTripEditMarkup} from './view/trip-edit';
import {createTripCreateMarkup} from './view/trip-create';

const TRIP_POINT_COUNT = 3;

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
render(tripMain, createTripInfoMarkup(), 'afterbegin');
render(tripControlsFilters, createSiteFiltersMarkup());
render(tripEvents, createTripSortMarkup());
render(tripEvents, createTripPointListMarkup());

const tripEventsList = tripEvents.querySelector('.trip-events__list');

render(tripEventsList, createTripCreateMarkup());
render(tripEventsList, createTripEditMarkup());

for (let i = 0; i < TRIP_POINT_COUNT; i++) {
  render(tripEventsList, createTripPointMarkup());
}
