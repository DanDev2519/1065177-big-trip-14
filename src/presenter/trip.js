import TripSortView from '../view/trip-sort';
import TripEventsLisView from '../view/trip-point-list';
import TripAddPointView from '../view/trip-create';
import MessageCreatePointView from '../view/trip-message';
import PointPresenter from './point';
import {render, RenderPosition} from '../utils/render';
import {updateItem} from '../utils/common';
import {sortPointDayDown, sortPointTimeDown, sortPointPriceDown} from '../utils/trip';
import {SortType} from '../const.js';

class Trip {
  constructor(tripContainer, pointsModel, offersModel, destinationsModel) {
    this._tripContainer = tripContainer;
    this._pointsModel = pointsModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._pointPresenter = {};
    this._currentSortType = SortType.DAY_DOWN;

    this._sortComponent = new TripSortView();
    this._pointsListComponent = new TripEventsLisView();
    this._messageCreateComponent = new MessageCreatePointView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handlerPointReset = this._handlerPointReset.bind(this);
  }

  init(tripPoints, tripOffers, tripDestinations) {
    this._tripPoints = tripPoints.slice().sort(sortPointDayDown);
    this._tripOffers = tripOffers.slice();
    this._tripDestinations = tripDestinations.slice();
    this._sourcedTripPoints = this._tripPoints.slice();

    this._renderTrip();
  }

  _getPoints() {
    return this._pointsModel.getPoints();
  }

  _getOffers() {
    return this._offersModel.getOffers();
  }

  _getDestinations() {
    return this._destinationsModel.getDestinations();
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._sourcedTripPoints = updateItem(this._sourcedTripPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint, this._tripOffers, this._tripDestinations);
  }

  _handlerPointReset() {
    this._clearPointList();
    this._renderPoints();
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.PRICE_DOWN:
        this._tripPoints.sort(sortPointPriceDown);
        break;
      case SortType.TIME_DOWN:
        this._tripPoints.sort(sortPointTimeDown);
        break;
      default:
        this._tripPoints = this._sourcedTripPoints.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearPointList();
    this._renderPoints();
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsListContainer, this._handlePointChange, this._handleModeChange, this._handlerPointReset);
    pointPresenter.init(point, this._tripOffers, this._tripDestinations);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints() {
    this._tripPoints.forEach((tripPoint) => this._renderPoint(tripPoint));
  }

  _renderPointAdd() {
    this._pointAddComponent = new TripAddPointView(this._tripOffers, this._tripDestinations);

    render(this._pointsListContainer, this._pointAddComponent, RenderPosition.AFTERBEGIN);
  }

  _clearPointList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _renderPointsList() {
    render(this._tripContainer, this._pointsListComponent);

    this._pointsListContainer = this._tripContainer.querySelector('.trip-events__list');
  }

  _renderMessageCreate() {
    render(this._tripContainer, this._messageCreateComponent);
  }

  _renderTrip() {
    if (this._tripPoints.length) {
      this._renderSort();
      this._renderPointsList();
      this._renderPointAdd();
      this._renderPoints();
    } else {
      this.__renderMessageCreate();
    }

  }
}

export default Trip;
