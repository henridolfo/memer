const debug = require('debug')('E:PlayAudioCommand');
const BaseCommand = require('./baseCommand');
const logger = require('../logger');

let ready = true;
let connection;
let timeout;

class PlayAudioCommand extends BaseCommand {
  finishPlay(dispatcher, audioFile) {
    debug(`Finishing audio -> ${audioFile}`);
    logger.info(`Finishing audio -> ${audioFile}`);
    if (dispatcher) dispatcher.destroy();
    ready = true;
  }

  async execute() {
    super.execute();

    const vc = this.params.voiceChannel;
    if (this.params.guild && ready) {
      if (vc) {
        ready = false;
        let dispatcher;
        const audioFile = `${this.params.command.toUpperCase()}.ogg`;

        clearTimeout(timeout);

        try {
          if (!connection || connection.voiceChannel !== vc) connection = await vc.join();

          dispatcher = connection.playFile(`./audio/${audioFile}`);
          debug(`Playing audio -> ${audioFile}`);
          logger.info(`Playing audio -> ${audioFile}`);

          dispatcher.on('start', () => {
            connection.player.streamingData.pausedTime = 0;
          });

          dispatcher.on('end', () => {
            this.finishPlay(dispatcher, audioFile);
          });

          dispatcher.on('error', (e) => {
            debug(e);
            logger.error(e);
            this.finishPlay(dispatcher, audioFile);
          });

          timeout = setTimeout(() => {
            debug('Leaving voice channel for being idle');
            logger.info('Leaving voice channel for being idle');
            vc.leave();
          }, 3600000);
        } catch (error) {
          debug(error);
          logger.error(error);
          if (!ready) this.finishPlay(dispatcher, audioFile);
        }
      } else {
        const response = 'You must be in a voice channel, bitch!';
        const msg = await this.params.channel.send(response);
        debug(`Sent -> ${response}`);
        logger.info(`Sent -> ${response}`);

        setTimeout(() => {
          msg.delete().catch(() => {});
        }, 5000);
      }
    }
  }
}

module.exports = PlayAudioCommand;
