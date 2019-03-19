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
    case 'yos':
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
    case 'altera_intro':
    case 'mega_intro':
    case 'vulian_intro':
    case 'pushme':
    case 'patineta':
    case 'bark':
    case 'gijoe':
    case 'thomas':
    case 'haha':
	case 'dinodoggo':
	case 'barkcore':
	case 'wallace':
	case 'dinopain':
	case 'newtoy':
	case 'mrbubbs':
	case 'cigarrillo':
	case 'sombrero':
	case 'bondi':
	case 'karaka':
	case 'karaka2':
	case 'amigo':
	case 'pinpin':
	case 'doping':
	case 'quepasaaca':
	case 'quepuasaaca':
	case 'chavo':
	case 'chavo2':
	case 'chavo3':
	case 'monokuma':
	case 'fuckyouup':
	case 'wrong':
	case 'nagito':
	case 'basta':
	case 'basta2':
	case 'ah':
	case 'buenisimo':
	case 'punch':
	case 'bobby':
	case 'fly':
	case 'celebrity':
	case 'preston':
	case 'holdon':
	case 'hum':
	case 'hum2':
	case 'hum3':
	case 'cubille':
	case 'cubilla':
	case 'skills':
	case 'vampire':
	case 'jurio':
	case 'loquendo':
	case 'thicc':
	case 'superthicc':
	case 'at':
	case 'what':
	case 'superwhat':
	case 'works':
	case 'gustavo':
	case 'why':
	case 'why2':
	case 'reflection':
	case 'spase':
	case 'afilador':
	case 'hdp':
	case 'dedito':
	case 'megadave':
	case 'samid':
	case 'atelier':
	case '311':
      params.voiceChannel = message.member.voiceChannel;
      params.guild = message.guild;
      c = new PlayAudioCommand(params);
      break;
    case 'leavechannel':
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
