const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const upFirst = (str) => {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
};

const sortObjByField = (field) => {
  return (a, b) => a[field] > b[field] ? 1 : -1;
};

export {
  getRandomInteger,
  upFirst,
  sortObjByField
};
