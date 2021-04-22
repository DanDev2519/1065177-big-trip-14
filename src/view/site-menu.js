import AbstractView from './abstract';

const createSiteMenuMarkup = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>
  `;
};

class SiteMenu extends AbstractView {
  getTemplate() {
    return createSiteMenuMarkup();
  }
}

export default SiteMenu;
