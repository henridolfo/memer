const debug = require('debug')('E:CommandResolver');
const config = require('../../config/config.json');
const logger = require('../logger');

// Comands
const LeaveCommand = require('./leaveCommand');
const UnknownCommand = require('./unknownCommand');
const PlayAudioCommand = require('./playAudioCommand');
const HelpMeCommand = require('./helpMeCommand');
const SendImageCommand = require('./sendImageCommand');
const UploadAudioCommand = require('./uploadAudioCommand');
const ChangeIntrosBehaviourCommand = require('./changeIntrosBehaviourCommand');

function resolve(message, client, audioNames) {
  message.delete().catch(() => {});
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  debug(`Resolved command type -> ${command}`);
  logger.info(`Resolved command type -> ${command}`);

  let c;
  const params = {
    client,
    channel: message.channel,
    command,
    args,
  };

  if (audioNames.some(v => v === command)) {
    params.voiceChannel = message.member.voiceChannel;
    params.guild = message.guild;
    c = new PlayAudioCommand(params);
  } else {
    switch (command) {
      case 'random':
        params.voiceChannel = message.member.voiceChannel;
        params.guild = message.guild;
        params.command = audioNames[Math.floor(Math.random() * audioNames.length)];
        c = new PlayAudioCommand(params);
        break;
      case 'leavechannel':
        c = new LeaveCommand(params);
        break;
      case 'helpme':
        params.audioNames = audioNames;
        c = new HelpMeCommand(params);
        break;
      case 'e':
      case 'anaconda2':
        c = new SendImageCommand(params);
        break;
      case 'upload':
        params.audioNames = audioNames;
        params.fileURL = message.attachments.first().url;
        params.fileName = message.attachments.first().filename;
        c = new UploadAudioCommand(params);
        break;
      case 'stopintros':
        params.activate = false;
        params.fromBot = false;
        c = new ChangeIntrosBehaviourCommand(params);
        break;
      case 'resumeintros':
        params.activate = true;
        params.fromBot = false;
        c = new ChangeIntrosBehaviourCommand(params);
        break;
      default:
        c = new UnknownCommand(params);
        break;
    }
  }

  return c;
}

module.exports = resolve;
