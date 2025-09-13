const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bannir un utilisateur du serveur')
    .addUserOption(option =>
      option.setName('utilisateur')
        .setDescription('L’utilisateur à bannir')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('raison')
        .setDescription('Raison du bannissement')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('utilisateur');
    const reason = interaction.options.getString('raison') || 'Aucune raison';
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);

    if (!member) {
      return interaction.reply({
        content: '❌ Utilisateur introuvable.',
        flags: MessageFlags.Ephemeral
      });
    }

    if (!member.bannable) {
      return interaction.reply({
        content: '❌ Je ne peux pas bannir cet utilisateur.',
        flags: MessageFlags.Ephemeral
      });
    }

    await member.ban({ reason });

    const logChannel = interaction.guild.channels.cache.find(c =>
      (c.name === 'logs' || c.name === 'ban-logs') && c.isTextBased()
    );

    if (logChannel) {
      logChannel.send(`📛 **${user.tag}** a été banni par ${interaction.user.tag}.\n✍️ Raison : ${reason}`);
    }

    await interaction.reply({ content: `✅ ${user.tag} a été banni.` });
  },
};
