const Discord = require('discord.js');
const debug = require('debug')('E');
const logger = require('./logger');

const config = require('../config/config.json');
const commandResolver = require('./commands/commandResolver');
const ChangeIntrosBehaviourCommand = require('./commands/changeIntrosBehaviourCommand');

const ayuwoki = require('./crons/ayuwoki');
const schedule = require('node-schedule');

const client = new Discord.Client();

function onReady() {
  debug('Bot has started');
  logger.info('Bot has started');

  const command = new ChangeIntrosBehaviourCommand({ client, activate: false, fromBot: true });
  command.execute();
  
  // Solo para que funcione el ayuwoki
  schedule.scheduleJob('33 6 * * *', ayuwoki(client));
}

function onMessage(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;
  if (message.content.startsWith(`${config.prefix}play`) || message.content.startsWith(`${config.prefix}skip`) || message.content.startsWith(`${config.prefix}clear`)) return; // BORRAR CUANDO SE RESUELVA EL PREFIX

  debug(`Received message from ${message.author.username} -> ${message.content}`);
  logger.info(`Received message from ${message.author.username} -> ${message.content}`);

  const command = commandResolver(message, client);
  command.execute();
}

client.on('ready', onReady);
client.on('message', onMessage);
client.login(config.token);
