const mineflayer = require('mineflayer');

// Configuration for the bot
const bot = mineflayer.createBot({
  host: 'blockbande.net', // replace with your server's address
  port: 25565, // default Minecraft port
  username: 'Momad123', // replace with your bot's username
  password: 'yourpassword', // optional, only if required
  version: '1.21.4', // replace with the server's version
});

bot.once('spawn', () => {
  console.log('✅ Bot has joined the server and is now AFK.');

  // Send /home 1 after 5 seconds
  setTimeout(() => {
    bot.chat('/home 1');
    console.log('📩 Sent /home 1');
  }, 5000);

  // Every minute: look around + jump
  setInterval(() => {
    // Look in a random direction
    bot.look(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);

    // Small jump
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 500);

    console.log('🤸 Bot looked around and jumped (anti-AFK)');
  }, 60000); // every 60 seconds
});

// Handle disconnection
bot.on('end', () => {
  console.log('❌ Bot has been disconnected.');
});
