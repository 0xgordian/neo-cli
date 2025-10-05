/**
 * Logging utility for neo-cli
 * Provides styled logging with theme support
 */

import { styleText, getTheme } from '../theme.js';

/**
 * Logger class for neo-cli
 */
export class Logger {
  constructor(theme = 'green', verbose = false) {
    this.theme = theme;
    this.verbose = verbose;
  }

  /**
   * Log info message
   * @param {string} message - Message to log
   */
  info(message) {
    console.log(styleText(`[ INFO ] ${message}`, 'info', this.theme));
  }

  /**
   * Log success message
   * @param {string} message - Message to log
   */
  success(message) {
    console.log(styleText(`[ OK ] ${message}`, 'success', this.theme));
  }

  /**
   * Log warning message
   * @param {string} message - Message to log
   */
  warn(message) {
    console.log(styleText(`[ WARN ] ${message}`, 'warning', this.theme));
  }

  /**
   * Log error message
   * @param {string} message - Message to log
   */
  error(message) {
    console.log(styleText(`[ ERROR ] ${message}`, 'error', this.theme));
  }

  /**
   * Log debug message (only if verbose mode is enabled)
   * @param {string} message - Message to log
   */
  debug(message) {
    if (this.verbose) {
      console.log(styleText(`[ DEBUG ] ${message}`, 'accent', this.theme));
    }
  }

  /**
   * Log system message with Matrix styling
   * @param {string} message - Message to log
   */
  system(message) {
    const theme = getTheme(this.theme);
    console.log(theme.matrix.output(`[ SYSTEM ] ${message}`));
  }

  /**
   * Log boot sequence message
   * @param {string} message - Message to log
   */
  boot(message) {
    const theme = getTheme(this.theme);
    console.log(theme.matrix.header(`[ BOOT ] ${message}`));
  }

  /**
   * Log with custom prefix
   * @param {string} prefix - Custom prefix
   * @param {string} message - Message to log
   * @param {string} style - Style type
   */
  custom(prefix, message, style = 'text') {
    console.log(styleText(`[ ${prefix} ] ${message}`, style, this.theme));
  }

  /**
   * Log raw message without styling
   * @param {string} message - Message to log
   */
  raw(message) {
    console.log(message);
  }

  /**
   * Log with typewriter effect
   * @param {string} message - Message to log
   * @param {number} delay - Delay between characters in ms
   * @returns {Promise} Promise that resolves when typing is complete
   */
  async typewriter(message, delay = 50) {
    const theme = getTheme(this.theme);
    const styledMessage = theme.matrix.output(message);
    
    for (let i = 0; i < styledMessage.length; i++) {
      process.stdout.write(styledMessage[i]);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    console.log(); // New line after typing
  }

  /**
   * Log with glitch effect
   * @param {string} message - Message to log
   * @param {number} iterations - Number of glitch iterations
   * @returns {Promise} Promise that resolves when glitch is complete
   */
  async glitch(message, iterations = 5) {
    const theme = getTheme(this.theme);
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    for (let i = 0; i < iterations; i++) {
      process.stdout.write('\r');
      const glitched = message.split('').map(char => 
        Math.random() < 0.3 ? chars[Math.floor(Math.random() * chars.length)] : char
      ).join('');
      process.stdout.write(theme.matrix.output(glitched));
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Show final message
    process.stdout.write('\r');
    process.stdout.write(theme.matrix.output(message));
    console.log();
  }

  /**
   * Set theme
   * @param {string} theme - Theme name
   */
  setTheme(theme) {
    this.theme = theme;
  }

  /**
   * Set verbose mode
   * @param {boolean} verbose - Verbose mode flag
   */
  setVerbose(verbose) {
    this.verbose = verbose;
  }
}

// Create default logger instance
export const logger = new Logger();
