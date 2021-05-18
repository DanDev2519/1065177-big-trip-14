import SiteMenuView from './view/site-menu';
import TripInfoView from './view/trip-info';
import FilterView from './view/site-filters';
import {generatePoint} from './mock/point';
import {generateDestination} from './mock/destination';
import {generateOfferList} from './mock/offer';
import {generateFilter} from './mock/filter';
import {render, RenderPosition} from './utils/render';
import TripPresenter from './presenter/trip';
import PointsModel from './model/points';
import OffersModel from './model/offers';
import DestinationsModel from './model/destinations';

const TRIP_POINT_COUNT = 2;

const destinations = generateDestination();
const offers = generateOfferList();
const points = new Array(TRIP_POINT_COUNT).fill().map(() => {return generatePoint(offers);});
const filters = generateFilter(points);

// console.log(points, offers, destinations);

const pointsModel = new PointsModel();
pointsModel.setTasks(points);
const offersModel = new OffersModel();
offersModel.setOffers(offers);
const destinationsModel = new DestinationsModel();
destinationsModel.setDestinations(destinations);

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripControlsNavigation = tripMain.querySelector('.trip-controls__navigation');
const tripControlsFilters = tripMain.querySelector('.trip-controls__filters');
const pageMain = document.querySelector('.page-main');
const tripEvents = pageMain.querySelector('.trip-events');

render(tripControlsNavigation, new SiteMenuView());
// _Передать в TripInfoView модель или можно pointsModel.getPoints()
render(tripMain, new TripInfoView(points), RenderPosition.AFTERBEGIN);
render(tripControlsFilters, new FilterView(filters));

const tripPresenter = new TripPresenter(tripEvents, pointsModel, offersModel, destinationsModel);

tripPresenter.init(points, offers, destinations);
