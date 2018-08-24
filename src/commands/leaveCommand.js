const debug = require('debug')('E:LeaveCommand');
const BaseCommand = require('./baseCommand');
const logger = require('../logger');

class LeaveCommand extends BaseCommand {
  execute() {
    super.execute();

    this.params.voiceChannel.leave();
    debug(`Left -> ${this.params.voiceChannel.name}`);
    logger.info(`Left -> ${this.params.voiceChannel.name}`);
  }
}

module.exports = LeaveCommand;
