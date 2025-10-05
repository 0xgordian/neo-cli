/**
 * Setup command for neo-cli
 * Handles initial configuration and user onboarding
 */

import inquirer from 'inquirer';
import { loadConfig, saveConfig, isSetupComplete } from '../config.js';
import { getThemeDisplayName, getAvailableThemes, getFooter } from '../theme.js';
import { createMatrixRain } from '../utils/asciiRain.js';
import { typewriterEffect } from '../utils/effects.js';
import { logger } from '../utils/logger.js';

/**
 * Run the setup process
 * @param {string} theme - Current theme
 * @returns {Promise<Object>} Updated configuration
 */
export async function runSetup(theme = 'green') {
  logger.setTheme(theme);
  
  // Show welcome message
  await typewriterEffect('Welcome to the Matrix, Operator.', theme, 50);
  console.log();
  
  // Ask for name
  const nameAnswer = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name, Operator?',
      validate: (input) => {
        if (!input.trim()) {
          return 'Please enter your name.';
        }
        return true;
      }
    }
  ]);
  
  // Ask for theme (pill choice)
  const themeAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'theme',
      message: 'Choose your pill:',
      choices: [
        { name: 'Green Pill (Default Matrix theme)', value: 'green' },
        { name: 'Red Pill (Alternative theme)', value: 'red' }
      ],
      default: theme
    }
  ]);
  
  // Load current config and update
  const config = loadConfig();
  config.name = nameAnswer.name.trim();
  config.theme = themeAnswer.theme;
  
  // Save configuration
  saveConfig(config);
  
  // Show completion message
  console.log();
  await typewriterEffect(`wake up, ${config.name}.`, themeAnswer.theme, 50);
  console.log();
  
  // Show Matrix rain animation
  logger.info('Initializing Matrix connection...');
  await createMatrixRain(2000, themeAnswer.theme);
  
  // Show footer
  console.log(getFooter(themeAnswer.theme));
  
  return config;
}

/**
 * Check if setup is needed and run if necessary
 * @param {string} theme - Current theme
 * @returns {Promise<Object>} Configuration object
 */
export async function ensureSetup(theme = 'green') {
  if (!isSetupComplete()) {
    return await runSetup(theme);
  }
  return loadConfig();
}

/**
 * Force re-run setup
 * @param {string} theme - Current theme
 * @returns {Promise<Object>} Updated configuration
 */
export async function forceSetup(theme = 'green') {
  return await runSetup(theme);
}
