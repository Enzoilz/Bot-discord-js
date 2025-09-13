const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    MessageFlags
  } = require('discord.js');
  
  module.exports = async (client, interaction) => {
    // Slash command
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;
      try {
        await command.execute(interaction);
      } catch (err) {
        console.error(err);
        await interaction.reply({
          content: '❌ Erreur pendant l’exécution de la commande.',
          flags: MessageFlags.Ephemeral
        });
      }
    }
  
    // Gestion des boutons
    if (interaction.isButton()) {
      console.log(`👉 Bouton cliqué : ${interaction.customId}`);
  
      // Créer un embed
      if (interaction.customId === 'embed_create') {
        try {
          const modal = new ModalBuilder()
            .setCustomId('embed_modal')
            .setTitle('Créer un embed');
  
          const titleInput = new TextInputBuilder()
            .setCustomId('embed_title')
            .setLabel('Titre')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);
  
          const descInput = new TextInputBuilder()
            .setCustomId('embed_description')
            .setLabel('Description')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);
  
          const row1 = new ActionRowBuilder().addComponents(titleInput);
          const row2 = new ActionRowBuilder().addComponents(descInput);
  
          modal.addComponents(row1, row2);
          await interaction.showModal(modal);
        } catch (err) {
          console.error('❌ Erreur dans embed_create:', err);
          await interaction.reply({
            content: '❌ Une erreur est survenue lors de l’ouverture du formulaire.',
            flags: MessageFlags.Ephemeral
          });
        }
      }
  
      // Modifier un embed (pas encore implémenté)
      if (interaction.customId === 'embed_edit') {
        return interaction.reply({
          content: '⚠️ Fonction "modifier un embed existant" en cours de développement.',
          flags: MessageFlags.Ephemeral
        });
      }
  
      // Envoyer l'embed
      if (interaction.customId === 'embed_send') {
        const embed = client._customEmbeds?.[interaction.user.id];
        if (!embed) {
          return interaction.reply({
            content: '❌ Aucun embed trouvé à envoyer.',
            flags: MessageFlags.Ephemeral
          });
        }
  
        await interaction.channel.send({ embeds: [embed] });
        await interaction.reply({
          content: '✅ Embed envoyé dans ce salon !',
          flags: MessageFlags.Ephemeral
        });
      }
    }
  
    // Gestion du modal embed
    if (interaction.isModalSubmit() && interaction.customId === 'embed_modal') {
      try {
        const title = interaction.fields.getTextInputValue('embed_title');
        const description = interaction.fields.getTextInputValue('embed_description');
  
        const embed = new EmbedBuilder()
          .setTitle(title)
          .setDescription(description)
          .setColor(0x5865F2)
          .setFooter({ text: `Créé par ${interaction.user.tag}` })
          .setTimestamp();
  
        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId('embed_send')
            .setLabel('📤 Envoyer dans ce salon')
            .setStyle(ButtonStyle.Success)
        );
  
        client._customEmbeds = client._customEmbeds || {};
        client._customEmbeds[interaction.user.id] = embed;
  
        await interaction.reply({
          content: 'Voici un aperçu de ton embed :',
          embeds: [embed],
          components: [row],
          flags: MessageFlags.Ephemeral
        });
      } catch (err) {
        console.error('❌ Erreur lors du traitement du modal embed:', err);
        await interaction.reply({
          content: '❌ Une erreur est survenue lors de la création de l’embed.',
          flags: MessageFlags.Ephemeral
        });
      }
    }
  };
  