/**
 * Configuration management for neo-cli
 * Handles user preferences, themes, and settings persistence
 */

import fs from 'fs';
import path from 'path';
import os from 'os';

const CONFIG_DIR = path.join(os.homedir(), '.neo-cli');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');
const PLUGINS_DIR = path.join(CONFIG_DIR, 'plugins');

// Default configuration
const DEFAULT_CONFIG = {
  name: null,
  theme: 'green', // 'green' or 'red'
  plugins: [],
  aliases: {},
  history: [],
  lastUpdateCheck: null,
  verbose: false
};

/**
 * Ensure config directory exists
 */
function ensureConfigDir() {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
  if (!fs.existsSync(PLUGINS_DIR)) {
    fs.mkdirSync(PLUGINS_DIR, { recursive: true });
  }
}

/**
 * Load configuration from file
 * @returns {Object} Configuration object
 */
export function loadConfig() {
  ensureConfigDir();
  
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, 'utf8');
      const config = JSON.parse(data);
      // Merge with defaults to handle new config options
      return { ...DEFAULT_CONFIG, ...config };
    }
  } catch (error) {
    console.warn('>>> Warning: Could not load config, using defaults');
  }
  
  return { ...DEFAULT_CONFIG };
}

/**
 * Save configuration to file
 * @param {Object} config - Configuration object to save
 */
export function saveConfig(config) {
  ensureConfigDir();
  
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
  } catch (error) {
    console.error('>>> Error: Could not save configuration');
    throw error;
  }
}

/**
 * Update a specific config value
 * @param {string} key - Config key to update
 * @param {any} value - New value
 */
export function updateConfig(key, value) {
  const config = loadConfig();
  config[key] = value;
  saveConfig(config);
  return config;
}

/**
 * Reset configuration to defaults
 */
export function resetConfig() {
  ensureConfigDir();
  
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      fs.unlinkSync(CONFIG_FILE);
    }
  } catch (error) {
    console.error('>>> Error: Could not reset configuration');
    throw error;
  }
  
  return { ...DEFAULT_CONFIG };
}

/**
 * Get config directory path
 * @returns {string} Config directory path
 */
export function getConfigDir() {
  return CONFIG_DIR;
}

/**
 * Get plugins directory path
 * @returns {string} Plugins directory path
 */
export function getPluginsDir() {
  return PLUGINS_DIR;
}

/**
 * Check if user has completed setup
 * @returns {boolean} True if setup is complete
 */
export function isSetupComplete() {
  const config = loadConfig();
  return config.name !== null && config.name.trim() !== '';
}
