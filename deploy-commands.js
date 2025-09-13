const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config/config');
const fs = require('fs');

const commands = [];

const folders = fs.readdirSync('./commands');

for (const folder of folders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    if (command.data) {
      commands.push(command.data.toJSON());
    }
  }
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('🔁 Déploiement des slash commands...');

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log('✅ Slash commands déployées avec succès !');
  } catch (error) {
    console.error(error);
  }
})();
