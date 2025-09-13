const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mute un utilisateur avec un rôle configuré')
    .addUserOption(option =>
      option.setName('utilisateur')
        .setDescription('Utilisateur à mute')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('raison')
        .setDescription('Raison du mute')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('utilisateur');
    const reason = interaction.options.getString('raison') || 'Aucune raison';
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);

    const config = JSON.parse(fs.readFileSync('./data/mute-config.json', 'utf8'));
    const roleId = config[interaction.guild.id];

    if (!roleId) {
      return interaction.reply({
        content: '❌ Aucun rôle de mute n’est configuré. Utilise `/muteconfig` pour le créer ou le définir.',
        flags: MessageFlags.Ephemeral
      });
    }

    const muteRole = interaction.guild.roles.cache.get(roleId);
    if (!member || !muteRole) {
      return interaction.reply({
        content: '❌ Utilisateur ou rôle de mute introuvable.',
        flags: MessageFlags.Ephemeral
      });
    }

    await member.roles.add(muteRole, reason);

    const logChannel = interaction.guild.channels.cache.find(c => (c.name === 'logs' || c.name === 'mod-logs') && c.isTextBased());
    if (logChannel) logChannel.send(`🔕 **${user.tag}** a été mute par ${interaction.user.tag}\n✍️ Raison : ${reason}`);

    await interaction.reply({ content: `✅ ${user.tag} a été mute.` });
  },
};
