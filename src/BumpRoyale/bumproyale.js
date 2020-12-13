const {
  EventEmitter
} = require('events');

// Types
const {
  Client,
  Message,
  Guild,
  GuildMember,
  Role,
  Snowflake,
  GuildChannel
} = require('discord.js');
const {
  CommandoClient
} = require('discord.js-commando');

// Util
const util = require('../util');

class BumpRoyale extends EventEmitter {
  /**
   * Bump Royale module configuration
   * @param {Object} param
   * @param {(Client|CommandoClient)} param.client - The bot client, either Commando or default
   * @param {Map.<{members: Map.<{bumps: Number}, String}, Snowflake>} param.cache - Preload cache from a database
   * @param {Map.<{reminders: [{message: String, interval: Number, timestamp: Date}]}, Snowflake} param.reminders - Preload reminders from a database
   * @param {Map.<{channel: Snowflake, commands: Array.<{message: String, interval: Number, botId: String}>, milestones: Array.<{roleName: String, id: String, limit: Number}>, reminders: Boolean}, Snowflake>} param.config - Module configuration
   */
  constructor({
    client,
    cache = new Map(),
    config,
    reminders = new Map()
  }) {
    super();

    this._client = client;
    this._reminders = reminders;
    this.cache = cache;
    this.config = config;
  }

  _init() {}

  /**
   * Message handler
   * @param {Message} message
   */
  async message(message) {
    const guild = message.guild;
    const member = message.member;
    const content = message.content;
    const guildCommands = this.config.get(guild.id).commands;
    const bumpChannel = await message.guild.channels.fetch(this.config.get(guild.id).channel);

    /** Validation steps */
    const bumpCommand = guildCommands.find(c => c.message.toLowerCase() === content.toLowerCase());

    if (!bumpCommand) return; // If the command is not defined in the config ignore the message

    // Catch bumps in incorrect channel
    if (message.channel.id !== bumpChannel.id) {
      message.delete();
      return message.channel.send(`${message.author} Bump commands should not be used in this channel, please us them in <#${bumpChannel}>.`);
    }

    if ((await this._client.users.fetch(bumpCommand.botId)).presence.status === 'offline') {
      return bumpChannel.send(`<@${bumpCommand.botId}> is currently **offline** and \`${bumpCommand.message}\` will be unavailable until they come back online.`)
    }
    /** End of Validation steps */

    /** Bump rewarding */
    const cacheGuild = this._cache.get(guild.id);

    // TODO: Add bump rewarding to user
    /** End of Bump rewarding */

    this._sendConfirmation(member, bumpChannel);
  }

  /**
   * Send confirmation message to bump channel
   * @param {GuildMember} member 
   * @param {GuildChannel} channel 
   */
  _sendConfirmation(member, channel) {
    channel.send(`${member} received the bump! They now have **${util.getBumpCount(this._cache.get(guild.id), member)}** bumps.\nYou will be reminded when the next bump becomes available.`);
  }

  /** Reminder methods */
  handleReminders() {}

  /**
   * @param {Guild} guild 
   */
  _setReminder(guild) {}

  _sendReminder() {}
  /** End of Reminder methods */

  /** Auto role methods */
  /**
   * Give a member a new role
   * @param {GuildMember} member 
   * @param {Role} oldRole 
   * @param {Role} newRole
   */
  _setRole(member, role, newRole) {}

  _updateRoles() {}
  /** End of Auto role methods */

  /** Leaderboard methods */
  /**
   * Retrieve guild leaderboard
   * @param {Guild} guild 
   */
  leaderboard(guild) {}

  /**
   * Get leaderboard position of a specific member
   * @param {GuildMember} member 
   */
  getLeaderboardPosition(member, guild) {}
  /** End of Leaderboard methods */


  /** Events */
  /**
   * Emitted on successful bump
   * @event BumpRoyale#bump
   * 
   * @param {GuildMember} member
   * @param {Guild} guild
   * 
   * @example
   * bumpRoyale.on("bump", (member, guild) => console.log(`${member.user.tag} has bumped 1 time`))
   */
}

module.exports = BumpRoyale;