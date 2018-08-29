const debug = require('debug')('E:CommandResolver');
const config = require('../../config/config.json');
const logger = require('../logger');

// Comands
const LeaveCommand = require('./leaveCommand');
const UnknownCommand = require('./unknownCommand');
const PlayAudioCommand = require('./playAudioCommand');
const HelpMeCommand = require('./helpMeCommand');
const SendImageCommand = require('./sendImageCommand');
const ChangeIntrosBehaviourCommand = require('./changeIntrosBehaviourCommand');

function resolve(message, client) {
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
    args
  };

  switch (command) {
    case 'yes':
    case 'shutup':
    case 'friend':
    case 'hola':
    case 'withme':
    case 'yugiboy':
    case 'train':
    case 'fuckedup':
    case 'fixyou':
    case 'goat':
    case 'goat2':
    case 'kaiba':
    case 'night':
    case 'gaius_intro':
    case 'cubilla_intro':
    case 'niko_intro':
    case 'pushme':
    case 'patineta':
    case 'bark':
      params.voiceChannel = message.member.voiceChannel;
      params.guild = message.guild;
      c = new PlayAudioCommand(params);
      break;
    case 'leavechannel':
      params.voiceChannel = message.member.voiceChannel;
      c = new LeaveCommand(params);
      break;
    case 'helpme':
      c = new HelpMeCommand(params);
      break;
    case 'e':
    case 'anaconda2':
      c = new SendImageCommand(params);
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

  return c;
}

module.exports = resolve;
