/**
 * Command execution for neo-cli
 * Handles running system commands and external programs
 */

import { spawn } from 'child_process';
import { getTheme } from '../theme.js';
import { logger } from '../utils/logger.js';

/**
 * Execute a system command
 * @param {string} command - Command to execute
 * @param {Object} config - Configuration object
 * @returns {Promise<void>}
 */
export async function executeCommand(command, config) {
  const theme = getTheme(config.theme);
  
  try {
    // Parse command and arguments
    const parts = command.split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);
    
    // Show command being executed
    logger.debug(`Executing: ${command}`);
    
    // Spawn the process
    const child = spawn(cmd, args, {
      stdio: 'inherit',
      shell: true,
      cwd: process.cwd()
    });
    
    // Handle process events
    child.on('error', (error) => {
      logger.error(`Command failed: ${error.message}`);
    });
    
    child.on('exit', (code) => {
      if (code !== 0) {
        logger.warn(`Command exited with code ${code}`);
      }
    });
    
    // Wait for process to complete
    await new Promise((resolve, reject) => {
      child.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Command failed with exit code ${code}`));
        }
      });
      
      child.on('error', reject);
    });
    
  } catch (error) {
    logger.error(`Failed to execute command: ${error.message}`);
    throw error;
  }
}

/**
 * Execute a command with output capture
 * @param {string} command - Command to execute
 * @param {Object} config - Configuration object
 * @returns {Promise<string>} Command output
 */
export async function executeCommandWithOutput(command, config) {
  const theme = getTheme(config.theme);
  
  return new Promise((resolve, reject) => {
    try {
      // Parse command and arguments
      const parts = command.split(' ');
      const cmd = parts[0];
      const args = parts.slice(1);
      
      // Spawn the process
      const child = spawn(cmd, args, {
        stdio: ['inherit', 'pipe', 'pipe'],
        shell: true,
        cwd: process.cwd()
      });
      
      let stdout = '';
      let stderr = '';
      
      // Capture output
      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });
      
      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });
      
      // Handle process completion
      child.on('close', (code) => {
        if (code === 0) {
          resolve(stdout);
        } else {
          reject(new Error(stderr || `Command failed with exit code ${code}`));
        }
      });
      
      child.on('error', (error) => {
        reject(error);
      });
      
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Check if a command exists
 * @param {string} command - Command to check
 * @returns {Promise<boolean>} True if command exists
 */
export async function commandExists(command) {
  try {
    await executeCommandWithOutput(`which ${command}`, {});
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Execute a command safely with validation
 * @param {string} command - Command to execute
 * @param {Object} config - Configuration object
 * @param {boolean} validate - Whether to validate command exists
 * @returns {Promise<void>}
 */
export async function executeCommandSafely(command, config, validate = true) {
  if (validate) {
    const parts = command.split(' ');
    const cmd = parts[0];
    
    if (!(await commandExists(cmd))) {
      logger.error(`Command '${cmd}' not found. Please check your PATH.`);
      return;
    }
  }
  
  await executeCommand(command, config);
}
