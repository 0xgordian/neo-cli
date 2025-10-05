/**
 * Prophecy command for neo-cli
 * Displays random Matrix quotes and prophecies
 */

import { loadConfig } from '../config.js';
import { getTheme, getFooter } from '../theme.js';
import { logger } from '../utils/logger.js';
import { getRandomQuote } from '../utils/quotes.js';
import { typewriterEffect } from '../utils/effects.js';

/**
 * Display prophecy with dramatic effect
 * @param {string} quote - Quote to display
 * @param {string} theme - Theme name
 */
async function displayProphecy(quote, theme) {
  const themeObj = getTheme(theme);
  
  console.log();
  console.log(themeObj.matrix.header('=== THE ORACLE SPEAKS ==='));
  console.log();
  
  // Show quote with typewriter effect
  await typewriterEffect(`"${quote}"`, theme, 50);
  console.log();
  
  // Show attribution
  console.log(themeObj.accent('— The Oracle'));
  console.log();
  
  // Show additional context
  console.log(themeObj.matrix.output('The truth is out there, but are you ready to see it?'));
  console.log();
}

/**
 * Prophecy command handler
 * @param {Array} args - Command arguments
 */
export async function prophecyCommand(args = []) {
  try {
    const config = loadConfig();
    const theme = config.theme || 'green';
    
    // Get random quote
    const quote = getRandomQuote();
    
    // Display prophecy
    await displayProphecy(quote, theme);
    
    console.log(getFooter(theme));
    
  } catch (error) {
    logger.error(`Prophecy command failed: ${error.message}`);
    console.log(getFooter('green'));
  }
}
