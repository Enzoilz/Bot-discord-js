const fs = require('fs');
const path = require('path');

module.exports = (client) => {
  client.commands = new Map();

  const folders = fs.readdirSync('./commands');

  for (const folder of folders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const command = require(`../commands/${folder}/${file}`);
      if (command.data && command.execute) {
        client.commands.set(command.data.name, command);
      }
    }
  }
};
