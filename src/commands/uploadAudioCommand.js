const fs = require('fs');
const request = require('request');
const path = require('path');
const debug = require('debug')('E:UploadAudioCommand');
const BaseCommand = require('./baseCommand');
const logger = require('../logger');

class UploadAudioCommand extends BaseCommand {
  async execute(cb) {
    super.execute();

    const fileName = this.params.fileName.split('.')[0];
    const fileExt = this.params.fileName.split('.')[1];

    if (fileExt === 'ogg' && !this.params.audioNames.some(v => v === fileName)) {
      this.download(path.join(__dirname, '..', '..', 'audio', `${fileName.toUpperCase()}.${fileExt}`), (err) => {
        if (err) {
          console.log(err);
          this.sendMsg('Error downloading the audio');
        } else {
          this.sendMsg('Audio added successfully');
          cb(fileName.toLowerCase());
        }
      });
    } else {
      this.sendMsg('Wrong extension or audio already exists');
    }
  }

  async sendMsg(value) {
    const msg = await this.params.channel.send(value);
    debug(`Sent -> ${value}`);
    logger.info(`Sent -> ${value}`);

    setTimeout(() => {
      msg.delete().catch(() => {});
    }, 5000);
  }

  async download(dest, cb) {
    request
      .get(this.params.fileURL)
      .on('response', (response) => {
        cb(undefined, response);
      })
      .on('error', (err) => {
        cb(err);
      })
      .pipe(fs.createWriteStream(dest));
  }
}

module.exports = UploadAudioCommand;
