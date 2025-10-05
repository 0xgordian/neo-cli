/**
 * Theme management for neo-cli
 * Handles color schemes and visual styling
 */

import chalk from 'chalk';

// Theme definitions
const THEMES = {
  green: {
    name: 'Green Pill',
    primary: chalk.green,
    secondary: chalk.greenBright,
    accent: chalk.green.dim,
    text: chalk.white,
    error: chalk.red,
    warning: chalk.yellow,
    success: chalk.green,
    info: chalk.cyan,
    rain: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'],
    matrix: {
      header: chalk.green.bold,
      prompt: chalk.green,
      output: chalk.greenBright,
      error: chalk.red,
      success: chalk.greenBright
    }
  },
  red: {
    name: 'Red Pill',
    primary: chalk.red,
    secondary: chalk.redBright,
    accent: chalk.red.dim,
    text: chalk.white,
    error: chalk.red,
    warning: chalk.yellow,
    success: chalk.green,
    info: chalk.cyan,
    rain: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'],
    matrix: {
      header: chalk.red.bold,
      prompt: chalk.red,
      output: chalk.redBright,
      error: chalk.red,
      success: chalk.redBright
    }
  }
};

/**
 * Get current theme
 * @param {string} themeName - Theme name ('green' or 'red')
 * @returns {Object} Theme object
 */
export function getTheme(themeName = 'green') {
  return THEMES[themeName] || THEMES.green;
}

/**
 * Apply theme styling to text
 * @param {string} text - Text to style
 * @param {string} style - Style type (primary, secondary, etc.)
 * @param {string} themeName - Theme name
 * @returns {string} Styled text
 */
export function styleText(text, style = 'text', themeName = 'green') {
  const theme = getTheme(themeName);
  const styler = theme[style] || theme.text;
  return styler(text);
}

/**
 * Get Matrix rain characters for current theme
 * @param {string} themeName - Theme name
 * @returns {Array} Array of rain characters
 */
export function getRainChars(themeName = 'green') {
  const theme = getTheme(themeName);
  return theme.rain;
}

/**
 * Get Matrix color for rain effect
 * @param {string} themeName - Theme name
 * @returns {Function} Chalk color function
 */
export function getRainColor(themeName = 'green') {
  const theme = getTheme(themeName);
  return theme.secondary;
}

/**
 * Get available theme names
 * @returns {Array} Array of theme names
 */
export function getAvailableThemes() {
  return Object.keys(THEMES);
}

/**
 * Get theme display name
 * @param {string} themeName - Theme name
 * @returns {string} Display name
 */
export function getThemeDisplayName(themeName) {
  const theme = getTheme(themeName);
  return theme.name;
}

/**
 * Validate theme name
 * @param {string} themeName - Theme name to validate
 * @returns {boolean} True if valid
 */
export function isValidTheme(themeName) {
  return Object.keys(THEMES).includes(themeName);
}

/**
 * Get footer text with theme styling
 * @param {string} themeName - Theme name
 * @returns {string} Styled footer
 */
export function getFooter(themeName = 'green') {
  const theme = getTheme(themeName);
  return theme.accent('>>> built by 0xgordian');
}
