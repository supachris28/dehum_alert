const slack = require('simple-slack-webhook');
const webhookUrl = process.env.SLACK_HOOK;

slack.init({
  path: webhookUrl,
  username: 'Dehumidifier',
});

const Gpio = require('onoff').Gpio;
const highInput = new Gpio(17, 'in', 'rising');

highInput.watch((err, value) => {
  const attachments = [{
    fallback: 'Dehumidifier needs emptying!',
    title: 'Household alert',
    text: 'Dehumidifier is full, please empty!',
    color: 'bad',
  }];

  console.log('alerting', new Date().toISOString());
  slack.attachments(attachments);
});

process.on('SIGINT', () => {
  highInput.unexport();
});
