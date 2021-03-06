import Observer from '../utils/observer';

class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice();

    this._notify(updateType);
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        dateIn: point.date_from,
        dateOut: point.date_to,
        destination: Object.assign(
          {},
          {
            name: point.destination.name,
            description: point.destination.description,
            pictures: point.destination.pictures.slice(),
          },
        ),
        price: point.base_price,
        options: point.offers.map(({title, price}) => {
          return {name: title, cost: price};
        }),
        isFavorite: point.is_favorite,
      },
    );

    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.base_price;
    delete adaptedPoint.offers;
    delete adaptedPoint.is_favorite;

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        'date_from': point.dateIn,
        'date_to': point.dateOut,
        'destination': Object.assign(
          {},
          {
            name: point.destination.name,
            description: point.destination.description,
            pictures: point.destination.pictures.slice(),
          },
        ),
        'base_price': point.price,
        'offers': point.options.map(({name, cost}) => {
          return {title: name, price: cost};
        }),
        'is_favorite': point.isFavorite,
      },
    );

    delete adaptedPoint.dateIn;
    delete adaptedPoint.dateOut;
    delete adaptedPoint.price;
    delete adaptedPoint.options;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}

export default Points;
