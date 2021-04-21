import {getRandomInteger} from '../utils/common';
import {CITIES_VISITED} from '../const';

const generateDescription = () => {
  const sentenceArray = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];
  const sentences = [];
  let count = getRandomInteger(1, 5);
  while (count) {
    sentences.push(sentenceArray[getRandomInteger(0, sentenceArray.length - 1)]);
    count--;
  }
  const description = Array.from(new Set(sentences)).join(' ');
  return description;
};

const generateImages = () => {
  const imgArr = [];
  let count = getRandomInteger(0, 5);
  while (count) {
    const number = getRandomInteger(0, 100);
    imgArr.push({
      src: `http://picsum.photos/248/152?r=${number}.jpg`,
      alt: `Event photo ${number}`,
    });
    count--;
  }

  return imgArr;
};

const generateDestination = () => {
  const result = [];
  for (const city of CITIES_VISITED) {
    result.push({
      name: city,
      description: generateDescription(),
      img: generateImages(),
    });
  }
  return result;
};

export {generateDestination};

// const generateDestination = () => {
//   return {
//     name: 'Chamonix',
//     description: 'Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy.At the base of Mont Blanc, the highest summit in the Alps, it\'s renowned for its skiing.',
//     img: [
//       {src: 'img/photos/1.jpg', alt: 'Event photo 1'},
//       {src: 'img/photos/2.jpg', alt: 'Event photo 2'},
//     ],
//   };
// };

// [
//   {
//     name: 'Chamonix',
//     description: 'Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy.At the base of Mont Blanc, the highest summit in the Alps, it\'s renowned for its skiing.',
//     img: [
//       {src: 'img/photos/1.jpg', alt: 'Event photo 1'},
//       {src: 'img/photos/2.jpg', alt: 'Event photo 2'},
//     ],
//   },
//   // generate others
//   {
//     name: 'Geneva',
//     description: '>Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva).Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
//     img: [
//       {src: 'img/photos/1.jpg', alt: 'Event photo 1'},
//       {src: 'img/photos/2.jpg', alt: 'Event photo 2'},
//     ],
//   },
// ]
