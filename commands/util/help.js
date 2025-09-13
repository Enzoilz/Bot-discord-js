const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Affiche toutes les commandes disponibles'),

  async execute(interaction) {
    const categories = fs.readdirSync('./commands');
    const embed = new EmbedBuilder()
      .setTitle('📖 Commandes disponibles')
      .setDescription('Voici la liste des commandes de ton bot :')
      .setColor(0x5865F2) // Couleur Discord
      .setFooter({ text: 'Bot en JS par ton dev préféré = Enzo.ilz ; )' });

    for (const category of categories) {
      const files = fs.readdirSync(`./commands/${category}`).filter(file => file.endsWith('.js'));
      let commandList = '';

      for (const file of files) {
        const command = require(`../${category}/${file}`);
        if (command.data && command.data.name && command.data.description) {
          commandList += `</${command.data.name}:0> — ${command.data.description}\n`;
        }
      }

      if (commandList !== '') {
        embed.addFields({ name: `📁 ${category}`, value: commandList, inline: false });
      }
    }

    await interaction.reply({ embeds: [embed] });
  },
};
