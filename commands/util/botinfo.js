const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const os = require('os');
const process = require('node:process');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Affiche les informations du bot'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('🤖 Infos du bot')
      .setColor(0x9b59b6)
      .addFields(
        { name: '🕒 Uptime', value: `<t:${Math.floor(Date.now() / 1000 - process.uptime())}:R>`, inline: true },
        { name: '🧠 Mémoire utilisée', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
        { name: '⚙️ Plateforme', value: `${os.platform()} (${os.arch()})`, inline: true },
        { name: '📡 Ping', value: `${interaction.client.ws.ping}ms`, inline: true },
        { name: '👥 Serveurs', value: `${interaction.client.guilds.cache.size}`, inline: true },
        { name: '👤 Développeur', value: 'Enzo.ilz', inline: true }
      )
      .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};
