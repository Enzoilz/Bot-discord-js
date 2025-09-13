const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags, time } = require('discord.js');
const ms = require('ms'); // npm install ms

module.exports = {
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Mute temporairement un utilisateur')
    .addUserOption(option =>
      option.setName('utilisateur')
        .setDescription('Utilisateur à timeout')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('durée')
        .setDescription('Ex : 10s, 5m, 1h, 1d')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('raison')
        .setDescription('Raison du timeout')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('utilisateur');
    const duration = ms(interaction.options.getString('durée'));
    const reason = interaction.options.getString('raison') || 'Aucune raison';
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);

    if (!member || !member.moderatable) {
      return interaction.reply({ content: '❌ Je ne peux pas timeout cet utilisateur.', flags: MessageFlags.Ephemeral });
    }

    if (!duration || duration < 1000 || duration > 28 * 24 * 60 * 60 * 1000) {
      return interaction.reply({ content: '❌ Durée invalide. Max 28 jours.', flags: MessageFlags.Ephemeral });
    }

    await member.timeout(duration, reason);

    const logChannel = interaction.guild.channels.cache.find(c => (c.name === 'logs' || c.name === 'mod-logs') && c.isTextBased());
    if (logChannel) logChannel.send(`🔇 **${user.tag}** a été timeout par ${interaction.user.tag} pendant **${interaction.options.getString('durée')}**\n✍️ Raison : ${reason}`);

    await interaction.reply({ content: `✅ ${user.tag} est mute pendant ${interaction.options.getString('durée')}` });
  },
};
