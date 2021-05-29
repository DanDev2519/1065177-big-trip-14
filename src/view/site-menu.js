import AbstractView from './abstract';
import {MenuItem} from '../const';

const createSiteMenuMarkup = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-menu="${MenuItem.TABLE}">Table</a>
      <a class="trip-tabs__btn" href="#" data-menu="${MenuItem.STATS}">Stats</a>
    </nav>`;
};

class SiteMenu extends AbstractView {
  constructor() {
    super();
    this._currentMenu = MenuItem.TABLE;

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuMarkup();
  }

  setMenuItem(menuItem) {
    const items = this.getElement().querySelectorAll('[data-menu]');
    this._currentMenu = menuItem;
    if (items.length) {
      items.forEach((item) => {
        item.classList.remove('trip-tabs__btn--active');
        if (item.dataset.menu === menuItem) {
          item.classList.add('trip-tabs__btn--active');
        }
      });
    }
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    if (this._currentMenu !== evt.target.dataset.menu) {
      this._callback.menuClick(evt.target.dataset.menu);
    }
    this.setMenuItem(evt.target.dataset.menu);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }
}

export default SiteMenu;
