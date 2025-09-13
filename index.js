require('dotenv').config();
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const config = require('./config/config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

// Charger les commandes dynamiques
const loadCommands = require('./utils/loadCommands');
loadCommands(client);

// Charger les événements
fs.readdirSync('./events').forEach(file => {
  const event = require(`./events/${file}`);
  const eventName = file.split('.')[0];
  client.on(eventName, (...args) => event(client, ...args));
});

client.login(config.token);
