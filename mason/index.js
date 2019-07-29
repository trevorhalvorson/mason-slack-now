const got = require('got');
const { URLSearchParams } = require('url');

const getDevice = async (attr, value) => {
  const response = await got.get('/device', {
    baseUrl: process.env.MASON_API_URL,
    headers: {
      authorization: `basic ${process.env.MASON_API_KEY}`,
    },
    query: new URLSearchParams([[attr, value]]),
  });
  const { data } = JSON.parse(response.body);
  return data !== null ? data[0] : null;
};

module.exports.getDeviceByName = async (name) => {
  try {
    const device = await getDevice('name', name);
    return device;
  } catch (error) {
    return null;
  }
};
