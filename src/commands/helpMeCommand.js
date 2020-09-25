const debug = require('debug')('E:HelpMeCommand');
const BaseCommand = require('./baseCommand');
const logger = require('../logger');

class HelpMeCommand extends BaseCommand {
  execute() {
    super.execute();

    const audioStrings = this.params.audioNames.map(v => `!${v}\n`).join('');
    const response = `Available Commands:\n\n${audioStrings}`;

    this.params.channel.send(response);
    debug(`Sent -> ${response}`);
    logger.info(`Sent -> ${response}`);
  }
}

module.exports = HelpMeCommand;
