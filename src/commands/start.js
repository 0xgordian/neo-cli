/**
 * Start command for neo-cli
 * Boots the system and launches the interactive shell
 */

import figlet from 'figlet';
import { loadConfig } from '../config.js';
import { getTheme, getFooter } from '../theme.js';
import { createMatrixRain } from '../utils/asciiRain.js';
import { bootSequence, typewriterEffect } from '../utils/effects.js';
import { getRandomSystemMessage } from '../utils/quotes.js';
import { logger } from '../utils/logger.js';
import { ensureSetup } from './setup.js';
import { startREPL } from '../shell/repl.js';

/**
 * Display the ASCII header
 * @param {string} theme - Theme name
 */
function displayHeader(theme) {
  const themeObj = getTheme(theme);
  
  try {
    const ascii = figlet.textSync('neo-cli', {
      font: 'ANSI Shadow',
      horizontalLayout: 'default',
      verticalLayout: 'default'
    });
    
    console.log(themeObj.matrix.header(ascii));
    console.log(themeObj.matrix.header('v1.0.0 — built by 0xgordian'));
    console.log();
  } catch (error) {
    // Fallback if figlet font is not available
    console.log(themeObj.matrix.header('NEO-CLI v1.0.0'));
    console.log(themeObj.matrix.header('built by 0xgordian'));
    console.log();
  }
}

/**
 * Run the boot sequence
 * @param {string} theme - Theme name
 * @param {string} name - User name
 */
async function runBootSequence(theme, name) {
  const themeObj = getTheme(theme);
  
  // Boot messages
  const bootMessages = [
    '[ BOOT ] Initializing Matrix connection...',
    '[ OK ] Connected to Zion Mainframe',
    '[ INFO ] Syncing digital consciousness...',
    '[ OK ] Neural pathways established',
    '[ INFO ] Loading simulation parameters...',
    '[ OK ] System initialization complete',
    `[ INFO ] Welcome back, ${name}`
  ];
  
  // Add some random system messages
  for (let i = 0; i < 3; i++) {
    bootMessages.splice(Math.floor(Math.random() * bootMessages.length), 0, getRandomSystemMessage());
  }
  
  await bootSequence(bootMessages, theme, 600);
  console.log();
}

/**
 * Start the neo-cli system
 * @param {Array} args - Command line arguments
 */
export async function startCommand(args = []) {
  try {
    // Load configuration
    const config = loadConfig();
    const theme = config.theme || 'green';
    
    // Ensure setup is complete
    const finalConfig = await ensureSetup(theme);
    
    // Display header
    displayHeader(finalConfig.theme);
    
    // Run boot sequence
    await runBootSequence(finalConfig.theme, finalConfig.name);
    
    // Show Matrix rain animation
    logger.info('Establishing secure connection...');
    await createMatrixRain(1500, finalConfig.theme);
    
    // Show connection established message
    const themeObj = getTheme(finalConfig.theme);
    await typewriterEffect('Connection established. Entering the Matrix...', finalConfig.theme, 30);
    console.log();
    
    // Start the interactive shell
    await startREPL(finalConfig);
    
  } catch (error) {
    logger.error(`Failed to start system: ${error.message}`);
    console.log(getFooter('green'));
    process.exit(1);
  }
}
