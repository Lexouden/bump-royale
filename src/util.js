// Types
const {
  Snowflake,
  Guild,
  GuildMember
} = require('discord.js');

/**
 * @param {Snowflake} roleId 
 * @param {Guild} guild 
 */
module.exports.getRole = async (roleId, guild) => {
  return await guild.roles.fetch(roleId);
};

/**
 * @param {Map} bumps 
 * @param {GuildMember} member 
 */
module.exports.getRank = (bumps, member) => {}

/**
 * Check if and which milestone has been achieved
 * @param {Map} bumps 
 * @param {GuildMember} member 
 * @param {Array} milestones 
 */
module.exports.checkMilestone = (bumps, member, milestones) => {}

/**
 * Update a map with data
 * @param {Map} map 
 * @param {Object} update 
 */
module.exports.updateMap = (map, update) => {}

/**
 * Get corresponding member's bump count
 * @param {Map} bumps 
 * @param {GuildMember} member 
 */
module.exports.getBumpCount = (bumps, member) => {}