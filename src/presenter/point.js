import TripPointView from '../view/trip-point';
import TripEditPointView from '../view/trip-edit';
import {render, RenderPosition, replace, remove} from '../utils/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

class Point {
  constructor(pointsListContainer, changeData, changeMode) {
    this._pointsListContainer = pointsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handlerFavoriteClick = this._handlerFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(point, pointOffers, pointDestinations) {
    this._point = point;
    this._pointOffers = pointOffers.slice();
    this._pointDestinations = pointDestinations.slice();

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    const destinationPoint = this._pointDestinations.find((obj) => obj.name === point.destination);
    const offersPointArr = this._pointOffers.find((obj) => obj.type === point.type).offers;
    this._pointComponent = new TripPointView(this._point);
    this._pointEditComponent = new TripEditPointView(this._point, offersPointArr, destinationPoint);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointComponent.setFavoriteClickHandler(this._handlerFavoriteClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    if (prevPointComponent == null || prevPointEditComponent == null) {
      render(this._pointsListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._switchPointToView();
    }
  }

  _switchPointToEdit() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _switchPointToView() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
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

  _handlerFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._point,
        {
          isFavorite: !this._point.isFavorite,
        },
      ),
    );
  }

  _handleFormSubmit(point) {
    this._changeData(point);
    this._switchPointToView();
  }
}

export default Point;
