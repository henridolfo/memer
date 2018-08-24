const debug = require('debug')('E:SendImageCommand');
const BaseCommand = require('./baseCommand');
const logger = require('../logger');

class SendImageCommand extends BaseCommand {
  execute() {
    super.execute();

    this.params.channel.send(this.params.command, {
      file: `./img/${this.params.command.toUpperCase()}.jpg`
    });

    debug(`Sent -> ${this.params.command} meme`);
    logger.info(`Sent -> ${this.params.command} meme`);
  }
}

module.exports = SendImageCommand;
