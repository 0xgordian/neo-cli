/**
 * Reset command for neo-cli
 * Clears user configuration and resets to defaults
 */

import inquirer from 'inquirer';
import { resetConfig, loadConfig } from '../config.js';
import { getFooter } from '../theme.js';
import { logger } from '../utils/logger.js';

/**
 * Reset command handler
 * @param {Array} args - Command arguments
 */
export async function resetCommand(args = []) {
  try {
    const config = loadConfig();
    const currentTheme = config.theme || 'green';
    
    // Show warning
    logger.warn('This will reset all your neo-cli configuration to defaults.');
    logger.warn('This includes your name, theme preferences, and all settings.');
    console.log();
    
    // Ask for confirmation
    const answer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Are you sure you want to reset your configuration?',
        default: false
      }
    ]);
    
    if (answer.confirm) {
      // Reset configuration
      resetConfig();
      
      logger.success('Configuration reset successfully.');
      logger.info('Run "neo-cli setup" to configure your preferences again.');
      
    } else {
      logger.info('Reset cancelled. Configuration unchanged.');
    }
    
    console.log(getFooter(currentTheme));
    
  } catch (error) {
    logger.error(`Reset command failed: ${error.message}`);
    console.log(getFooter('green'));
  }
}
