/**
 * Hack command for neo-cli
 * Runs a fake hacking sequence with Matrix rain effect
 */

import { loadConfig } from '../config.js';
import { getTheme, getFooter } from '../theme.js';
import { logger } from '../utils/logger.js';
import { createMatrixRain } from '../utils/asciiRain.js';
import { typewriterEffect, matrixLoading } from '../utils/effects.js';

/**
 * Generate fake hack progress messages
 * @param {string} theme - Theme name
 * @returns {Array} Array of hack messages
 */
function generateHackMessages(theme) {
  const messages = [
    'Initializing hack sequence...',
    'Bypassing firewall...',
    'Cracking encryption...',
    'Accessing mainframe...',
    'Downloading data...',
    'Injecting payload...',
    'Escalating privileges...',
    'Planting backdoor...',
    'Covering tracks...',
    'Hack complete!'
  ];
  
  return messages;
}

/**
 * Run fake hacking sequence
 * @param {string} theme - Theme name
 */
async function runHackSequence(theme) {
  const themeObj = getTheme(theme);
  const messages = generateHackMessages(theme);
  
  console.log();
  console.log(themeObj.matrix.header('=== HACKING SEQUENCE INITIATED ==='));
  console.log();
  
  // Show hack progress
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    const progress = Math.floor(((i + 1) / messages.length) * 100);
    
    // Show progress with loading animation
    await matrixLoading(`${message} (${progress}%)`, theme, 800);
  }
  
  console.log();
  console.log(themeObj.matrix.header('=== HACKING SEQUENCE COMPLETE ==='));
  console.log();
  
  // Show Matrix rain effect
  logger.info('Executing final payload...');
  await createMatrixRain(2000, theme);
  
  // Show success message
  await typewriterEffect('System compromised. Access granted.', theme, 30);
  console.log();
}

/**
 * Hack command handler
 * @param {Array} args - Command arguments
 */
export async function hackCommand(args = []) {
  try {
    const config = loadConfig();
    const theme = config.theme || 'green';
    
    // Run hacking sequence
    await runHackSequence(theme);
    
    console.log(getFooter(theme));
    
  } catch (error) {
    logger.error(`Hack command failed: ${error.message}`);
    console.log(getFooter('green'));
  }
}
