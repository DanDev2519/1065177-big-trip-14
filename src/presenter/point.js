import TripPointView from '../view/trip-point';
import TripEditPointView from '../view/trip-edit';
import {render, RenderPosition, replace, remove} from '../utils/render';

class Point {
  constructor(pointsListContainer) {
    this._pointsListContainer = pointsListContainer;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(point, pointOffers, pointDestinations) {
    this._point = point;
    this._pointOffers = pointOffers.slice();
    this._pointDestinations = pointDestinations.slice();

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    // __Оставить const или нужно сделать их приватными this._
    const destinationPoint = this._pointDestinations.find((obj) => obj.name === point.destination);
    const offersPointArr = this._pointOffers.find((obj) => obj.type === point.type).offers;
    this._pointComponent = new TripPointView(this._point);
    this._pointEditComponent = new TripEditPointView(this._point, offersPointArr, destinationPoint);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    if (prevPointComponent == null || prevPointEditComponent == null) {
      render(this._pointsListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._pointsListContainer.getElement().contains(prevPointComponent.getElement())) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._pointsListContainer.getElement().contains(prevPointEditComponent.getElement())) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  _switchPointToEdit() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _switchPointToView() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._switchPointToView();
    }
  }

  _handleEditClick() {
    this._switchPointToEdit();
  }

  _handleFormSubmit() {
    this._switchPointToView();
  }
}

export default Point;
