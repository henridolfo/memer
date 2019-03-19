const debug = require('debug')('E:ChangeIntrosBehaviourCommand');

const BaseCommand = require('./baseCommand');
const PlayAudioCommand = require('./playAudioCommand');

const logger = require('../logger');

let guild;
let active = false;

class ChangeIntrosBehaviour extends BaseCommand {
  constructor(params) {
    super(params);
    if (!guild) {
      guild = this.params.client.guilds.first();
    }
  }

  async execute() {
    super.execute();

    let response;
    if (!active && this.params.activate) {
      active = true;
      await this.params.client.on('voiceStateUpdate', this.onVoiceStateUpdate);
      response = 'Intros have been resumed. YYYEEESSSS!!';
    } else if (active && !this.params.activate) {
      active = false;
      await this.params.client.removeAllListeners('voiceStateUpdate');
      response = 'Intros have been stopped. Are you happy now?';
    } else if (active && this.params.activate) {
      response = 'Intros are already active';
    } else {
      response = 'Intros are already stopped';
    }

    if (!this.params.fromBot) {
      const msg = await this.params.channel.send(response);
      debug(`Sent -> ${response}`);
      logger.info(`Sent -> ${response}`);

      setTimeout(() => {
        msg.delete().catch(() => {});
      }, 5000);
    }
  }

  onVoiceStateUpdate(oldMember, newMember) {
    if (newMember.user.bot) return;

    const cVC = guild.voiceConnection;

    if (cVC && !cVC.speaking) {
      const newUserChannel = newMember.voiceChannel;
      const oldUserChannel = oldMember.voiceChannel;

      if (newUserChannel && newUserChannel !== oldUserChannel && cVC.channel === newUserChannel) {
        let commandAudio;

        switch (newMember.id) {
          case '233080984797446144': // GAIUS
            commandAudio = 'gaius_intro';
            break;
          case '200061081836584969': // CUBILLA
            commandAudio = 'cubilla_intro';
            break;
          case '183765735573684224': // NIKO
            commandAudio = 'niko_intro';
            break;
          case '197151757611171840': // ALTERA
            commandAudio = 'altera_intro';
            break;
          case '132252044693078016': // MEGADAVE
            commandAudio = 'mega_intro';
            break;
          case '233346080354467841': // VULIAN
            commandAudio = 'vulian_intro';
            break;
          default:
            commandAudio = 'hola';
            break;
        }

        const params = {
          guild,
          voiceChannel: cVC.channel,
          command: commandAudio
        };

        const command = new PlayAudioCommand(params);
        command.execute();
      }
    }
  }
}

module.exports = ChangeIntrosBehaviour;
