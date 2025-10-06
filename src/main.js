/**
 * Main entry point for neo-cli
 * Handles command routing and application initialization
 */

import { loadConfig } from './config.js';
import { getFooter } from './theme.js';
import { logger } from './utils/logger.js';
import { loadAllPlugins } from './plugin.js';

// Import commands
import { startCommand } from './commands/start.js';
import { runSetup } from './commands/setup.js';
import { themeCommand } from './commands/theme.js';
import { resetCommand } from './commands/reset.js';
import { statusCommand } from './commands/status.js';
import { agentCommand } from './commands/agent.js';
import { hackCommand } from './commands/hack.js';
import { prophecyCommand } from './commands/prophecy.js';
import { exitCommand } from './commands/exit.js';
import { matrixCommand } from './commands/matrix.js';

/**
 * Command registry
 */
const COMMANDS = {
  'start': startCommand,
  'setup': runSetup,
  'theme': themeCommand,
  'reset': resetCommand,
  'status': statusCommand,
  'agent': agentCommand,
  'hack': hackCommand,
  'prophecy': prophecyCommand,
  'exit': exitCommand,
  'matrix': matrixCommand
};

/**
 * Show help information
 * @param {string} theme - Theme name
 */
async function showHelp(theme = 'green') {
  const { getTheme } = await import('./theme.js');
  const themeObj = getTheme(theme);
  
  console.log();
  console.log(themeObj.matrix.header('=== NEO-CLI HELP ==='));
  console.log();
  
  console.log(themeObj.matrix.output('Available Commands:'));
  console.log(themeObj.secondary('  neo-cli start          - Boot the system and enter interactive shell'));
  console.log(themeObj.secondary('  neo-cli setup          - Run initial setup'));
  console.log(themeObj.secondary('  neo-cli theme          - Switch between red/green pill themes'));
  console.log(themeObj.secondary('  neo-cli reset          - Reset configuration to defaults'));
  console.log(themeObj.secondary('  neo-cli status         - Show system status'));
  console.log(themeObj.secondary('  neo-cli agent          - Generate Matrix agent codename'));
  console.log(themeObj.secondary('  neo-cli hack           - Run fake hacking sequence'));
  console.log(themeObj.secondary('  neo-cli prophecy       - Display random Matrix quote'));
  console.log(themeObj.secondary('  neo-cli matrix         - Show infinite Matrix rain'));
  console.log(themeObj.secondary('  neo-cli exit           - Graceful shutdown'));
  console.log();
  
  console.log(themeObj.matrix.output('Interactive Shell Commands:'));
  console.log(themeObj.secondary('  help                   - Show help'));
  console.log(themeObj.secondary('  create <file>          - Create new file'));
  console.log(themeObj.secondary('  open <file>            - Display file contents'));
  console.log(themeObj.secondary('  edit <file>            - Edit file'));
  console.log(themeObj.secondary('  delete <file>          - Delete file'));
  console.log(themeObj.secondary('  ls [path]              - List directory'));
  console.log(themeObj.secondary('  cd [path]              - Change directory'));
  console.log(themeObj.secondary('  alias <name> <cmd>     - Create command alias'));
  console.log(themeObj.secondary('  history                - Show command history'));
  console.log();
  
  console.log(themeObj.matrix.output('Examples:'));
  console.log(themeObj.secondary('  neo-cli start          - Start the interactive shell'));
  console.log(themeObj.secondary('  neo-cli theme set red  - Switch to red pill theme'));
  console.log(themeObj.secondary('  neo-cli agent          - Get your Matrix codename'));
  console.log();
  
  console.log(themeObj.matrix.output('Security Note:'));
  console.log(themeObj.warning('  Commands executed in the shell run in your environment.'));
  console.log(themeObj.warning('  Be cautious when running unknown commands.'));
  console.log();
}

/**
 * Show version information
 * @param {string} theme - Theme name
 */
async function showVersion(theme = 'green') {
  const { getTheme } = await import('./theme.js');
  const themeObj = getTheme(theme);
  
  console.log();
  console.log(themeObj.matrix.header('neo-cli v1.0.0'));
  console.log(themeObj.matrix.header('built by 0xgordian'));
  console.log();
  console.log(themeObj.matrix.output('A Matrix-inspired interactive shell for developers'));
  console.log();
}

/**
 * Main application entry point
 * @param {Array} args - Command line arguments
 */
export async function main(args) {
  try {
    // Load configuration
    const config = loadConfig();
    const theme = config.theme || 'green';
    
    // Set logger theme
    logger.setTheme(theme);
    
    // Load plugins
    await loadAllPlugins();
    
    // Parse command line arguments
    if (args.length === 0) {
      // No arguments, show help
      await showHelp(theme);
      console.log(getFooter(theme));
      return;
    }
    
    const command = args[0];
    const commandArgs = args.slice(1);
    
    // Handle special commands
    if (command === 'help' || command === '--help' || command === '-h') {
      await showHelp(theme);
      console.log(getFooter(theme));
      return;
    }
    
    if (command === 'version' || command === '--version' || command === '-v') {
      await showVersion(theme);
      console.log(getFooter(theme));
      return;
    }
    
    // Check if command exists
    if (!COMMANDS[command]) {
      logger.error(`Unknown command: ${command}`);
      logger.info('Run "neo-cli help" to see available commands');
      console.log(getFooter(theme));
      process.exit(1);
    }
    
    // Execute command
    await COMMANDS[command](commandArgs);
    
  } catch (error) {
    logger.error(`Application error: ${error.message}`);
    console.log(getFooter('green'));
    process.exit(1);
  }
}
// Commit 1 - Development progress
// Commit 2 - Development progress
// Commit 3 - Development progress
// Commit 4 - Development progress
// Commit 5 - Development progress
// Commit 6 - Development progress
// Commit 7 - Development progress
// Commit 8 - Development progress
// Commit 9 - Development progress
// Commit 10 - Development progress
// Commit 11 - Development progress
// Commit 12 - Development progress
// Commit 13 - Development progress
// Commit 14 - Development progress
// Commit 15 - Development progress
// Commit 16 - Development progress
// Commit 17 - Development progress
// Commit 18 - Development progress
// Commit 19 - Development progress
// Commit 20 - Development progress
// Commit 21 - Development progress
// Commit 22 - Development progress
// Commit 23 - Development progress
// Commit 24 - Development progress
// Commit 25 - Development progress
// Commit 26 - Development progress
// Commit 27 - Development progress
// Commit 28 - Development progress
// Commit 29 - Development progress
// Commit 30 - Development progress
// Commit 31 - Development progress
// Commit 32 - Development progress
// Commit 33 - Development progress
// Commit 34 - Development progress
// Commit 35 - Development progress
// Commit 36 - Development progress
// Commit 37 - Development progress
// Commit 38 - Development progress
// Commit 39 - Development progress
// Commit 40 - Development progress
// Commit 41 - Development progress
// Commit 42 - Development progress
// Commit 43 - Development progress
// Commit 44 - Development progress
// Commit 45 - Development progress
// Commit 46 - Development progress
// Commit 47 - Development progress
// Commit 48 - Development progress
// Commit 49 - Development progress
// Commit 50 - Development progress
