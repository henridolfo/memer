const debug = require('debug')('E:LeaveCommand');
const BaseCommand = require('./baseCommand');
const logger = require('../logger');

let guild;

class LeaveCommand extends BaseCommand {
  constructor(params) {
    super(params);
    if (!guild) {
      guild = this.params.client.guilds.first();
    }
  }
  
  execute() {
    super.execute();
	
	if (guild && guild.voiceConnection && guild.voiceConnection.channel) {
	  try {
		const { name } = guild.voiceConnection.channel;
		guild.voiceConnection.channel.leave();
		
		debug(`Left -> ${name}`);
        logger.info(`Left -> ${name}`);
	  } catch (e) {
		debug(e);
		logger.error(e.message);
	  }
	}
  }
}

module.exports = LeaveCommand;
