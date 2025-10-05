/**
 * Theme command for neo-cli
 * Handles theme switching and management
 */

import inquirer from 'inquirer';
import { loadConfig, saveConfig } from '../config.js';
import { getTheme, getThemeDisplayName, getAvailableThemes, getFooter } from '../theme.js';
import { logger } from '../utils/logger.js';

/**
 * Show current theme information
 * @param {string} theme - Current theme name
 */
function showCurrentTheme(theme) {
  const themeObj = getTheme(theme);
  const displayName = getThemeDisplayName(theme);
  
  console.log();
  logger.info(`Current theme: ${themeObj.matrix.header(displayName)}`);
  console.log();
  
  // Show theme preview
  console.log(themeObj.matrix.header('Theme Preview:'));
  console.log(themeObj.primary('Primary color text'));
  console.log(themeObj.secondary('Secondary color text'));
  console.log(themeObj.accent('Accent color text'));
  console.log(themeObj.success('Success message'));
  console.log(themeObj.warning('Warning message'));
  console.log(themeObj.error('Error message'));
  console.log();
}

/**
 * Switch theme interactively
 * @param {string} currentTheme - Current theme name
 * @returns {Promise<string>} New theme name
 */
async function switchTheme(currentTheme) {
  const config = loadConfig();
  
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'theme',
      message: 'Choose your pill:',
      choices: [
        { name: 'Green Pill (Default Matrix theme)', value: 'green' },
        { name: 'Red Pill (Alternative theme)', value: 'red' }
      ],
      default: currentTheme
    }
  ]);
  
  // Update configuration
  config.theme = answer.theme;
  saveConfig(config);
  
  return answer.theme;
}

/**
 * Set theme directly
 * @param {string} themeName - Theme name to set
 * @returns {string} Set theme name
 */
function setTheme(themeName) {
  const availableThemes = getAvailableThemes();
  
  if (!availableThemes.includes(themeName)) {
    throw new Error(`Invalid theme: ${themeName}. Available themes: ${availableThemes.join(', ')}`);
  }
  
  const config = loadConfig();
  config.theme = themeName;
  saveConfig(config);
  
  return themeName;
}

/**
 * List available themes
 */
function listThemes() {
  const availableThemes = getAvailableThemes();
  
  console.log();
  logger.info('Available themes:');
  availableThemes.forEach(theme => {
    const displayName = getThemeDisplayName(theme);
    const themeObj = getTheme(theme);
    console.log(`  ${themeObj.matrix.header(displayName)} (${theme})`);
  });
  console.log();
}

/**
 * Theme command handler
 * @param {Array} args - Command arguments
 */
export async function themeCommand(args = []) {
  try {
    const config = loadConfig();
    const currentTheme = config.theme || 'green';
    
    if (args.length === 0) {
      // Show current theme and switch interactively
      showCurrentTheme(currentTheme);
      const newTheme = await switchTheme(currentTheme);
      
      if (newTheme !== currentTheme) {
        logger.success(`Theme switched to ${getThemeDisplayName(newTheme)}`);
        console.log();
        showCurrentTheme(newTheme);
      } else {
        logger.info('Theme unchanged');
      }
      
    } else if (args[0] === 'list') {
      // List available themes
      listThemes();
      
    } else if (args[0] === 'set' && args[1]) {
      // Set theme directly
      const newTheme = setTheme(args[1]);
      logger.success(`Theme set to ${getThemeDisplayName(newTheme)}`);
      console.log();
      showCurrentTheme(newTheme);
      
    } else if (args[0] === 'current') {
      // Show current theme only
      showCurrentTheme(currentTheme);
      
    } else {
      // Invalid arguments
      logger.error('Invalid theme command. Usage:');
      console.log('  neo-cli theme              - Switch theme interactively');
      console.log('  neo-cli theme list         - List available themes');
      console.log('  neo-cli theme set <name>   - Set theme directly');
      console.log('  neo-cli theme current      - Show current theme');
    }
    
    console.log(getFooter(currentTheme));
    
  } catch (error) {
    logger.error(`Theme command failed: ${error.message}`);
    console.log(getFooter('green'));
  }
}
