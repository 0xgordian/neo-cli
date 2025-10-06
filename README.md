
## NEO CLI TOOL
a Matrix-inspired interactive shell for developers.

## Installation

```bash
npm install -g neo-cli
```

## Quick Start

```bash
neo-cli setup
neo-cli start
```

## Features

- **Matrix-themed Interface**: Green and red pill themes with ASCII art and animations
- **Interactive Shell**: Full REPL with command history and aliases
- **File Management**: Create, edit, open, and delete files with inline editor
- **System Integration**: Execute system commands directly from the shell
- **Plugin System**: Extensible architecture for custom commands
- **Theatrical Effects**: Matrix rain, typewriter effects, and glitch animations
- **Configuration**: Persistent user preferences and theme settings

## Commands

### Core Commands

| Command | Description |
|---------|-------------|
| `neo-cli start` | Boot the system and enter interactive shell |
| `neo-cli setup` | Run initial setup (name + theme) |
| `neo-cli theme` | Switch between red/green pill themes |
| `neo-cli reset` | Reset configuration to defaults |
| `neo-cli status` | Show fake system status |
| `neo-cli agent` | Generate Matrix agent codename |
| `neo-cli hack` | Run fake hacking sequence |
| `neo-cli prophecy` | Display random Matrix quote |
| `neo-cli matrix` | Show infinite Matrix rain |
| `neo-cli exit` | Graceful shutdown |

### Interactive Shell Commands

| Command | Description |
|---------|-------------|
| `help` | Show help information |
| `create <file>` | Create new file |
| `open <file>` | Display file contents |
| `edit <file>` | Edit file with inline editor |
| `delete <file>` | Delete file (with confirmation) |
| `ls [path]` | List directory contents |
| `cd [path]` | Change directory |
| `alias <name> <cmd>` | Create command alias |
| `history` | Show command history |
| `clear` | Clear the screen |
| `exit` | Exit the shell |

## Usage Examples

### Basic Setup
```bash
# First time setup
neo-cli setup
# Follow prompts to set name and theme

# Start the interactive shell
neo-cli start
```

### Theme Management
```bash
# Switch theme interactively
neo-cli theme

# Set theme directly
neo-cli theme set red

# List available themes
neo-cli theme list
```

### Interactive Shell
```bash
# Start the shell
neo-cli start

# In the shell:
NEO> create myfile.txt
NEO> edit myfile.txt
NEO> ls
NEO> node script.js
NEO> alias ll "ls -la"
NEO> ll
NEO> exit
```

### Special Effects
```bash
# Show Matrix rain animation
neo-cli matrix

# Run fake hack sequence
neo-cli hack

# Get random Matrix quote
neo-cli prophecy

# Generate agent codename
neo-cli agent
```

## Configuration

Configuration is stored in `~/.neo-cli/config.json`:

```json
{
  "name": "Your Name",
  "theme": "green",
  "plugins": [],
  "aliases": {},
  "history": [],
  "lastUpdateCheck": null,
  "verbose": false
}
```

## Plugin Development

Create plugins in `~/.neo-cli/plugins/`:

```javascript
// ~/.neo-cli/plugins/myplugin.js
export default function(api) {
  // Register a command
  api.registerCommand('hello', (args, config) => {
    api.log(`Hello, ${config.name}!`);
  }, 'Say hello');
  
  // Register a hook
  api.registerHook('startup', (data, config) => {
    api.log('Plugin loaded!');
  });
}
```

### Plugin API

- `api.registerCommand(name, handler, description)` - Register a command
- `api.registerHook(name, handler)` - Register a hook
- `api.getConfig(key, defaultValue)` - Get configuration value
- `api.setConfig(key, value)` - Set configuration value
- `api.log(message, level)` - Log a message

## Security Note

**Important**: Commands executed in the neo-cli shell run in your system environment. This includes:

- System commands (ls, cd, node, python, etc.)
- File operations (create, edit, delete)
- Plugin commands

Be cautious when:
- Running unknown commands
- Installing plugins from untrusted sources
- Editing system files

## Development

### Project Structure

```
neo-cli/
├── bin/
│   └── index.js         # CLI entry point
├── src/
│   ├── main.js          # Core startup + command routing
│   ├── config.js        # Configuration management
│   ├── theme.js         # Theme management
│   ├── commands/        # Command implementations
│   ├── shell/           # Interactive shell components
│   ├── utils/           # Utilities and effects
│   ├── plugin.js        # Plugin system
│   └── systemInfo.js    # System information
├── package.json
├── README.md
└── LICENSE
```

### Building from Source

```bash
git clone https://github.com/0xgordian/neo-cli.git
cd neo-cli
npm install
npm link
```

### Testing

```bash
# Test locally
npm link
neo-cli start

# Test specific commands
neo-cli setup
neo-cli theme
neo-cli status
```

## Requirements

- Node.js 16.0.0 or higher
- npm or yarn package manager

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

- Issues: [GitHub Issues](https://github.com/0xgordian/neo-cli/issues)
- Documentation: [GitHub Wiki](https://github.com/0xgordian/neo-cli/wiki)

---

```
>>> built by 0xgordian
```
