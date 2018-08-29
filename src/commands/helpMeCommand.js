const debug = require('debug')('E:HelpMeCommand');
const BaseCommand = require('./baseCommand');
const logger = require('../logger');

class HelpMeCommand extends BaseCommand {
  execute() {
    super.execute();

    const response = 'Available Commands:\n\n'
      + '!helpme -> Show all available commands\n'
      + '!leavechannel -> Leave current channel\n'
      + '!resumeIntros -> Resume intro audios\n'
      + '!stopIntros -> Stop intro audios\n'
      + '!e -> Send E meme\n'
      + '!anaconda2 -> Send anaconda2 meme\n'
      + '!yes -> Play yes audio\n'
      + '!shutup -> Play shutup audio\n'
      + '!hola -> Play hola audio\n'
      + '!withme -> Play with me audio\n'
      + '!friend -> Play friend audio\n'
      + '!yugiboy -> Play yugiboy audio\n'
      + '!fuckedup -> Play fuckedup audio\n'
      + '!fixyou -> Play fixyou audio\n'
      + '!goat -> Play goat audio\n'
      + '!goat2 -> Play goat2 audio\n'
      + '!kaiba -> Play kaiba audio\n'
      + '!night -> Play into the night audio\n'
      + '!pushme -> Play push me audio\n'
      + '!patineta -> Play patineta audio\n'
      + '!bark -> Play bark audio\n'
      + '!train -> Play train audio';

    this.params.channel.send(response);
    debug(`Sent -> ${response}`);
    logger.info(`Sent -> ${response}`);
  }
}

module.exports = HelpMeCommand;
