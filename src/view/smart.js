import Abstract from './abstract';

class Smart extends Abstract {
  constructor() {
    super();
    this._pointData = {};
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._pointData = Object.assign(
      {},
      this._pointData,
      update,
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}

export default Smart;
