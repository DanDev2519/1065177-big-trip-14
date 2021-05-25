import TripSortView from '../view/trip-sort';
import TripEventsLisView from '../view/trip-point-list';
import MessageCreatePointView from '../view/trip-message';
import SiteLoadingView from '../view/site-loading';
import PointPresenter, {State as PointPresenterViewState} from './point';
import PointNewPresenter from './point-new';
import {render, RenderPosition, remove} from '../utils/render';
import {sortPointDayDown, sortPointTimeDown, sortPointPriceDown} from '../utils/trip';
import {filter} from '../utils/filter';
import {SortType, UpdateType, UserAction, FilterType} from '../const';

class Trip {
  constructor(tripContainer, pointsModel, offersModel, destinationsModel, filterModel, api) {
    this._tripContainer = tripContainer;
    this._pointsModel = pointsModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._filterModel = filterModel;
    this._api = api;

    this._pointPresenter = {};
    this._currentSortType = SortType.DAY_DOWN;
    this._isLoading = true;

    this._sortComponent = null;
    this._pointsListComponent = null;
    this._messageCreateComponent = new MessageCreatePointView();
    this._loadingComponent = new SiteLoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handlerPointReset = this._handlerPointReset.bind(this);
  }

  init() {
    this._tripOffers = this._getOffers().slice();
    this._tripDestinations = this._getDestinations().slice();

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderTrip();
  }

  destroy() {
    this._clearTrip({resetSortType: true});

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createPoint() {
    this._currentSortType = SortType.DAY_DOWN;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    remove(this._messageCreateComponent);

    if (this._pointsListComponent === null) {
      this._renderPointsList();
    }

    if (this._pointNewPresenter) {
      this._pointNewPresenter.destroy();
      this._pointNewPresenter = null;
    }

    this._pointNewPresenter = new PointNewPresenter(this._pointsListContainer, this._handleViewAction);
    this._pointNewPresenter.init(this._tripOffers, this._tripDestinations);
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.DAY_DOWN:
        return filteredPoints.sort(sortPointDayDown);
      case SortType.PRICE_DOWN:
        return filteredPoints.sort(sortPointPriceDown);
      case SortType.TIME_DOWN:
        return filteredPoints.sort(sortPointTimeDown);
    }

    return filteredPoints;
  }

  _getOffers() {
    return this._offersModel.getOffers();
  }

  _getDestinations() {
    return this._destinationsModel.getDestinations();
  }

  _handleModeChange() {
    this._pointNewPresenter && this._pointNewPresenter.destroy();
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointPresenter[update.id].setViewState(PointPresenterViewState.SAVING);
        this._api.updatePoint(update)
          .then((response) => {
            this._pointsModel.updatePoint(updateType, response);
          })
          .catch(() => {
            this._pointPresenter[update.id].setViewState(PointPresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_POINT:
        this._pointNewPresenter.setSaving();
        this._api.addPoint(update)
          .then((response) => {
            this._pointsModel.addPoint(updateType, response);
          })
          .catch(() => {
            this._pointNewPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_POINT:
        this._pointPresenter[update.id].setViewState(PointPresenterViewState.DELETING);
        this._api.deletePoint(update)
          .then(() => {
            this._pointsModel.deletePoint(updateType, update);
          })
          .catch(() => {
            this._pointPresenter[update.id].setViewState(PointPresenterViewState.ABORTING);
          });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data, this._tripOffers, this._tripDestinations);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
    }
  }

  _handlerPointReset() {
    this._clearTrip();
    this._renderTrip();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new TripSortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsListContainer, this._handleViewAction, this._handleModeChange, this._handlerPointReset);
    pointPresenter.init(point, this._tripOffers, this._tripDestinations);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.forEach((tripPoint) => this._renderPoint(tripPoint));
  }

  _clearPointList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _renderPointsList() {
    if (this._pointsListComponent !== null) {
      this._pointsListComponent = null;
    }

    this._pointsListComponent = new TripEventsLisView();

    render(this._tripContainer, this._pointsListComponent);

    this._pointsListContainer = this._tripContainer.querySelector('.trip-events__list');
  }

  _renderMessageCreate() {
    render(this._tripContainer, this._messageCreateComponent);
  }

  _renderLoading() {
    render(this._tripContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _clearTrip({resetSortType = false} = {}) {
    this._pointNewPresenter && this._pointNewPresenter.destroy();
    this._clearPointList();

    remove(this._sortComponent);
    remove(this._pointsListComponent);
    this._pointsListComponent = null;
    remove(this._messageCreateComponent);
    remove(this._loadingComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY_DOWN;
    }
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const points = this._getPoints();
    const pointCount = points.length;

    if (pointCount) {
      this._renderSort();
      this._renderPointsList();
      this._renderPoints(points);
    } else {
      this._renderMessageCreate();
    }
  }
}

export default Trip;
