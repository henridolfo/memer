const debug = require('debug')('E:UnknownCommand');
const BaseCommand = require('./baseCommand');
const logger = require('../logger');

class UnknownCommand extends BaseCommand {
  async execute() {
    super.execute();

    const response = `Unknown Command: ${this.params.command}`;
    const msg = await this.params.channel.send(response);
    debug(`Sent -> ${response}`);
    logger.info(`Sent -> ${response}`);

    setTimeout(() => {
      msg.delete().catch(() => {});
    }, 5000);
  }
}

module.exports = UnknownCommand;
