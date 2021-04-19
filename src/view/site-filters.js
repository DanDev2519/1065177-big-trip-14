import {createElement} from '../utils';

const createFilterItemMarkup = (filter, isChecked) => {
  const {name, count} = filter;

  return `<div class="trip-filters__filter">
      <input
        id="filter-${name}"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value="${name}"
        ${count === 0 ? 'disabled' : ''}
        ${isChecked ? 'checked' : ''}/>
      <label
        class="trip-filters__filter-label"
        for="filter-${name}">${name}</label>
    </div>`;
};

const createSiteFiltersMarkup = (filterItems) => {
  const filterItemsMarkup = filterItems
    .map((filter, index) => createFilterItemMarkup(filter, index === 0))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
      ${filterItemsMarkup}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};

class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createSiteFiltersMarkup(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default Filter;
