const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Répète ton message')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('Ce que je dois dire')
        .setRequired(true)),

  async execute(interaction) {
    const msg = interaction.options.getString('message');
    await interaction.reply(msg);
  },
};
