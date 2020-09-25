const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const debug = require('debug')('E');
const logger = require('./logger');
const config = require('../config/config.json');
const credentials = require('../keys/discord-credentials.json');
const ChangeIntrosBehaviourCommand = require('./commands/changeIntrosBehaviourCommand');
const commandResolver = require('./commands/commandResolver');

let audioNames;

// Read all audio files
fs.readdir(path.join(__dirname, '..', 'audio'), (err, filenames) => {
  if (err) {
    logger.info(err);
    return;
  }

  audioNames = filenames.map(v => v.toLowerCase().substring(0, v.indexOf('.')));
});

const client = new Discord.Client();

function onReady() {
  debug('Memer Bot has started');
  logger.info('Memer Bot has started');

  const command = new ChangeIntrosBehaviourCommand({ client, activate: false, fromBot: true });
  command.execute();
}

function onMessage(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;
  if (message.content.startsWith(`${config.prefix}play`) || message.content.startsWith(`${config.prefix}skip`) || message.content.startsWith(`${config.prefix}clear`)) return; // BORRAR CUANDO SE RESUELVA EL PREFIX

  debug(`Received message from ${message.author.username} -> ${message.content}`);
  logger.info(`Received message from ${message.author.username} -> ${message.content}`);

  const command = commandResolver(message, client, audioNames);
  command.execute((res) => {
    if (res) {
      audioNames.push(res);
    }
  });
}

client.on('ready', onReady);
client.on('message', onMessage);
client.login(credentials.token);
