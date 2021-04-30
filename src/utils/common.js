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

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export {
  getRandomInteger,
  upFirst,
  sortObjByField,
  updateItem
};
