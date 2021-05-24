import SiteMenuView from './view/site-menu';
import TripInfoView from './view/trip-info';
import StatisticsView from './view/statistics';
import {generatePoint} from './mock/point';
import {generateDestination} from './mock/destination';
import {generateOfferList} from './mock/offer';
import {render, RenderPosition, remove} from './utils/render';
import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';
import PointsModel from './model/points';
import OffersModel from './model/offers';
import DestinationsModel from './model/destinations';
import FilterModel from './model/filter';
import {MenuItem, UpdateType, FilterType} from './const';

const TRIP_POINT_COUNT = 2;

const destinations = generateDestination();
const offers = generateOfferList();
const points = new Array(TRIP_POINT_COUNT).fill().map(() => {return generatePoint(offers);});
// console.log(points, offers, destinations);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);
const offersModel = new OffersModel();
offersModel.setOffers(offers);
const destinationsModel = new DestinationsModel();
destinationsModel.setDestinations(destinations);

const filterModel = new FilterModel();
const siteMenuComponent = new SiteMenuView();

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripControlsNavigation = tripMain.querySelector('.trip-controls__navigation');
const tripControlsFilters = tripMain.querySelector('.trip-controls__filters');
const pageMain = document.querySelector('.page-main');
const pageBodyContainer = pageMain.querySelector('.page-body__container');
const tripEvents = pageMain.querySelector('.trip-events');

render(tripControlsNavigation, siteMenuComponent);
render(tripMain, new TripInfoView(pointsModel), RenderPosition.AFTERBEGIN);

const tripPresenter = new TripPresenter(tripEvents, pointsModel, offersModel, destinationsModel, filterModel);
const filterPresenter = new FilterPresenter(tripControlsFilters, filterModel, pointsModel);

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      tripPresenter.init();
      remove(statisticsComponent);
      statisticsComponent = null;
      break;
    case MenuItem.STATS:
      if (statisticsComponent !== null) {
        return;
      }
      tripPresenter.destroy();
      statisticsComponent = new StatisticsView(pointsModel.getPoints());
      render(pageBodyContainer, statisticsComponent);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();

  if (statisticsComponent) {
    siteMenuComponent.setMenuItem(MenuItem.TABLE);
    handleSiteMenuClick(MenuItem.TABLE);
  }
});
