import {generatePoint} from './point';
import {getAllOffer} from './offer';
import {generateDestination} from './destination';


const generatePointEdit = () => {
  const point = generatePoint();
  point.options = getAllOffer(point.type);
  point.info = generateDestination();

  return point;
};

// const generatePointEdit = () => {
//   return {
//     type: 'bus',
//     dateIn: '2019-03-18T14:30',
//     dateOut: '2019-03-19T02:00',
//     destination: 'Chamonix',
//     price: 250,
//     options: [],  // from offer.js
//     info: {},     // from description.js
//     isFavorit: false,
//   };
// };

export {generatePointEdit};
