

const generatePointEdit = () => {
  return {
    type: 'bus',
    dateIn: '2019-03-18T14:30',
    dateOut: '2019-03-19T02:00',
    destination: 'Chamonix',
    price: 250,
    options: [],  // from offer.js
    info: {},     // from description.js
    isFavorit: false,
  };
};

export {generatePointEdit};
