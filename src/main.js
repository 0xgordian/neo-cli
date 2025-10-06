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
// Commit 51 - Development progress
// Commit 52 - Development progress
// Commit 53 - Development progress
// Commit 54 - Development progress
// Commit 55 - Development progress
// Commit 56 - Development progress
// Commit 57 - Development progress
// Commit 58 - Development progress
// Commit 59 - Development progress
// Commit 60 - Development progress
// Commit 61 - Development progress
// Commit 62 - Development progress
// Commit 63 - Development progress
// Commit 64 - Development progress
// Commit 65 - Development progress
// Commit 66 - Development progress
// Commit 67 - Development progress
// Commit 68 - Development progress
// Commit 69 - Development progress
// Commit 70 - Development progress
// Commit 71 - Development progress
// Commit 72 - Development progress
// Commit 73 - Development progress
// Commit 74 - Development progress
// Commit 75 - Development progress
// Commit 76 - Development progress
// Commit 77 - Development progress
// Commit 78 - Development progress
// Commit 79 - Development progress
// Commit 80 - Development progress
// Commit 81 - Development progress
// Commit 82 - Development progress
// Commit 83 - Development progress
// Commit 84 - Development progress
// Commit 85 - Development progress
// Commit 86 - Development progress
// Commit 87 - Development progress
// Commit 88 - Development progress
// Commit 89 - Development progress
// Commit 90 - Development progress
// Commit 91 - Development progress
// Commit 92 - Development progress
// Commit 93 - Development progress
// Commit 94 - Development progress
// Commit 95 - Development progress
// Commit 96 - Development progress
// Commit 97 - Development progress
// Commit 98 - Development progress
// Commit 99 - Development progress
// Commit 100 - Development progress
// Commit 101 - Development progress
// Commit 102 - Development progress
// Commit 103 - Development progress
// Commit 104 - Development progress
// Commit 105 - Development progress
// Commit 106 - Development progress
// Commit 107 - Development progress
// Commit 108 - Development progress
// Commit 109 - Development progress
// Commit 110 - Development progress
// Commit 111 - Development progress
// Commit 112 - Development progress
// Commit 113 - Development progress
// Commit 114 - Development progress
// Commit 115 - Development progress
// Commit 116 - Development progress
// Commit 117 - Development progress
// Commit 118 - Development progress
// Commit 119 - Development progress
// Commit 120 - Development progress
// Commit 121 - Development progress
// Commit 122 - Development progress
// Commit 123 - Development progress
// Commit 124 - Development progress
// Commit 125 - Development progress
// Commit 126 - Development progress
// Commit 127 - Development progress
// Commit 128 - Development progress
// Commit 129 - Development progress
// Commit 130 - Development progress
// Commit 131 - Development progress
// Commit 132 - Development progress
// Commit 133 - Development progress
// Commit 134 - Development progress
// Commit 135 - Development progress
// Commit 136 - Development progress
// Commit 137 - Development progress
// Commit 138 - Development progress
// Commit 139 - Development progress
// Commit 140 - Development progress
// Commit 141 - Development progress
// Commit 142 - Development progress
// Commit 143 - Development progress
// Commit 144 - Development progress
// Commit 145 - Development progress
// Commit 146 - Development progress
// Commit 147 - Development progress
// Commit 148 - Development progress
// Commit 149 - Development progress
// Commit 150 - Development progress
// Commit 151 - Development progress
// Commit 152 - Development progress
// Commit 153 - Development progress
// Commit 154 - Development progress
// Commit 155 - Development progress
// Commit 156 - Development progress
// Commit 157 - Development progress
// Commit 158 - Development progress
// Commit 159 - Development progress
// Commit 160 - Development progress
// Commit 161 - Development progress
// Commit 162 - Development progress
// Commit 163 - Development progress
// Commit 164 - Development progress
// Commit 165 - Development progress
// Commit 166 - Development progress
// Commit 167 - Development progress
// Commit 168 - Development progress
// Commit 169 - Development progress
// Commit 170 - Development progress
// Commit 171 - Development progress
// Commit 172 - Development progress
// Commit 173 - Development progress
// Commit 174 - Development progress
// Commit 175 - Development progress
// Commit 176 - Development progress
// Commit 177 - Development progress
// Commit 178 - Development progress
// Commit 179 - Development progress
// Commit 180 - Development progress
// Commit 181 - Development progress
// Commit 182 - Development progress
// Commit 183 - Development progress
// Commit 184 - Development progress
// Commit 185 - Development progress
// Commit 186 - Development progress
// Commit 187 - Development progress
// Commit 188 - Development progress
// Commit 189 - Development progress
// Commit 190 - Development progress
// Commit 191 - Development progress
// Commit 192 - Development progress
// Commit 193 - Development progress
// Commit 194 - Development progress
// Commit 195 - Development progress
// Commit 196 - Development progress
// Commit 197 - Development progress
// Commit 198 - Development progress
// Commit 199 - Development progress
// Commit 200 - Development progress
// Commit 201 - Development progress
// Commit 202 - Development progress
// Commit 203 - Development progress
// Commit 204 - Development progress
// Commit 205 - Development progress
// Commit 206 - Development progress
// Commit 207 - Development progress
// Commit 208 - Development progress
// Commit 209 - Development progress
// Commit 210 - Development progress
// Commit 211 - Development progress
// Commit 212 - Development progress
// Commit 213 - Development progress
// Commit 214 - Development progress
// Commit 215 - Development progress
// Commit 216 - Development progress
// Commit 217 - Development progress
// Commit 218 - Development progress
// Commit 219 - Development progress
// Commit 220 - Development progress
// Commit 221 - Development progress
// Commit 222 - Development progress
// Commit 223 - Development progress
// Commit 224 - Development progress
// Commit 225 - Development progress
// Commit 226 - Development progress
// Commit 227 - Development progress
// Commit 228 - Development progress
// Commit 229 - Development progress
// Commit 230 - Development progress
// Commit 231 - Development progress
// Commit 232 - Development progress
// Commit 233 - Development progress
// Commit 234 - Development progress
// Commit 235 - Development progress
// Commit 236 - Development progress
// Commit 237 - Development progress
// Commit 238 - Development progress
// Commit 239 - Development progress
// Commit 240 - Development progress
// Commit 241 - Development progress
// Commit 242 - Development progress
// Commit 243 - Development progress
// Commit 244 - Development progress
// Commit 245 - Development progress
// Commit 246 - Development progress
// Commit 247 - Development progress
// Commit 248 - Development progress
// Commit 249 - Development progress
// Commit 250 - Development progress
// Commit 251 - Development progress
// Commit 252 - Development progress
// Commit 253 - Development progress
// Commit 254 - Development progress
// Commit 255 - Development progress
// Commit 256 - Development progress
// Commit 257 - Development progress
// Commit 258 - Development progress
// Commit 259 - Development progress
// Commit 260 - Development progress
// Commit 261 - Development progress
// Commit 262 - Development progress
// Commit 263 - Development progress
// Commit 264 - Development progress
// Commit 265 - Development progress
// Commit 266 - Development progress
// Commit 267 - Development progress
// Commit 268 - Development progress
// Commit 269 - Development progress
// Commit 270 - Development progress
// Commit 271 - Development progress
// Commit 272 - Development progress
// Commit 273 - Development progress
// Commit 274 - Development progress
// Commit 275 - Development progress
// Commit 276 - Development progress
// Commit 277 - Development progress
// Commit 278 - Development progress
// Commit 279 - Development progress
// Commit 280 - Development progress
// Commit 281 - Development progress
// Commit 282 - Development progress
// Commit 283 - Development progress
// Commit 284 - Development progress
// Commit 285 - Development progress
// Commit 286 - Development progress
// Commit 287 - Development progress
// Commit 288 - Development progress
// Commit 289 - Development progress
// Commit 290 - Development progress
// Commit 291 - Development progress
// Commit 292 - Development progress
// Commit 293 - Development progress
// Commit 294 - Development progress
// Commit 295 - Development progress
// Commit 296 - Development progress
// Commit 297 - Development progress
// Commit 298 - Development progress
// Commit 299 - Development progress
// Commit 300 - Development progress
// Commit 301 - Development progress
// Commit 302 - Development progress
// Commit 303 - Development progress
// Commit 304 - Development progress
// Commit 305 - Development progress
// Commit 306 - Development progress
// Commit 307 - Development progress
// Commit 308 - Development progress
// Commit 309 - Development progress
// Commit 310 - Development progress
// Commit 311 - Development progress
// Commit 312 - Development progress
// Commit 313 - Development progress
// Commit 314 - Development progress
// Commit 315 - Development progress
// Commit 316 - Development progress
