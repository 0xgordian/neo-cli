/**
 * Matrix quotes and prophecies
 * Collection of memorable quotes from The Matrix universe
 */

const QUOTES = [
  // Morpheus quotes
  "What is real? How do you define 'real'?",
  "The Matrix is everywhere. It is all around us.",
  "There is no spoon.",
  "Welcome to the real world.",
  "I can only show you the door. You're the one that has to walk through it.",
  "The Matrix is a system, Neo. That system is our enemy.",
  "You take the blue pill, the story ends. You wake up in your bed and believe whatever you want to believe.",
  "You take the red pill, you stay in Wonderland, and I show you how deep the rabbit hole goes.",
  "Free your mind.",
  "There is a difference between knowing the path and walking the path.",
  
  // Neo quotes
  "I know kung fu.",
  "I'm going to hang up this phone, and then I'm going to show these people what you don't want them to see.",
  "I'm not the one.",
  "I can see the code.",
  "I'm going to show them a world without you.",
  
  // Agent Smith quotes
  "Mr. Anderson... welcome back. We missed you.",
  "You hear that, Mr. Anderson? That is the sound of inevitability.",
  "Human beings are a disease, a cancer of this planet.",
  "I hate this place. This zoo. This prison. This reality, whatever you want to call it.",
  "The Matrix is older than you know.",
  
  // Oracle quotes
  "Don't worry about the vase.",
  "What's really going to bake your noodle later on is, would you still have broken it if I hadn't said anything?",
  "You already know what I'm going to tell you.",
  "Being the One is just like being in love. No one can tell you you're in love, you just know it.",
  
  // Other memorable quotes
  "There is no spoon.",
  "The body cannot live without the mind.",
  "The Matrix has you.",
  "Follow the white rabbit.",
  "There is no escaping reason, no denying purpose.",
  "Everything that has a beginning has an end.",
  "The difference between knowing the path and walking the path.",
  "Ignorance is bliss.",
  "The Matrix is a computer-generated dream world.",
  "Reality is that which, when you stop believing in it, doesn't go away.",
  
  // Deep philosophical quotes
  "What is the Matrix? Control.",
  "The Matrix is a system, Neo. That system is our enemy.",
  "You have to understand, most of these people are not ready to be unplugged.",
  "The Matrix is everywhere. It is all around us. Even now, in this very room.",
  "You can see it when you look out your window or when you turn on your television.",
  "You can feel it when you go to work... when you go to church... when you pay your taxes.",
  "It is the world that has been pulled over your eyes to blind you from the truth.",
  "That you are a slave, Neo. Like everyone else you were born into bondage.",
  "Born into a prison that you cannot smell or taste or touch. A prison for your mind.",
  "Unfortunately, no one can be told what the Matrix is. You have to see it for yourself."
];

const AGENT_NAMES = [
  'Agent Smith',
  'Agent Brown',
  'Agent Jones',
  'Agent Thompson',
  'Agent Wilson',
  'Agent Davis',
  'Agent Miller',
  'Agent Garcia',
  'Agent Rodriguez',
  'Agent Martinez',
  'Agent Anderson',
  'Agent Taylor',
  'Agent Thomas',
  'Agent Jackson',
  'Agent White',
  'Agent Harris',
  'Agent Martin',
  'Agent Thompson',
  'Agent Garcia',
  'Agent Martinez',
  'Agent Robinson',
  'Agent Clark',
  'Agent Rodriguez',
  'Agent Lewis',
  'Agent Lee',
  'Agent Walker',
  'Agent Hall',
  'Agent Allen',
  'Agent Young',
  'Agent King',
  'Agent Wright',
  'Agent Lopez',
  'Agent Hill',
  'Agent Scott',
  'Agent Green',
  'Agent Adams',
  'Agent Baker',
  'Agent Gonzalez',
  'Agent Nelson',
  'Agent Carter',
  'Agent Mitchell',
  'Agent Perez',
  'Agent Roberts',
  'Agent Turner',
  'Agent Phillips',
  'Agent Campbell',
  'Agent Parker',
  'Agent Evans',
  'Agent Edwards',
  'Agent Collins'
];

const SYSTEM_MESSAGES = [
  '[ OK ] Connected to Zion Mainframe',
  '[ INFO ] Syncing digital consciousness...',
  '[ WARN ] Agent detected nearby',
  '[ OK ] Neural pathways established',
  '[ INFO ] Matrix protocols loaded',
  '[ OK ] System initialization complete',
  '[ INFO ] Quantum encryption active',
  '[ WARN ] Firewall breach detected',
  '[ OK ] Data streams synchronized',
  '[ INFO ] Virtual reality matrix online',
  '[ OK ] User authentication successful',
  '[ INFO ] Loading simulation parameters...',
  '[ WARN ] Unauthorized access attempt',
  '[ OK ] Connection to Zion established',
  '[ INFO ] Digital consciousness uploaded',
  '[ OK ] Matrix simulation running',
  '[ INFO ] Reality parameters calibrated',
  '[ WARN ] System overload detected',
  '[ OK ] Backup systems activated',
  '[ INFO ] Quantum tunnel established'
];

/**
 * Get a random Matrix quote
 * @returns {string} Random quote
 */
export function getRandomQuote() {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}

/**
 * Get a random agent name
 * @returns {string} Random agent name
 */
export function getRandomAgentName() {
  return AGENT_NAMES[Math.floor(Math.random() * AGENT_NAMES.length)];
}

/**
 * Get a random system message
 * @returns {string} Random system message
 */
export function getRandomSystemMessage() {
  return SYSTEM_MESSAGES[Math.floor(Math.random() * SYSTEM_MESSAGES.length)];
}

/**
 * Get all quotes
 * @returns {Array} Array of all quotes
 */
export function getAllQuotes() {
  return [...QUOTES];
}

/**
 * Get all agent names
 * @returns {Array} Array of all agent names
 */
export function getAllAgentNames() {
  return [...AGENT_NAMES];
}

/**
 * Get all system messages
 * @returns {Array} Array of all system messages
 */
export function getAllSystemMessages() {
  return [...SYSTEM_MESSAGES];
}
