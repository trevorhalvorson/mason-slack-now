const formatObject = (obj) => {
  let text = '';
  Object.keys(obj).forEach((k) => {
    if (typeof obj[k] === 'object' || Array.isArray(obj[k])) {
      text += `*${k}*: ${JSON.stringify(obj[k], null, 2)}\n`;
    } else {
      text += `*${k}*: ${obj[k]}\n`;
    }
  });
  return text;
};

module.exports = {
  formatObject,
};
