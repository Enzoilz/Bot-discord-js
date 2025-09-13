# 🤖 Bot Discord JS — Modération & Utilitaires

Un bot Discord simple et efficace, développé en **JavaScript** avec [discord.js](https://discord.js.org).  
Il fournit un ensemble de commandes de **modération** et **d’outils pratiques**, facile à installer et à personnaliser.



## 🚀 Installation & Lancement

1. Clone le repo :
   ```bash
   git clone https://github.com/Enzo.ilz/Bot-discord-js.git
   cd Bot-discord-js
````

2. Installe les dépendances :

   ```bash
   npm install
   ```

3. Configure le bot :

   * Crée un fichier `.env` à la racine
   * Ajoute ta clé de bot :

     ```env
     TOKEN=ton_token_discord
     ```

4. Lance le bot :

   ```bash
   npm start
   ```

🛠️ Commandes Disponibles

🔹 Test

* `say` → Le bot répète ton message

🔹 Modération

* `ban [ID]` → Bannir un utilisateur
* `clear [nombre]` → Supprimer un nombre de messages
* `kick [ID]` → Expulser un utilisateur
* `mute [ID]` → Rendre un utilisateur muet
* `timeout [ID] [raison]` → Timeout un utilisateur
* `unban [ID]` → Débannir un utilisateur
* `warn [ID] [raison]` → Avertir un utilisateur

🔹 Utilitaires

* `avatar [ID]` → Afficher l’avatar d’un utilisateur
* `botinfo` → Infos sur le bot
* `embed` → Créer un embed personnalisé
* `help` → Liste des commandes
* `ping` → Vérifier la latence du bot
* `serverinfo` → Infos sur le serveur
* `userinfo [ID]` → Infos sur un utilisateur



💡 À venir

* Gestion avancée des warns
* Logs de modération
* Dashboard web de configuration



👤 Auteur

Développé par [**Enzo.ilz**](https://github.com/Enzo.ilz)
N’hésite pas à laisser une ⭐ si ce bot t’est utile !