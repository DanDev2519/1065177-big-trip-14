import TripPointView from '../view/trip-point';
import TripEditPointView from '../view/trip-edit-point';
import {render, RenderPosition, replace, remove} from '../utils/render';
import {isOnline} from '../utils/common';
import {toast} from '../utils/toast';
import {UserAction, UpdateType} from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

class Point {
  constructor(pointsListContainer, changeData, changeMode, reset) {
    this._pointsListContainer = pointsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._reset = reset;

    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handlerFavoriteClick = this._handlerFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormReset = this._handleFormReset.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handlerPointEditChange = this._handlerPointEditChange.bind(this);
  }

  init(point, pointOffers, pointDestinations, offersType, destinationsCity) {
    this._point = point;
    this._pointOffers = pointOffers.slice();
    this._pointDestinations = pointDestinations.slice();
    this._offersType = offersType.slice();
    this._destinationsCity = destinationsCity.slice();

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointEditComponent = new TripEditPointView(this._point, this._pointOffers, this._pointDestinations, this._offersType, this._destinationsCity);

    this._pointComponent = new TripPointView(this._point);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointComponent.setFavoriteClickHandler(this._handlerFavoriteClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setFormResetHandler(this._handleFormReset);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._pointEditComponent.setPointEditChangeHandler(this._handlerPointEditChange);

    if (prevPointComponent === null || prevPointEditComponent === null) {
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
    this._pointEditComponent.removerDatepicker();

    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._switchPointToView();
    }
  }

  setViewState(state) {
    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    switch (state) {
      case State.SAVING:
        this._pointEditComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this._pointEditComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case State.ABORTING:
        this._pointComponent.shake(resetFormState);
        this._pointEditComponent.shake(resetFormState);
        break;
    }
  }

  _switchPointToEdit() {
    this._pointEditComponent.setDatepicker();

    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _switchPointToView() {
    this._pointEditComponent.removerDatepicker();

    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._handleFormReset();
    }
  }

  _handlerPointEditChange(point) {
    this._pointEditComponent.removerDatepicker();
    this.init(point, this._pointOffers, this._pointDestinations, this._offersType, this._destinationsCity);
    this._pointEditComponent.setDatepicker();
  }

  _handleEditClick() {
    if (!isOnline()) {
      toast('You can\'t edit point offline');
      return;
    }

    this._switchPointToEdit();
  }

  _handlerFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
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
    if (!isOnline()) {
      toast('You can\'t save pint offline');
      return;
    }

    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point,
    );
  }

  _handleDeleteClick(point) {
    if (!isOnline()) {
      toast('You can\'t delete point offline');
      return;
    }

    this._changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  }

  _handleFormReset() {
    this._reset();
  }
}

export { State };
export default Point;
