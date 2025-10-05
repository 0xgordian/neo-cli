/**
 * Status command for neo-cli
 * Shows fake system status information
 */

import { loadConfig } from '../config.js';
import { getTheme, getFooter } from '../theme.js';
import { logger } from '../utils/logger.js';
import { getRandomSystemMessage } from '../utils/quotes.js';

/**
 * Generate fake system status
 * @param {string} theme - Theme name
 * @returns {Object} Status object
 */
function generateSystemStatus(theme) {
  const statuses = ['Online', 'Connected', 'Active', 'Operational', 'Stable'];
  const connections = ['Zion Mainframe', 'Matrix Core', 'Neural Network', 'Quantum Tunnel', 'Digital Realm'];
  const nodes = ['Primary', 'Secondary', 'Backup', 'Mirror', 'Shadow'];
  
  return {
    system: statuses[Math.floor(Math.random() * statuses.length)],
    connection: connections[Math.floor(Math.random() * connections.length)],
    node: nodes[Math.floor(Math.random() * nodes.length)],
    uptime: Math.floor(Math.random() * 999) + 1,
    memory: Math.floor(Math.random() * 80) + 20,
    cpu: Math.floor(Math.random() * 60) + 10,
    network: Math.floor(Math.random() * 100),
    lastUpdate: new Date().toISOString()
  };
}

/**
 * Display system status
 * @param {Object} status - Status object
 * @param {string} theme - Theme name
 */
function displayStatus(status, theme) {
  const themeObj = getTheme(theme);
  
  console.log();
  console.log(themeObj.matrix.header('=== SYSTEM STATUS ==='));
  console.log();
  
  // Main status
  console.log(themeObj.matrix.output(`System: ${themeObj.success(status.system)}`));
  console.log(themeObj.matrix.output(`Connected to: ${themeObj.info(status.connection)}`));
  console.log(themeObj.matrix.output(`Node: ${themeObj.secondary(status.node)}`));
  console.log();
  
  // Performance metrics
  console.log(themeObj.matrix.header('Performance Metrics:'));
  console.log(themeObj.matrix.output(`Uptime: ${themeObj.info(status.uptime)} hours`));
  console.log(themeObj.matrix.output(`Memory Usage: ${themeObj.warning(status.memory)}%`));
  console.log(themeObj.matrix.output(`CPU Usage: ${themeObj.warning(status.cpu)}%`));
  console.log(themeObj.matrix.output(`Network: ${themeObj.success(status.network)}%`));
  console.log();
  
  // Random system message
  console.log(themeObj.matrix.header('System Messages:'));
  console.log(themeObj.matrix.output(getRandomSystemMessage()));
  console.log(themeObj.matrix.output(getRandomSystemMessage()));
  console.log();
  
  // Last update
  console.log(themeObj.accent(`Last Update: ${status.lastUpdate}`));
  console.log();
}

/**
 * Status command handler
 * @param {Array} args - Command arguments
 */
export async function statusCommand(args = []) {
  try {
    const config = loadConfig();
    const theme = config.theme || 'green';
    
    // Generate and display status
    const status = generateSystemStatus(theme);
    displayStatus(status, theme);
    
    console.log(getFooter(theme));
    
  } catch (error) {
    logger.error(`Status command failed: ${error.message}`);
    console.log(getFooter('green'));
  }
}
