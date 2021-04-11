
const createFilterItemMarkup = (filter, isChecked) => {
  const {name, count} = filter;

  return `
    <div class="trip-filters__filter">
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

  return `
    <form class="trip-filters" action="#" method="get">
      ${filterItemsMarkup}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
};

export {createSiteFiltersMarkup} ;
