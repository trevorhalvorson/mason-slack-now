const { device } = require('./handlers');
const signature = require('./verifySignature');

const MASON_HELP = `
:rocket: *Welcome to the Mason Platform Slack Bot* :rocket:

*Commands* :pencil:

\`device\` – Displays information related to devices
\`help [cmd]\` – Displays help information for [cmd]

*Examples* :bulb:

– Get details for a device with name 'dev-1' :mag:

> /mason device name dev-1

– Get help informaton for the \`device\` command :question:

> /mason help device

`;

module.exports = async (req, res) => {
  const isVerified = await signature.isVerified(req);
  if (isVerified) {
    const { text } = req.body;
    const command = text != null ? text.split(' ') : [];
    const action = command[0];
    const args = command.slice(1);
    let response;

    switch (action === 'help' ? args[0] : action) {
      case 'device': {
        response = await device.action({ action, args });
        break;
      }
      default: {
        response = {
          response_type: 'ephemeral',
          text: MASON_HELP,
        };
        break;
      }
    }

    res.send(response);
  } else {
    res.status(404).end();
  }
};
