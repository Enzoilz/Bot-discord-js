const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Débannir un utilisateur')
    .addStringOption(option =>
      option.setName('userid')
        .setDescription('L’ID de l’utilisateur à débannir')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('raison')
        .setDescription('Raison du débannissement')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const userId = interaction.options.getString('userid');
    const reason = interaction.options.getString('raison') || 'Aucune raison';

    try {
      // 👇 Vérifie si l'utilisateur est vraiment banni
      const banList = await interaction.guild.bans.fetch();
      const isBanned = banList.has(userId);

      if (!isBanned) {
        return interaction.reply({
          content: `❌ Cet utilisateur n'est pas banni.`,
          flags: MessageFlags.Ephemeral
        });
      }

      // 👇 Débannir
      await interaction.guild.members.unban(userId, reason);

      // 👇 Log s’il y a un salon texte
      const logChannel = interaction.guild.channels.cache.find(c =>
        (c.name === 'logs' || c.name === 'ban-logs') && c.isTextBased()
      );

      if (logChannel) {
        logChannel.send(`♻️ **${userId}** a été débanni par ${interaction.user.tag}.\n✍️ Raison : ${reason}`);
      }

      await interaction.reply({ content: `✅ Utilisateur **${userId}** débanni.` });

    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: '❌ Une erreur est survenue pendant le débannissement.',
        flags: MessageFlags.Ephemeral
      });
    }
  },
};
