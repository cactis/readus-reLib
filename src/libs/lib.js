export const randStr = (pre) => {
  let _pre = pre ? `${pre}-` : '';
  return _pre + (Math.random() + 1).toString(36).substring(4);
};

export const newArray = (number) => {
  return Array.from(Array(number).keys());
};

export const log = (msg, pre = '') => {
  console.log(msg, pre);
};

export const stop = (e) => {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
};
