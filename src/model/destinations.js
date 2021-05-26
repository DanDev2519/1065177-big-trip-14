import Observer from '../utils/observer';

class Destinations extends Observer {
  constructor() {
    super();
    this._destinations = [];
  }

  setDestinations(destinations) {
    this._destinations = destinations.slice();
  }

  getDestinations() {
    return this._destinations;
  }

  getDestinationsCity() {
    return this._destinations.map((destination) => destination.name);
  }

  static adaptToClient(destination) {
    const adaptedDestination = Object.assign(
      {},
      destination,
      {
        img: destination.pictures.map(({src, description}) => {
          return {src, alt: description};
        }),
      },
    );
    delete adaptedDestination.pictures;

    return adaptedDestination;
  }

  static adaptToServer(destination) {
    const adaptedDestination = Object.assign(
      {},
      destination,
      {
        pictures: destination.img.map(({src, alt}) => {
          return {src, description: alt};
        }),
      },
    );
    delete adaptedDestination.img;

    return adaptedDestination;
  }
}

export default Destinations;
