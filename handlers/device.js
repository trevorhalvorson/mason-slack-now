const formatter = require('../formatter');
const mason = require('../mason');

const DEVICE_HELP = `
*Display Mason device information*

*Arguments* :pencil:

\`name [name]\` – Displays information for device with name [name]

*Examples* :bulb:

– Get details for a device with name 'dev-1' :mag:

> /mason device name dev-1

– Get help informaton for the \`device\` command :question:

> /mason help device

`;

module.exports.action = async ({ action, args }) => {
  const [attr, value] = args;

  if (action === 'help' || !attr || !value) {
    return {
      response_type: 'ephemeral',
      text: DEVICE_HELP,
    };
  }

  let response;
  switch (attr) {
    case 'name': {
      const device = await mason.getDeviceByName(value);
      if (device) {
        response = {
          response_type: 'in_channel',
          text: `*Device*\n${formatter.formatObject(device)}\n`,
        };
      } else {
        response = {
          response_type: 'ephemeral',
          text: 'Unable to get device information',
        };
      }
      break;
    }
    default: {
      response = {
        response_type: 'ephemeral',
        text: DEVICE_HELP,
      };
      break;
    }
  }

  return response;
};
