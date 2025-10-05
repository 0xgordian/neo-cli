/**
 * Matrix command for neo-cli
 * Spawns infinite Matrix rain animation
 */

import { loadConfig } from '../config.js';
import { getTheme, getFooter } from '../theme.js';
import { logger } from '../utils/logger.js';
import { createMatrixRain } from '../utils/asciiRain.js';

/**
 * Matrix command handler
 * @param {Array} args - Command arguments
 */
export async function matrixCommand(args = []) {
  try {
    const config = loadConfig();
    const theme = config.theme || 'green';
    
    console.log();
    logger.info('Entering the Matrix...');
    logger.info('Press Ctrl+C to exit the Matrix');
    console.log();
    
    // Show footer
    console.log(getFooter(theme));
    console.log();
    
    // Start infinite Matrix rain
    await createMatrixRain(0, theme); // 0 duration = infinite
    
  } catch (error) {
    if (error.code === 'SIGINT') {
      // User pressed Ctrl+C
      console.log('\n');
      logger.info('Exiting the Matrix...');
      console.log(getFooter(theme));
      process.exit(0);
    } else {
      logger.error(`Matrix command failed: ${error.message}`);
      console.log(getFooter('green'));
      process.exit(1);
    }
  }
}
