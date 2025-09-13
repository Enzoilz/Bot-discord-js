const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Créer ou modifier un embed personnalisé')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('embed_create')
        .setLabel('🛠️ Créer un embed')
        .setStyle(ButtonStyle.Primary),

      new ButtonBuilder()
        .setCustomId('embed_edit')
        .setLabel('✏️ Modifier un embed')
        .setStyle(ButtonStyle.Secondary)
    );

    await interaction.reply({
      content: 'Que souhaites-tu faire ?',
      components: [row],
      ephemeral: true
    });
  },
};
