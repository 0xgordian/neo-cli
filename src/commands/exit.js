/**
 * Exit command for neo-cli
 * Handles graceful shutdown with Matrix-themed messages
 */

import { loadConfig } from '../config.js';
import { getTheme, getFooter } from '../theme.js';
import { logger } from '../utils/logger.js';
import { typewriterEffect } from '../utils/effects.js';

/**
 * Display shutdown sequence
 * @param {string} theme - Theme name
 * @param {string} name - User name
 */
async function displayShutdown(theme, name) {
  const themeObj = getTheme(theme);
  
  console.log();
  console.log(themeObj.matrix.header('=== SYSTEM SHUTDOWN ==='));
  console.log();
  
  // Show shutdown messages
  const messages = [
    'Disconnecting from Matrix...',
    'Saving consciousness state...',
    'Closing neural pathways...',
    'System disconnecting...',
    `Goodbye, ${name}.`
  ];
  
  for (const message of messages) {
    await typewriterEffect(message, theme, 40);
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  console.log();
  console.log(themeObj.matrix.output('The Matrix has you...'));
  console.log();
}

/**
 * Exit command handler
 * @param {Array} args - Command arguments
 */
export async function exitCommand(args = []) {
  try {
    const config = loadConfig();
    const theme = config.theme || 'green';
    const name = config.name || 'Operator';
    
    // Display shutdown sequence
    await displayShutdown(theme, name);
    
    // Show footer
    console.log(getFooter(theme));
    
    // Exit process
    process.exit(0);
    
  } catch (error) {
    logger.error(`Exit command failed: ${error.message}`);
    console.log(getFooter('green'));
    process.exit(1);
  }
}
