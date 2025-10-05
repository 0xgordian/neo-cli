/**
 * REPL (Read-Eval-Print Loop) for neo-cli
 * Interactive shell implementation
 */

import readline from 'readline';
import { loadConfig, saveConfig } from '../config.js';
import { getTheme, getFooter } from '../theme.js';
import { logger } from '../utils/logger.js';
import { executeCommand } from './exec.js';
import { handleFileCommand } from './editor.js';

/**
 * Built-in commands available in the REPL
 */
const BUILTIN_COMMANDS = {
  'help': showHelp,
  'exit': exitREPL,
  'clear': clearScreen,
  'history': showHistory,
  'alias': handleAlias,
  'create': handleFileCommand,
  'open': handleFileCommand,
  'edit': handleFileCommand,
  'delete': handleFileCommand,
  'ls': handleFileCommand,
  'cd': handleFileCommand
};

/**
 * Show help information
 * @param {Array} args - Command arguments
 * @param {Object} config - Configuration object
 */
function showHelp(args, config) {
  const theme = getTheme(config.theme);
  
  console.log();
  console.log(theme.matrix.header('=== NEO-CLI HELP ==='));
  console.log();
  
  console.log(theme.matrix.output('Built-in Commands:'));
  console.log(theme.secondary('  help                    - Show this help message'));
  console.log(theme.secondary('  exit                    - Exit the shell'));
  console.log(theme.secondary('  clear                   - Clear the screen'));
  console.log(theme.secondary('  history                 - Show command history'));
  console.log(theme.secondary('  alias <name> <command>  - Create command alias'));
  console.log();
  
  console.log(theme.matrix.output('File Operations:'));
  console.log(theme.secondary('  create <filename>       - Create new file'));
  console.log(theme.secondary('  open <filename>         - Display file contents'));
  console.log(theme.secondary('  edit <filename>         - Edit file'));
  console.log(theme.secondary('  delete <filename>       - Delete file'));
  console.log(theme.secondary('  ls [path]               - List directory contents'));
  console.log(theme.secondary('  cd [path]               - Change directory'));
  console.log();
  
  console.log(theme.matrix.output('System Commands:'));
  console.log(theme.secondary('  Any system command can be executed directly'));
  console.log(theme.secondary('  Examples: ls, pwd, node script.js, python script.py'));
  console.log();
  
  console.log(theme.matrix.output('Special Commands:'));
  console.log(theme.secondary('  neo-cli <command>       - Run neo-cli commands'));
  console.log(theme.secondary('  Examples: neo-cli status, neo-cli agent, neo-cli hack'));
  console.log();
}

/**
 * Exit the REPL
 * @param {Array} args - Command arguments
 * @param {Object} config - Configuration object
 */
function exitREPL(args, config) {
  console.log();
  logger.info('Exiting shell...');
  console.log(getFooter(config.theme));
  process.exit(0);
}

/**
 * Clear the screen
 * @param {Array} args - Command arguments
 * @param {Object} config - Configuration object
 */
function clearScreen(args, config) {
  process.stdout.write('\x1b[2J\x1b[H');
}

/**
 * Show command history
 * @param {Array} args - Command arguments
 * @param {Object} config - Configuration object
 */
function showHistory(args, config) {
  const theme = getTheme(config.theme);
  const history = config.history || [];
  
  console.log();
  console.log(theme.matrix.header('=== COMMAND HISTORY ==='));
  console.log();
  
  if (history.length === 0) {
    console.log(theme.matrix.output('No commands in history.'));
  } else {
    history.slice(-20).forEach((cmd, index) => {
      console.log(theme.secondary(`${index + 1}. ${cmd}`));
    });
  }
  console.log();
}

/**
 * Handle alias commands
 * @param {Array} args - Command arguments
 * @param {Object} config - Configuration object
 */
function handleAlias(args, config) {
  const theme = getTheme(config.theme);
  
  if (args.length === 0) {
    // Show aliases
    console.log();
    console.log(theme.matrix.header('=== ALIASES ==='));
    console.log();
    
    const aliases = config.aliases || {};
    if (Object.keys(aliases).length === 0) {
      console.log(theme.matrix.output('No aliases defined.'));
    } else {
      Object.entries(aliases).forEach(([name, command]) => {
        console.log(theme.secondary(`${name} -> ${command}`));
      });
    }
    console.log();
  } else if (args.length >= 2) {
    // Create alias
    const name = args[0];
    const command = args.slice(1).join(' ');
    
    if (!config.aliases) {
      config.aliases = {};
    }
    
    config.aliases[name] = command;
    saveConfig(config);
    
    logger.success(`Alias '${name}' created for '${command}'`);
  } else {
    logger.error('Usage: alias <name> <command>');
  }
}

/**
 * Process command input
 * @param {string} input - User input
 * @param {Object} config - Configuration object
 * @param {readline.Interface} rl - Readline interface
 */
async function processInput(input, config, rl) {
  const trimmedInput = input.trim();
  
  if (!trimmedInput) {
    return;
  }
  
  // Add to history
  if (!config.history) {
    config.history = [];
  }
  config.history.push(trimmedInput);
  
  // Keep only last 100 commands
  if (config.history.length > 100) {
    config.history = config.history.slice(-100);
  }
  saveConfig(config);
  
  // Parse command and arguments
  const parts = trimmedInput.split(' ');
  const command = parts[0];
  const args = parts.slice(1);
  
  try {
    // Check for built-in commands
    if (BUILTIN_COMMANDS[command]) {
      await BUILTIN_COMMANDS[command](args, config);
      return;
    }
    
    // Check for aliases
    if (config.aliases && config.aliases[command]) {
      const aliasCommand = config.aliases[command];
      const aliasParts = aliasCommand.split(' ');
      const aliasCmd = aliasParts[0];
      const aliasArgs = aliasParts.slice(1);
      
      if (BUILTIN_COMMANDS[aliasCmd]) {
        await BUILTIN_COMMANDS[aliasCmd](aliasArgs, config);
        return;
      } else {
        // Execute alias as system command
        await executeCommand(aliasCommand, config);
        return;
      }
    }
    
    // Check for neo-cli commands
    if (command === 'neo-cli') {
      // This will be handled by the main command processor
      logger.info('Use neo-cli commands outside the shell or restart the shell.');
      return;
    }
    
    // Execute as system command
    await executeCommand(trimmedInput, config);
    
  } catch (error) {
    logger.error(`Command failed: ${error.message}`);
  }
}

/**
 * Start the REPL
 * @param {Object} config - Configuration object
 */
export async function startREPL(config) {
  const theme = getTheme(config.theme);
  const name = config.name || 'Operator';
  
  // Create readline interface
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: theme.matrix.prompt('NEO> ')
  });
  
  // Show welcome message
  console.log();
  logger.info(`Welcome to the Matrix, ${name}.`);
  logger.info('Type "help" for available commands or "exit" to leave.');
  console.log();
  
  // Set up event handlers
  rl.on('line', async (input) => {
    try {
      await processInput(input, config, rl);
    } catch (error) {
      logger.error(`Error processing command: ${error.message}`);
    }
    rl.prompt();
  });
  
  rl.on('close', () => {
    console.log();
    logger.info('Goodbye, Operator.');
    console.log(getFooter(config.theme));
    process.exit(0);
  });
  
  // Handle Ctrl+C
  process.on('SIGINT', () => {
    console.log();
    logger.info('Use "exit" to leave the shell.');
    rl.prompt();
  });
  
  // Start the REPL
  rl.prompt();
}
