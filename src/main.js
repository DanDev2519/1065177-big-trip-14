import SiteMenuView from './view/site-menu';
import TripInfoView from './view/trip-info';
import FilterView from './view/site-filters';
import {generatePoint} from './mock/point';
import {generateDestination} from './mock/destination';
import {generateOfferList} from './mock/offer';
// import {generateFilter} from './mock/filter';
import {render, RenderPosition} from './utils/render';
import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';
import PointsModel from './model/points';
import OffersModel from './model/offers';
import DestinationsModel from './model/destinations';
import FilterModel from './model/filter';

const TRIP_POINT_COUNT = 2;

const destinations = generateDestination();
const offers = generateOfferList();
const points = new Array(TRIP_POINT_COUNT).fill().map(() => {return generatePoint(offers);});
// console.log(points, offers, destinations);

// const filters = generateFilter(points);
// const filters = [
//   {
//     type: 'everything',
//     name: 'everything',
//     count: 2,
//   },
// ];

const pointsModel = new PointsModel();
pointsModel.setPoints(points);
const offersModel = new OffersModel();
offersModel.setOffers(offers);
const destinationsModel = new DestinationsModel();
destinationsModel.setDestinations(destinations);

const filterModel = new FilterModel();

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripControlsNavigation = tripMain.querySelector('.trip-controls__navigation');
const tripControlsFilters = tripMain.querySelector('.trip-controls__filters');
const pageMain = document.querySelector('.page-main');
const tripEvents = pageMain.querySelector('.trip-events');

render(tripControlsNavigation, new SiteMenuView());
render(tripMain, new TripInfoView(pointsModel), RenderPosition.AFTERBEGIN);

const tripPresenter = new TripPresenter(tripEvents, pointsModel, offersModel, destinationsModel, filterModel);
const filterPresenter = new FilterPresenter(tripControlsFilters, filterModel, pointsModel);

filterPresenter.init();
tripPresenter.init();
