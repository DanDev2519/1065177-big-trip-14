import Observer from '../utils/observer';

class Offers extends Observer {
  constructor() {
    super();
    this._offers = [];
  }

  setOffers(offers) {
    this._offers = offers.slice();
  }

  getOffers() {
    return this._offers || [];
  }

  getOffersType() {
    return this._offers.map((offer) => offer.type) || [];
  }

  static adaptToClient(offer) {
    const adaptedOffer = Object.assign(
      {},
      offer,
      {
        offers: offer.offers.map(({title, price}) => {
          return {name: title, cost: price};
        }),
      },
    );

    return adaptedOffer;
  }

  static adaptToServer(offer) {
    const adaptedOffer = Object.assign(
      {},
      offer,
      {
        offers: offer.offers.map(({name, cost}) => {
          return {title: name, price: cost};
        }),
      },
    );

    return adaptedOffer;
  }
}

export default Offers;
