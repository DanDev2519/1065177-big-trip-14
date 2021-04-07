import {getRandomInteger} from './utils';

const getRandomCost =  () => getRandomInteger(0, 300);

const generateOfferList = () => {
  return [
    {
      type: 'taxi',
      offers: [
        {name: 'Order Uber', cost: getRandomCost()},
        {name: 'Add luggage', cost:  getRandomCost()},
        {name: 'Travel by train', cost: getRandomCost()},
        {name: 'Switch to comfort', cost:  getRandomCost()},
      ],
    },
    {
      type: 'bus',
      offers: [
        {name: 'Add luggage', cost:  getRandomCost()},
        {name: 'Travel by train', cost: getRandomCost()},
        {name: 'Book tickets', cost: getRandomCost()},
      ],
    },
    {
      type: 'train',
      offers: [
        {name: 'Add luggage', cost:  getRandomCost()},
        {name: 'Switch to comfort', cost:  getRandomCost()},
        {name: 'Add breakfast', cost: getRandomCost()},
        {name: 'Travel by plane', cost: getRandomCost()},
        {name: 'Book tickets', cost: getRandomCost()},
      ],
    },
    {
      type: 'ship',
      offers: [
        {name: 'Add luggage', cost:  getRandomCost()},
        {name: 'Switch to comfort', cost:  getRandomCost()},
        {name: 'Add breakfast', cost: getRandomCost()},
        {name: 'Travel by plane', cost: getRandomCost()},
        {name: 'Book tickets', cost: getRandomCost()},
      ],
    },
    {
      type: 'transport',
      offers: [
        {name: 'Order Uber', cost: getRandomCost()},
        {name: 'Switch to comfort', cost:  getRandomCost()},
        {name: 'Rent a car', cost: getRandomCost()},
      ],
    },
    {
      type: 'drive',
      offers: [
        {name: 'Order Uber', cost: getRandomCost()},
        {name: 'Rent a car', cost: getRandomCost()},
        {name: 'Lunch in city', cost: getRandomCost()},
        {name: 'Travel by train', cost: getRandomCost()},
      ],
    },
    {
      type: 'flight',
      offers: [
        {name: 'Order Uber', cost: getRandomCost()},
        {name: 'Add luggage', cost:  getRandomCost()},
        {name: 'Switch to comfort', cost:  getRandomCost()},
        {name: 'Add breakfast', cost: getRandomCost()},
        {name: 'Book tickets', cost: getRandomCost()},
        {name: 'Travel by train', cost: getRandomCost()},
      ],
    },
    {
      type: 'check-in',
      offers: [
        {name: 'Order Uber', cost: getRandomCost()},
        {name: 'Switch to comfort', cost:  getRandomCost()},
        {name: 'Rent a car', cost: getRandomCost()},
      ],
    },
    {
      type: 'sightseeing',
      offers: [
        {name: 'Order Uber', cost: getRandomCost()},
        {name: 'Rent a car', cost: getRandomCost()},
        {name: 'Book tickets', cost: getRandomCost()},
        {name: 'Lunch in city', cost: getRandomCost()},
      ],
    },
    {
      type: 'restaurant',
      offers: [
        {name: 'Order Uber', cost: getRandomCost()},
        {name: 'Add breakfast', cost: getRandomCost()},
        {name: 'Book table', cost: getRandomCost()},
      ],
    },
  ];
};

const getAllOffer = (type) => {
  const offerList = generateOfferList();
  const allOffers = offerList.filter((obj) => obj.type === type)[0].offers;
  return allOffers;
};

const generateOffer = (type) => {
  const allOffers = getAllOffer(type);
  const offersArray = [];
  let count = getRandomInteger(0, 5);
  while (count) {
    offersArray.push(allOffers[getRandomInteger(0, allOffers.length - 1)]);
    count--;
  }
  const offers = Array.from(new Set(offersArray));
  return offers;
};

//_____________________________
// Вариант с изменением самой точки марщрута
//_____________________________
// const generateOfferName = () => {
//   const offerNames = [
//     'Order Uber',
//     'Add luggage',
//     'Switch to comfort',
//     'Rent a car',
//     'Add breakfast',
//     'Book tickets',
//     'Lunch in city',
//     'Travel by train'
//     'Travel by plain'
//   ];
//   const randomIndex = getRandomInteger(0, offerNames.length-1);
//   return offerNames[randomIndex];
// };

// const generateOffer = (points) => {
//   for (const point of points) {
//     let count = getRandomInteger(0, 5);
//     while (count) {
//       point.options.push({
//         name: generateOfferName(),
//         cost: getRandomInteger(0, 300),
//       });
//       count--;
//     }
//   }
//   return points;
// };

export {generateOffer, getAllOffer};
