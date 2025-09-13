const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Avertit un utilisateur')
    .addUserOption(option =>
      option.setName('utilisateur')
        .setDescription('Utilisateur à avertir')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('raison')
        .setDescription('Raison de l’avertissement')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('utilisateur');
    const reason = interaction.options.getString('raison');

    const logChannel = interaction.guild.channels.cache.find(c => (c.name === 'logs' || c.name === 'mod-logs') && c.isTextBased());
    if (logChannel) logChannel.send(`⚠️ **${user.tag}** a reçu un avertissement par ${interaction.user.tag}\n✍️ Raison : ${reason}`);

    await interaction.reply({ content: `✅ ${user.tag} a été averti.` });
  },
};
