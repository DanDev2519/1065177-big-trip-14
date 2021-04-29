import TripSortView from '../view/trip-sort';
import TripEventsLisView from '../view/trip-point-list';
import TripAddPointView from '../view/trip-create';
import MessageCreatePointView from '../view/trip-message';
import PointPresenter from './point';
import {render, RenderPosition} from '../utils/render';
import {updateItem} from '../utils/common.js';

class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._pointPresenter = {};

    this._sortComponent = new TripSortView();
    this._pointsListComponent = new TripEventsLisView();
    this._messageCreateComponent = new MessageCreatePointView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(tripPoints, tripOffers, tripDestinations) {
    this._tripPoints = tripPoints.slice();
    this._tripOffers = tripOffers.slice();
    this._tripDestinations = tripDestinations.slice();

    this._renderTrip();
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint, this._tripOffers, this._tripDestinations);
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsListContainer, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point, this._tripOffers, this._tripDestinations);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints() {
    this._tripPoints.forEach((tripPoint) => this._renderPoint(tripPoint));
  }

  _renderPointAdd() {
    const pointAddComponent = new TripAddPointView(this._tripOffers, this._tripDestinations);

    render(this._pointsListContainer, pointAddComponent, RenderPosition.AFTERBEGIN);
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
