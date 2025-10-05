/**
 * System information utilities for neo-cli
 * Provides system details and update checking
 */

import os from 'os';
import { exec } from 'child_process';
import { promisify } from 'util';
import { loadConfig, saveConfig } from './config.js';
import { logger } from './utils/logger.js';

const execAsync = promisify(exec);

/**
 * Get system information
 * @returns {Object} System information object
 */
export function getSystemInfo() {
  return {
    platform: os.platform(),
    arch: os.arch(),
    nodeVersion: process.version,
    memory: {
      total: os.totalmem(),
      free: os.freemem(),
      used: os.totalmem() - os.freemem()
    },
    uptime: os.uptime(),
    cpus: os.cpus().length,
    hostname: os.hostname(),
    user: os.userInfo().username,
    homeDir: os.homedir(),
    tempDir: os.tmpdir()
  };
}

/**
 * Format bytes to human readable format
 * @param {number} bytes - Number of bytes
 * @returns {string} Formatted string
 */
export function formatBytes(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Format uptime to human readable format
 * @param {number} seconds - Uptime in seconds
 * @returns {string} Formatted string
 */
export function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}

/**
 * Get current working directory
 * @returns {string} Current working directory
 */
export function getCurrentDirectory() {
  return process.cwd();
}

/**
 * Get environment variables
 * @returns {Object} Environment variables
 */
export function getEnvironment() {
  return {
    PATH: process.env.PATH,
    HOME: process.env.HOME,
    USER: process.env.USER,
    SHELL: process.env.SHELL,
    TERM: process.env.TERM,
    LANG: process.env.LANG
  };
}

/**
 * Check for updates
 * @returns {Promise<Object>} Update information
 */
export async function checkForUpdates() {
  try {
    const config = loadConfig();
    const now = Date.now();
    
    // Check if we should check for updates (once per day)
    const lastCheck = config.lastUpdateCheck || 0;
    const oneDay = 24 * 60 * 60 * 1000;
    
    if (now - lastCheck < oneDay) {
      return { checked: false, reason: 'Already checked today' };
    }
    
    // Check npm for updates
    const { stdout } = await execAsync('npm view neo-cli version');
    const latestVersion = stdout.trim();
    const currentVersion = '1.0.0'; // This should match package.json
    
    // Update last check time
    config.lastUpdateCheck = now;
    saveConfig(config);
    
    return {
      checked: true,
      current: currentVersion,
      latest: latestVersion,
      updateAvailable: latestVersion !== currentVersion
    };
    
  } catch (error) {
    logger.debug(`Update check failed: ${error.message}`);
    return { checked: false, error: error.message };
  }
}

/**
 * Get package information
 * @returns {Object} Package information
 */
export function getPackageInfo() {
  return {
    name: 'neo-cli',
    version: '1.0.0',
    description: 'neo-cli — a Matrix-style interactive shell for developers',
    author: '0xgordian',
    license: 'MIT',
    repository: 'https://github.com/0xgordian/neo-cli.git',
    homepage: 'https://github.com/0xgordian/neo-cli#readme'
  };
}

/**
 * Get performance metrics
 * @returns {Object} Performance metrics
 */
export function getPerformanceMetrics() {
  const usage = process.memoryUsage();
  
  return {
    memory: {
      rss: usage.rss,
      heapTotal: usage.heapTotal,
      heapUsed: usage.heapUsed,
      external: usage.external,
      arrayBuffers: usage.arrayBuffers
    },
    cpu: process.cpuUsage(),
    uptime: process.uptime()
  };
}

/**
 * Get network information
 * @returns {Object} Network information
 */
export function getNetworkInfo() {
  const interfaces = os.networkInterfaces();
  const networkInfo = {};
  
  for (const [name, addresses] of Object.entries(interfaces)) {
    networkInfo[name] = addresses.map(addr => ({
      address: addr.address,
      family: addr.family,
      internal: addr.internal,
      mac: addr.mac
    }));
  }
  
  return networkInfo;
}

/**
 * Get shell information
 * @returns {Promise<Object>} Shell information
 */
export async function getShellInfo() {
  try {
    const shell = process.env.SHELL || '/bin/bash';
    const { stdout } = await execAsync(`${shell} --version`);
    
    return {
      shell: shell,
      version: stdout.trim()
    };
  } catch (error) {
    return {
      shell: process.env.SHELL || 'unknown',
      version: 'unknown'
    };
  }
}
