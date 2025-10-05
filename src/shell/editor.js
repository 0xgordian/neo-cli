/**
 * File editor and management for neo-cli
 * Handles file operations and inline editing
 */

import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import { getTheme } from '../theme.js';
import { logger } from '../utils/logger.js';
import { executeCommandWithOutput } from './exec.js';

/**
 * Handle file commands
 * @param {Array} args - Command arguments
 * @param {Object} config - Configuration object
 */
export async function handleFileCommand(args, config) {
  const command = args[0];
  const filename = args[1];
  
  switch (command) {
    case 'create':
      await createFile(filename, config);
      break;
    case 'open':
      await openFile(filename, config);
      break;
    case 'edit':
      await editFile(filename, config);
      break;
    case 'delete':
      await deleteFile(filename, config);
      break;
    case 'ls':
      await listDirectory(args[1] || '.', config);
      break;
    case 'cd':
      await changeDirectory(args[1] || process.env.HOME, config);
      break;
    default:
      logger.error(`Unknown file command: ${command}`);
  }
}

/**
 * Create a new file
 * @param {string} filename - Name of file to create
 * @param {Object} config - Configuration object
 */
async function createFile(filename, config) {
  if (!filename) {
    logger.error('Usage: create <filename>');
    return;
  }
  
  const theme = getTheme(config.theme);
  const filepath = path.resolve(filename);
  
  try {
    // Check if file already exists
    if (fs.existsSync(filepath)) {
      logger.warn(`File '${filename}' already exists.`);
      return;
    }
    
    // Create empty file
    fs.writeFileSync(filepath, '');
    logger.success(`File '${filename}' created successfully.`);
    
    // Ask if user wants to edit it
    const answer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'edit',
        message: 'Would you like to edit the file now?',
        default: true
      }
    ]);
    
    if (answer.edit) {
      await editFile(filename, config);
    }
    
  } catch (error) {
    logger.error(`Failed to create file: ${error.message}`);
  }
}

/**
 * Open and display file contents
 * @param {string} filename - Name of file to open
 * @param {Object} config - Configuration object
 */
async function openFile(filename, config) {
  if (!filename) {
    logger.error('Usage: open <filename>');
    return;
  }
  
  const theme = getTheme(config.theme);
  const filepath = path.resolve(filename);
  
  try {
    // Check if file exists
    if (!fs.existsSync(filepath)) {
      logger.error(`File '${filename}' not found.`);
      return;
    }
    
    // Read file contents
    const content = fs.readFileSync(filepath, 'utf8');
    
    console.log();
    console.log(theme.matrix.header(`=== ${filename} ===`));
    console.log();
    
    if (content.trim()) {
      console.log(theme.matrix.output(content));
    } else {
      console.log(theme.matrix.output('(empty file)'));
    }
    
    console.log();
    
  } catch (error) {
    logger.error(`Failed to open file: ${error.message}`);
  }
}

/**
 * Edit a file
 * @param {string} filename - Name of file to edit
 * @param {Object} config - Configuration object
 */
async function editFile(filename, config) {
  if (!filename) {
    logger.error('Usage: edit <filename>');
    return;
  }
  
  const theme = getTheme(config.theme);
  const filepath = path.resolve(filename);
  
  try {
    // Check if file exists
    if (!fs.existsSync(filepath)) {
      logger.error(`File '${filename}' not found.`);
      return;
    }
    
    // Read current content
    const currentContent = fs.readFileSync(filepath, 'utf8');
    
    // Use input prompt for multiline editing (simplified version)
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'content',
        message: `Edit ${filename} (press Enter to save, type 'cancel' to abort):`,
        default: currentContent,
        validate: (input) => {
          if (input === 'cancel') {
            return 'Edit cancelled';
          }
          return true;
        }
      }
    ]);
    
    if (answer.content === 'cancel') {
      logger.info('Edit cancelled.');
      return;
    }
    
    // Save the file
    fs.writeFileSync(filepath, answer.content);
    logger.success(`File '${filename}' saved successfully.`);
    
  } catch (error) {
    logger.error(`Failed to edit file: ${error.message}`);
  }
}

/**
 * Delete a file
 * @param {string} filename - Name of file to delete
 * @param {Object} config - Configuration object
 */
async function deleteFile(filename, config) {
  if (!filename) {
    logger.error('Usage: delete <filename>');
    return;
  }
  
  const theme = getTheme(config.theme);
  const filepath = path.resolve(filename);
  
  try {
    // Check if file exists
    if (!fs.existsSync(filepath)) {
      logger.error(`File '${filename}' not found.`);
      return;
    }
    
    // Ask for confirmation
    const answer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `Are you sure you want to delete '${filename}'?`,
        default: false
      }
    ]);
    
    if (answer.confirm) {
      fs.unlinkSync(filepath);
      logger.success(`File '${filename}' deleted successfully.`);
    } else {
      logger.info('Delete cancelled.');
    }
    
  } catch (error) {
    logger.error(`Failed to delete file: ${error.message}`);
  }
}

/**
 * List directory contents
 * @param {string} dirpath - Directory path
 * @param {Object} config - Configuration object
 */
async function listDirectory(dirpath, config) {
  const theme = getTheme(config.theme);
  const resolvedPath = path.resolve(dirpath);
  
  try {
    // Check if directory exists
    if (!fs.existsSync(resolvedPath)) {
      logger.error(`Directory '${dirpath}' not found.`);
      return;
    }
    
    // Get directory contents
    const items = fs.readdirSync(resolvedPath);
    
    console.log();
    console.log(theme.matrix.header(`=== ${dirpath} ===`));
    console.log();
    
    if (items.length === 0) {
      console.log(theme.matrix.output('(empty directory)'));
    } else {
      items.forEach(item => {
        const itemPath = path.join(resolvedPath, item);
        const stats = fs.statSync(itemPath);
        
        if (stats.isDirectory()) {
          console.log(theme.matrix.output(`📁 ${item}/`));
        } else {
          console.log(theme.matrix.output(`📄 ${item}`));
        }
      });
    }
    
    console.log();
    
  } catch (error) {
    logger.error(`Failed to list directory: ${error.message}`);
  }
}

/**
 * Change directory
 * @param {string} dirpath - Directory path
 * @param {Object} config - Configuration object
 */
async function changeDirectory(dirpath, config) {
  const theme = getTheme(config.theme);
  const resolvedPath = path.resolve(dirpath);
  
  try {
    // Check if directory exists
    if (!fs.existsSync(resolvedPath)) {
      logger.error(`Directory '${dirpath}' not found.`);
      return;
    }
    
    // Check if it's actually a directory
    const stats = fs.statSync(resolvedPath);
    if (!stats.isDirectory()) {
      logger.error(`'${dirpath}' is not a directory.`);
      return;
    }
    
    // Change directory
    process.chdir(resolvedPath);
    logger.success(`Changed directory to: ${resolvedPath}`);
    
  } catch (error) {
    logger.error(`Failed to change directory: ${error.message}`);
  }
}
