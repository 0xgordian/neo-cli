/**
 * Matrix rain animation utility
 * Creates falling character rain effect
 */

import { getRainChars, getRainColor } from '../theme.js';

/**
 * Generate a single column of falling characters
 * @param {number} height - Height of the column
 * @param {number} width - Width of the terminal
 * @param {string} theme - Theme name
 * @returns {Array} Array of character positions
 */
function generateColumn(height, width, theme = 'green') {
  const chars = getRainChars(theme);
  const column = [];
  const columnWidth = Math.floor(Math.random() * 3) + 1; // 1-3 characters wide
  const startX = Math.floor(Math.random() * (width - columnWidth));
  
  for (let i = 0; i < height; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    column.push({
      x: startX + Math.floor(Math.random() * columnWidth),
      y: i,
      char: char,
      intensity: Math.random()
    });
  }
  
  return column;
}

/**
 * Create Matrix rain animation
 * @param {number} duration - Duration in milliseconds (0 for infinite)
 * @param {string} theme - Theme name
 * @returns {Promise} Promise that resolves when animation completes
 */
export function createMatrixRain(duration = 3000, theme = 'green') {
  return new Promise((resolve) => {
    const rainColor = getRainColor(theme);
    const columns = [];
    const terminalWidth = process.stdout.columns || 80;
    const terminalHeight = process.stdout.rows || 24;
    
    // Generate initial columns
    for (let i = 0; i < Math.floor(terminalWidth / 4); i++) {
      columns.push(generateColumn(terminalHeight, terminalWidth, theme));
    }
    
    let frameCount = 0;
    const maxFrames = duration > 0 ? Math.floor(duration / 100) : Infinity;
    
    const animate = () => {
      // Clear screen
      process.stdout.write('\x1b[2J\x1b[H');
      
      // Draw rain
      const output = [];
      for (let y = 0; y < terminalHeight; y++) {
        output[y] = new Array(terminalWidth).fill(' ');
      }
      
      columns.forEach((column, colIndex) => {
        column.forEach((drop) => {
          const y = (drop.y + frameCount) % terminalHeight;
          if (y >= 0 && y < terminalHeight && drop.x < terminalWidth) {
            const intensity = Math.max(0, 1 - (frameCount - drop.y) / terminalHeight);
            if (intensity > 0.1) {
              const char = intensity > 0.7 ? drop.char : 
                          intensity > 0.4 ? drop.char.toLowerCase() : '·';
              output[y][drop.x] = char;
            }
          }
        });
      });
      
      // Print the frame
      output.forEach((line, y) => {
        const lineStr = line.join('');
        if (lineStr.trim()) {
          process.stdout.write(rainColor(lineStr) + '\n');
        }
      });
      
      frameCount++;
      
      if (frameCount < maxFrames) {
        setTimeout(animate, 100);
      } else {
        // Clear screen and resolve
        process.stdout.write('\x1b[2J\x1b[H');
        resolve();
      }
    };
    
    // Start animation
    animate();
  });
}

/**
 * Create a simple falling text effect
 * @param {string} text - Text to animate
 * @param {string} theme - Theme name
 * @param {number} speed - Animation speed in ms
 * @returns {Promise} Promise that resolves when animation completes
 */
export function fallingText(text, theme = 'green', speed = 50) {
  return new Promise((resolve) => {
    const rainColor = getRainColor(theme);
    const chars = text.split('');
    let position = 0;
    
    const animate = () => {
      process.stdout.write('\x1b[2J\x1b[H');
      
      // Create falling effect
      for (let i = 0; i < chars.length; i++) {
        const y = (i + position) % 20;
        const x = 10 + i;
        process.stdout.write(`\x1b[${y};${x}H${rainColor(chars[i])}`);
      }
      
      position++;
      
      if (position < 20) {
        setTimeout(animate, speed);
      } else {
        resolve();
      }
    };
    
    animate();
  });
}

/**
 * Create a glitch effect on text
 * @param {string} text - Text to glitch
 * @param {string} theme - Theme name
 * @param {number} iterations - Number of glitch iterations
 * @returns {Promise} Promise that resolves when effect completes
 */
export function glitchText(text, theme = 'green', iterations = 10) {
  return new Promise((resolve) => {
    const rainColor = getRainColor(theme);
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let iteration = 0;
    
    const glitch = () => {
      process.stdout.write('\r');
      
      if (iteration < iterations) {
        // Show glitched version
        const glitched = text.split('').map(char => 
          Math.random() < 0.3 ? chars[Math.floor(Math.random() * chars.length)] : char
        ).join('');
        process.stdout.write(rainColor(glitched));
        iteration++;
        setTimeout(glitch, 50);
      } else {
        // Show final text
        process.stdout.write(rainColor(text));
        resolve();
      }
    };
    
    glitch();
  });
}
