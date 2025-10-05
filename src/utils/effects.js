/**
 * Visual effects and animations for neo-cli
 * Provides various Matrix-themed visual effects
 */

import { styleText, getTheme } from '../theme.js';

/**
 * Create a loading spinner with Matrix theme
 * @param {string} message - Message to display
 * @param {string} theme - Theme name
 * @returns {Object} Spinner object with start/stop methods
 */
export function createMatrixSpinner(message, theme = 'green') {
  const themeObj = getTheme(theme);
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let currentFrame = 0;
  let interval;

  return {
    start() {
      interval = setInterval(() => {
        process.stdout.write(`\r${themeObj.matrix.output(frames[currentFrame])} ${message}`);
        currentFrame = (currentFrame + 1) % frames.length;
      }, 100);
    },
    stop() {
      if (interval) {
        clearInterval(interval);
        process.stdout.write('\r' + ' '.repeat(process.stdout.columns || 80) + '\r');
      }
    }
  };
}

/**
 * Create a progress bar with Matrix styling
 * @param {number} total - Total number of items
 * @param {string} theme - Theme name
 * @returns {Object} Progress bar object
 */
export function createProgressBar(total, theme = 'green') {
  const themeObj = getTheme(theme);
  let current = 0;

  return {
    update(increment = 1) {
      current += increment;
      const percentage = Math.min(100, Math.floor((current / total) * 100));
      const filled = Math.floor((percentage / 100) * 20);
      const bar = '█'.repeat(filled) + '░'.repeat(20 - filled);
      
      process.stdout.write(`\r${themeObj.matrix.output(`[${bar}] ${percentage}%`)}`);
      
      if (current >= total) {
        console.log();
      }
    },
    complete() {
      current = total;
      this.update(0);
    }
  };
}

/**
 * Create a flicker effect
 * @param {string} text - Text to flicker
 * @param {string} theme - Theme name
 * @param {number} duration - Duration in ms
 * @returns {Promise} Promise that resolves when effect completes
 */
export function flickerEffect(text, theme = 'green', duration = 1000) {
  return new Promise((resolve) => {
    const themeObj = getTheme(theme);
    const startTime = Date.now();
    
    const flicker = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;
      
      if (progress < 1) {
        // Random flicker
        if (Math.random() < 0.3) {
          process.stdout.write(`\r${themeObj.matrix.output(text)}`);
        } else {
          process.stdout.write(`\r${' '.repeat(text.length)}`);
        }
        setTimeout(flicker, 50);
      } else {
        // Final stable display
        process.stdout.write(`\r${themeObj.matrix.output(text)}`);
        resolve();
      }
    };
    
    flicker();
  });
}

/**
 * Create a typewriter effect
 * @param {string} text - Text to type
 * @param {string} theme - Theme name
 * @param {number} delay - Delay between characters in ms
 * @returns {Promise} Promise that resolves when typing is complete
 */
export function typewriterEffect(text, theme = 'green', delay = 50) {
  return new Promise((resolve) => {
    const themeObj = getTheme(theme);
    let index = 0;
    
    const type = () => {
      if (index < text.length) {
        process.stdout.write(themeObj.matrix.output(text[index]));
        index++;
        setTimeout(type, delay);
      } else {
        console.log();
        resolve();
      }
    };
    
    type();
  });
}

/**
 * Create a glitch effect
 * @param {string} text - Text to glitch
 * @param {string} theme - Theme name
 * @param {number} iterations - Number of glitch iterations
 * @returns {Promise} Promise that resolves when effect completes
 */
export function glitchEffect(text, theme = 'green', iterations = 10) {
  return new Promise((resolve) => {
    const themeObj = getTheme(theme);
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let iteration = 0;
    
    const glitch = () => {
      if (iteration < iterations) {
        const glitched = text.split('').map(char => 
          Math.random() < 0.3 ? chars[Math.floor(Math.random() * chars.length)] : char
        ).join('');
        process.stdout.write(`\r${themeObj.matrix.output(glitched)}`);
        iteration++;
        setTimeout(glitch, 100);
      } else {
        process.stdout.write(`\r${themeObj.matrix.output(text)}`);
        resolve();
      }
    };
    
    glitch();
  });
}

/**
 * Create a boot sequence animation
 * @param {Array} messages - Array of boot messages
 * @param {string} theme - Theme name
 * @param {number} delay - Delay between messages in ms
 * @returns {Promise} Promise that resolves when animation completes
 */
export function bootSequence(messages, theme = 'green', delay = 800) {
  return new Promise(async (resolve) => {
    const themeObj = getTheme(theme);
    
    for (const message of messages) {
      await typewriterEffect(message, theme, 30);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    resolve();
  });
}

/**
 * Create a matrix-style loading animation
 * @param {string} message - Message to display
 * @param {string} theme - Theme name
 * @param {number} duration - Duration in ms
 * @returns {Promise} Promise that resolves when animation completes
 */
export function matrixLoading(message, theme = 'green', duration = 3000) {
  return new Promise((resolve) => {
    const themeObj = getTheme(theme);
    const chars = '01';
    let frame = 0;
    const maxFrames = Math.floor(duration / 100);
    
    const animate = () => {
      process.stdout.write('\r');
      const loadingText = message + ' ' + chars[frame % 2].repeat(3);
      process.stdout.write(themeObj.matrix.output(loadingText));
      
      frame++;
      if (frame < maxFrames) {
        setTimeout(animate, 100);
      } else {
        console.log();
        resolve();
      }
    };
    
    animate();
  });
}

/**
 * Create a digital rain effect in a small area
 * @param {number} width - Width of the rain area
 * @param {number} height - Height of the rain area
 * @param {string} theme - Theme name
 * @param {number} duration - Duration in ms
 * @returns {Promise} Promise that resolves when effect completes
 */
export function digitalRain(width, height, theme = 'green', duration = 2000) {
  return new Promise((resolve) => {
    const themeObj = getTheme(theme);
    const chars = '01';
    const drops = Array(width).fill(0);
    let frame = 0;
    const maxFrames = Math.floor(duration / 100);
    
    const animate = () => {
      // Move cursor to start position
      process.stdout.write('\x1b[s'); // Save cursor position
      
      for (let i = 0; i < height; i++) {
        process.stdout.write('\x1b[1A'); // Move up
        process.stdout.write('\r');
        
        let line = '';
        for (let j = 0; j < width; j++) {
          if (drops[j] === i) {
            line += themeObj.matrix.output(chars[Math.floor(Math.random() * chars.length)]);
            drops[j] = Math.floor(Math.random() * height);
          } else {
            line += ' ';
          }
        }
        process.stdout.write(line);
        console.log();
      }
      
      frame++;
      if (frame < maxFrames) {
        setTimeout(animate, 100);
      } else {
        process.stdout.write('\x1b[u'); // Restore cursor position
        resolve();
      }
    };
    
    animate();
  });
}
