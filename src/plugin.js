/**
 * Plugin system for neo-cli
 * Handles loading and managing plugins
 */

import fs from 'fs';
import path from 'path';
import { getPluginsDir } from './config.js';
import { logger } from './utils/logger.js';

/**
 * Plugin registry
 */
const plugins = new Map();

/**
 * Plugin API interface
 */
export class PluginAPI {
  constructor(name, config) {
    this.name = name;
    this.config = config;
    this.commands = new Map();
    this.hooks = new Map();
  }
  
  /**
   * Register a command
   * @param {string} name - Command name
   * @param {Function} handler - Command handler function
   * @param {string} description - Command description
   */
  registerCommand(name, handler, description = '') {
    this.commands.set(name, { handler, description });
    logger.debug(`Plugin '${this.name}' registered command '${name}'`);
  }
  
  /**
   * Register a hook
   * @param {string} name - Hook name
   * @param {Function} handler - Hook handler function
   */
  registerHook(name, handler) {
    if (!this.hooks.has(name)) {
      this.hooks.set(name, []);
    }
    this.hooks.get(name).push(handler);
    logger.debug(`Plugin '${this.name}' registered hook '${name}'`);
  }
  
  /**
   * Get configuration value
   * @param {string} key - Configuration key
   * @param {any} defaultValue - Default value
   * @returns {any} Configuration value
   */
  getConfig(key, defaultValue = null) {
    return this.config[key] || defaultValue;
  }
  
  /**
   * Set configuration value
   * @param {string} key - Configuration key
   * @param {any} value - Configuration value
   */
  setConfig(key, value) {
    this.config[key] = value;
  }
  
  /**
   * Log a message
   * @param {string} message - Message to log
   * @param {string} level - Log level
   */
  log(message, level = 'info') {
    logger[level](`[${this.name}] ${message}`);
  }
}

/**
 * Load a plugin
 * @param {string} pluginPath - Path to plugin file
 * @returns {Promise<Object>} Plugin object
 */
async function loadPlugin(pluginPath) {
  try {
    // Check if file exists
    if (!fs.existsSync(pluginPath)) {
      throw new Error(`Plugin file not found: ${pluginPath}`);
    }
    
    // Load the plugin module
    const pluginModule = await import(pluginPath);
    
    // Get plugin name from filename
    const pluginName = path.basename(pluginPath, '.js');
    
    // Create plugin API instance
    const api = new PluginAPI(pluginName, {});
    
    // Initialize the plugin
    if (typeof pluginModule.default === 'function') {
      await pluginModule.default(api);
    } else if (typeof pluginModule.init === 'function') {
      await pluginModule.init(api);
    } else {
      throw new Error('Plugin must export a default function or init function');
    }
    
    // Store the plugin
    plugins.set(pluginName, {
      name: pluginName,
      path: pluginPath,
      api: api,
      commands: api.commands,
      hooks: api.hooks
    });
    
    logger.info(`Plugin '${pluginName}' loaded successfully`);
    
    return plugins.get(pluginName);
    
  } catch (error) {
    logger.error(`Failed to load plugin '${pluginPath}': ${error.message}`);
    throw error;
  }
}

/**
 * Load all plugins from the plugins directory
 * @returns {Promise<Array>} Array of loaded plugins
 */
export async function loadAllPlugins() {
  const pluginsDir = getPluginsDir();
  const loadedPlugins = [];
  
  try {
    // Check if plugins directory exists
    if (!fs.existsSync(pluginsDir)) {
      logger.debug('Plugins directory does not exist, skipping plugin loading');
      return loadedPlugins;
    }
    
    // Get all JavaScript files in plugins directory
    const files = fs.readdirSync(pluginsDir)
      .filter(file => file.endsWith('.js'))
      .map(file => path.join(pluginsDir, file));
    
    // Load each plugin
    for (const file of files) {
      try {
        const plugin = await loadPlugin(file);
        loadedPlugins.push(plugin);
      } catch (error) {
        logger.error(`Failed to load plugin '${file}': ${error.message}`);
      }
    }
    
    logger.info(`Loaded ${loadedPlugins.length} plugins`);
    
  } catch (error) {
    logger.error(`Failed to load plugins: ${error.message}`);
  }
  
  return loadedPlugins;
}

/**
 * Get a plugin by name
 * @param {string} name - Plugin name
 * @returns {Object|null} Plugin object or null
 */
export function getPlugin(name) {
  return plugins.get(name) || null;
}

/**
 * Get all loaded plugins
 * @returns {Array} Array of plugin objects
 */
export function getAllPlugins() {
  return Array.from(plugins.values());
}

/**
 * Get all plugin commands
 * @returns {Map} Map of command names to plugin commands
 */
export function getPluginCommands() {
  const allCommands = new Map();
  
  for (const plugin of plugins.values()) {
    for (const [name, command] of plugin.commands) {
      allCommands.set(name, {
        ...command,
        plugin: plugin.name
      });
    }
  }
  
  return allCommands;
}

/**
 * Execute a plugin command
 * @param {string} name - Command name
 * @param {Array} args - Command arguments
 * @param {Object} config - Configuration object
 * @returns {Promise<any>} Command result
 */
export async function executePluginCommand(name, args, config) {
  const command = getPluginCommands().get(name);
  
  if (!command) {
    throw new Error(`Plugin command '${name}' not found`);
  }
  
  try {
    return await command.handler(args, config, command.plugin);
  } catch (error) {
    logger.error(`Plugin command '${name}' failed: ${error.message}`);
    throw error;
  }
}

/**
 * Execute plugin hooks
 * @param {string} hookName - Hook name
 * @param {any} data - Hook data
 * @param {Object} config - Configuration object
 * @returns {Promise<any>} Hook results
 */
export async function executeHooks(hookName, data, config) {
  const results = [];
  
  for (const plugin of plugins.values()) {
    const hooks = plugin.hooks.get(hookName) || [];
    
    for (const hook of hooks) {
      try {
        const result = await hook(data, config, plugin.name);
        results.push(result);
      } catch (error) {
        logger.error(`Plugin hook '${hookName}' in '${plugin.name}' failed: ${error.message}`);
      }
    }
  }
  
  return results;
}

/**
 * Unload a plugin
 * @param {string} name - Plugin name
 * @returns {boolean} True if plugin was unloaded
 */
export function unloadPlugin(name) {
  const plugin = plugins.get(name);
  
  if (plugin) {
    plugins.delete(name);
    logger.info(`Plugin '${name}' unloaded`);
    return true;
  }
  
  return false;
}

/**
 * Reload a plugin
 * @param {string} name - Plugin name
 * @returns {Promise<Object|null>} Reloaded plugin or null
 */
export async function reloadPlugin(name) {
  const plugin = plugins.get(name);
  
  if (plugin) {
    // Unload the plugin
    unloadPlugin(name);
    
    // Reload the plugin
    return await loadPlugin(plugin.path);
  }
  
  return null;
}
