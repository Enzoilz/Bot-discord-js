const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Supprime un nombre de messages')
    .addIntegerOption(option =>
      option.setName('nombre')
        .setDescription('Nombre de messages à supprimer (1-100)')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const count = interaction.options.getInteger('nombre');

    if (count < 1 || count > 100) {
      return interaction.reply({ content: '❌ Tu dois supprimer entre 1 et 100 messages.', flags: MessageFlags.Ephemeral });
    }

    await interaction.channel.bulkDelete(count, true);
    await interaction.reply({ content: `✅ ${count} messages supprimés.`, ephemeral: true });
  },
};
