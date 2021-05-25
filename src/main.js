import SiteMenuView from './view/site-menu';
import StatisticsView from './view/statistics';
import SiteErrorView from './view/site-error';
// import {generatePoint} from './mock/point';
// import {generateDestination} from './mock/destination';
// import {generateOfferList} from './mock/offer';
import {render, remove} from './utils/render';
import TripInfoPresenter from './presenter/trip-info';
import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';
import PointsModel from './model/points';
import OffersModel from './model/offers';
import DestinationsModel from './model/destinations';
import FilterModel from './model/filter';
import {MenuItem, UpdateType, FilterType} from './const';
import Api from './api.js';

const AUTHORIZATION = 'Basic MTA2NTE3NzpiaWctdHJpcC0xNAoKCg==';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';

// const TRIP_POINT_COUNT = 2;
// const destinations = generateDestination();
// const offers = generateOfferList();
// const points = new Array(TRIP_POINT_COUNT).fill().map(() => {return generatePoint(offers);});
// console.log(points, offers, destinations);

const api = new Api(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

const siteMenuComponent = new SiteMenuView();

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const newPointButton = pageHeader.querySelector('.trip-main__event-add-btn');
const tripControlsNavigation = tripMain.querySelector('.trip-controls__navigation');
const tripControlsFilters = tripMain.querySelector('.trip-controls__filters');
const pageMain = document.querySelector('.page-main');
const pageBodyContainer = pageMain.querySelector('.page-body__container');
const tripEvents = pageMain.querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripEvents, pointsModel, offersModel, destinationsModel, filterModel, api);
const filterPresenter = new FilterPresenter(tripControlsFilters, filterModel, pointsModel);
const tripInfoPresenter = new TripInfoPresenter(tripMain, pointsModel);

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

const initHeader = () => {
  filterPresenter.init();
  newPointButton.removeAttribute('disabled');

  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  render(tripControlsNavigation, siteMenuComponent);

  newPointButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    tripPresenter.createPoint();

    if (statisticsComponent) {
      siteMenuComponent.setMenuItem(MenuItem.TABLE);
      handleSiteMenuClick(MenuItem.TABLE);
    }
  });
};

Promise
  .all([
    api.getOffers().then((offers) => {
      // console.log(offers);
      offersModel.setOffers(offers);
    }),
    api.getDestinations().then((destinations) => {
      // console.log(destinations);
      destinationsModel.setDestinations(destinations);
    }),
  ])
  .catch(() => {
    render(tripEvents, new SiteErrorView());
  })
  .then(() => {
    tripInfoPresenter.init();
    tripPresenter.init();

    api.getPoints()
      .then((points) => {
        // console.log(points);
        pointsModel.setPoints(UpdateType.INIT, points);
        initHeader();
      })
      .catch(() => {
        pointsModel.setPoints(UpdateType.INIT, []);
        initHeader();
      });
  });
