const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Expulse un utilisateur du serveur')
    .addUserOption(option =>
      option.setName('utilisateur')
        .setDescription('Utilisateur à expulser')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('raison')
        .setDescription('Raison du kick')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('utilisateur');
    const reason = interaction.options.getString('raison') || 'Aucune raison';
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);

    if (!member || !member.kickable) {
      return interaction.reply({ content: '❌ Impossible de kick cet utilisateur.', flags: MessageFlags.Ephemeral });
    }

    await member.kick(reason);

    const logChannel = interaction.guild.channels.cache.find(c => (c.name === 'logs' || c.name === 'mod-logs') && c.isTextBased());
    if (logChannel) logChannel.send(`👢 **${user.tag}** a été kick par ${interaction.user.tag}\n✍️ Raison : ${reason}`);

    await interaction.reply({ content: `✅ ${user.tag} a été expulsé.` });
  },
};
