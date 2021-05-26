import TripAddPointView from '../view/trip-create';
import {render, RenderPosition, remove} from '../utils/render';
import {UserAction, UpdateType} from '../const.js';

class PointNew {
  constructor(pointsListContainer, changeData) {
    this._pointsListContainer = pointsListContainer;
    this._changeData = changeData;

    this._pointEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(pointOffers, pointDestinations, offersType, destinationsCity) {
    this._pointOffers = pointOffers.slice();
    this._pointDestinations = pointDestinations.slice();
    this._offersType = offersType.slice();
    this._destinationsCity = destinationsCity.slice();

    this._pointEditComponent = new TripAddPointView(this._pointOffers, this._pointDestinations, this._offersType, this._destinationsCity);

    render(this._pointsListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);

    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }

    this._pointEditComponent.removerDatepicker();
    remove(this._pointEditComponent);
    this._pointEditComponent = null;
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }

  setSaving() {
    this._pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
      });
    };

    this._pointEditComponent.shake(resetFormState);
  }

  _handleFormSubmit(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  }

  _handleDeleteClick() {
    this.destroy();
  }
}

export default PointNew;
