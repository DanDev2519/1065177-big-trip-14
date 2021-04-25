import TripSortView from '../view/trip-sort';
import TripEventsLisView from '../view/trip-point-list';
import TripPointView from '../view/trip-point';
import TripEditPointView from '../view/trip-edit';
import TripAddPointView from '../view/trip-create';
import MessageCreatePointView from '../view/trip-message';
import {render, RenderPosition, replace} from '../utils/render';

class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._sortComponent = new TripSortView();
    this._pointsListComponent = new TripEventsLisView();
    this._messageCreateComponent = new MessageCreatePointView();
  }

  init(tripPoints, tripOffers, tripDestinations) {
    this._tripPoints = tripPoints.slice();
    this._tripOffers = tripOffers.slice();
    this._tripDestinations = tripDestinations.slice();

    this._renderTrip();
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent);
  }

  _renderPoint(point) {
    const destinationPoint = this._tripDestinations.find((obj) => obj.name === point.destination);
    const offersPointArr = this._tripOffers.find((obj) => obj.type === point.type).offers;
    const pointComponent = new TripPointView(point);
    const pointEditComponent = new TripEditPointView(point, offersPointArr, destinationPoint);

    const switchPointToEdit = () => {
      replace(pointEditComponent, pointComponent);
    };

    const switchPointToView = () => {
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        switchPointToView();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      switchPointToEdit();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      switchPointToView();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(this._pointsListContainer, pointComponent);
  }

  _renderPoints() {
    this._tripPoints.forEach((tripPoint) => this._renderPoint(tripPoint));
  }

  _renderPointAdd() {
    const pointAddComponent = new TripAddPointView(this._tripOffers, this._tripDestinations);

    render(this._pointsListContainer, pointAddComponent, RenderPosition.AFTERBEGIN);
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
