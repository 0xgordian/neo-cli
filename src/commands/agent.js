/**
 * Agent command for neo-cli
 * Generates random Matrix agent codenames
 */

import { loadConfig } from '../config.js';
import { getTheme, getFooter } from '../theme.js';
import { logger } from '../utils/logger.js';
import { getRandomAgentName } from '../utils/quotes.js';

/**
 * Generate agent codename
 * @param {string} theme - Theme name
 * @returns {string} Agent codename
 */
function generateAgentCode(theme) {
  const prefixes = ['Agent', 'Operator', 'Neo', 'Morpheus', 'Trinity', 'Cypher', 'Tank', 'Dozer', 'Switch', 'Apoc'];
  const suffixes = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa'];
  const numbers = Array.from({length: 100}, (_, i) => i + 1);
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  const number = numbers[Math.floor(Math.random() * numbers.length)];
  
  return `${prefix} ${suffix}${number}`;
}

/**
 * Display agent information
 * @param {string} agentCode - Agent codename
 * @param {string} theme - Theme name
 */
function displayAgent(agentCode, theme) {
  const themeObj = getTheme(theme);
  
  console.log();
  console.log(themeObj.matrix.header('=== AGENT ASSIGNMENT ==='));
  console.log();
  
  // Main agent display
  console.log(themeObj.matrix.output(`Your Matrix codename: ${themeObj.matrix.header(agentCode)}`));
  console.log();
  
  // Agent details
  console.log(themeObj.matrix.header('Agent Details:'));
  console.log(themeObj.matrix.output(`Status: ${themeObj.success('Active')}`));
  console.log(themeObj.matrix.output(`Clearance: ${themeObj.info('Level 7')}`));
  console.log(themeObj.matrix.output(`Assignment: ${themeObj.secondary('Matrix Operations')}`));
  console.log(themeObj.matrix.output(`Last Mission: ${themeObj.accent('Classified')}`));
  console.log();
  
  // Warning message
  console.log(themeObj.warning('⚠️  WARNING: Agent detected in the area'));
  console.log(themeObj.matrix.output('Stay alert and maintain operational security.'));
  console.log();
}

/**
 * Agent command handler
 * @param {Array} args - Command arguments
 */
export async function agentCommand(args = []) {
  try {
    const config = loadConfig();
    const theme = config.theme || 'green';
    
    // Generate agent codename
    const agentCode = generateAgentCode(theme);
    
    // Display agent information
    displayAgent(agentCode, theme);
    
    console.log(getFooter(theme));
    
  } catch (error) {
    logger.error(`Agent command failed: ${error.message}`);
    console.log(getFooter('green'));
  }
}
