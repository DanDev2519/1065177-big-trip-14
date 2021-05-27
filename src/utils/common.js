const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const upFirst = (str) => {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
};

const sortObjByFieldUp = (field) => {
  return (a, b) => a[field] > b[field] ? 1 : -1;
};

const sortObjByFieldDown = (field) => {
  return (a, b) => a[field] < b[field] ? 1 : -1;
};

const makeItemsUniq = (items) => [...new Set(items)];

const isOnline = () => {
  return window.navigator.onLine;
};

export {
  getRandomInteger,
  upFirst,
  sortObjByFieldUp,
  sortObjByFieldDown,
  makeItemsUniq,
  isOnline
};
