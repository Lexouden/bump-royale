const {
  EventEmitter
} = require('events');

// Types
const {
  Client,
  Channel,
  Snowflake
} = require('discord.js');
const {
  CommandoClient
} = require('discord.js-commando');

class BumpRoyale extends EventEmitter {
  /**
   * Bump Royale module configuration
   * @param {Object} param
   * @param {(Client|CommandoClient)} param.client - The bot client, either Commando or default
   * @param {Map.<{members: Map.<{bumps: Number}, String}, String>} param.cache - Preload cache from a database
   * @param {Object} param.config - Module configuration
   * @param {Channel} param.config.channel - Channel to listen in for messages
   * @param {Array.<{message: String, interval: Number}>} param.config.commands - Bump commands to listen for with interval in ms
   * @param {Array.<{roleName: String, id: String, limit: Number}>} param.config.roles - Bump tier roles to give
   */
  constructor({
    client,
    cache = new Map(),
    config
  }) {
    super();

    this._client = client;
    this.cache = cache;
    this.config = config;
  }

  message() {}

  _init() {}

  _setReminder() {}

  _setRole() {}

  _leaderboard() {}
}

module.exports = BumpRoyale;