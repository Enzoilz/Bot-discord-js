const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('muteconfig')
    .setDescription('Configure ou crée le rôle de mute')
    .addRoleOption(option =>
      option.setName('rôle')
        .setDescription('Rôle à utiliser comme mute')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true }); // ✅ Pour éviter l’expiration

    const config = JSON.parse(fs.readFileSync('./data/mute-config.json', 'utf8'));
    const customRole = interaction.options.getRole('rôle');

    if (customRole) {
      config[interaction.guild.id] = customRole.id;
      fs.writeFileSync('./data/mute-config.json', JSON.stringify(config, null, 2));
      return interaction.editReply(`✅ Le rôle de mute est maintenant : ${customRole}`);
    }

    const newRole = await interaction.guild.roles.create({
      name: 'Muted',
      color: 0x2f3136,
      permissions: [],
      reason: 'Configuration du mute automatique'
    });

    // Bloque les permissions dans tous les salons
    for (const [id, channel] of interaction.guild.channels.cache) {
      await channel.permissionOverwrites.create(newRole, {
        SendMessages: false,
        Speak: false,
        AddReactions: false
      }).catch(() => {});
    }

    config[interaction.guild.id] = newRole.id;
    fs.writeFileSync('./data/mute-config.json', JSON.stringify(config, null, 2));

    await interaction.editReply(`✅ Rôle \`${newRole.name}\` créé et configuré avec succès.`);
  },
};
