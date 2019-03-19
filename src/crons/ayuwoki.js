const logger = require('../logger');

function ayuwoki(client) {
  const guild = client.guilds.get('200051285171503104');
  const generalChannel = client.channels.get('233085898256809985');
  
  function processCron() {
    try {
      currentVoiceChannels = {};
	  
      guild.members.filter(m => m.voiceChannel).forEach((guildMember) => {
        sendPM(guildMember);
        currentVoiceChannels[guildMember.voiceChannelID] = guildMember.voiceChannel;
      });
      
      sendFileToChannel(generalChannel);
	  
      playAudioInChannels(Object.keys(currentVoiceChannels).map(key => currentVoiceChannels[key]));
    } catch (error) {
      debug(error);
      logger.error(error);
      finishPlay(dispatcher, audioFile);
    }
  }

  async function sendPM(guildMember) {
    const channel = await guildMember.createDM();
    const msg = await channel.send('', {
      file: `./img/AYUWOKI2.jpg`
    });
    
    setTimeout(() => {
      msg.delete().catch(() => {});
    }, 300000);
  }
  
  async function sendFileToChannel(channel) {
    const msg = await channel.send('', {
      file: `./gif/AYUWOKI.gif`
    });
    
    setTimeout(() => {
      msg.delete().catch(() => {});
    }, 300000);
  }
  
  async function playAudioInChannels(vcs) {
    let dispatcher;
    const audioFile = 'AYUWOKI.ogg';
	const vc = vcs[0];
  
    const finishPlay = (dispatcher, audioFile) => {
      logger.info(`Finishing audio -> ${audioFile}`);
      dispatcher.destroy();
      vc.leave();
    }
  
    connection = await vc.join();
    dispatcher = connection.playFile(`./audio/${audioFile}`);
    logger.info(`Playing audio -> ${audioFile}`);
  
    dispatcher.on('start', () => {
      connection.player.streamingData.pausedTime = 0;
    });
  
    dispatcher.on('end', () => {
      finishPlay(dispatcher, audioFile);
    });
  
    dispatcher.on('error', (e) => {
      debug(e);
      logger.error(e);
      finishPlay(dispatcher, audioFile);
    });
  }
  
  return processCron;
}

module.exports = ayuwoki;