import AbstractView from './abstract';

const createFilterItemMarkup = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return `<div class="trip-filters__filter">
      <input
        id="filter-${name}"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type}"
        ${count === 0 ? 'disabled' : ''}
        ${type === currentFilterType ? 'checked' : ''}/>
      <label
        class="trip-filters__filter-label"
        for="filter-${name}">${name}</label>
    </div>`;
};

const createSiteFiltersMarkup = (filterItems, currentFilterType) => {
  const filterItemsMarkup = filterItems
    .map((filter) => createFilterItemMarkup(filter, currentFilterType))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
      ${filterItemsMarkup}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};

class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSiteFiltersMarkup(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }
}

export default Filter;
