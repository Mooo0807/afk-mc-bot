const mineflayer = require('mineflayer');
const express = require('express');

// === Create bot ===
const bot = mineflayer.createBot({
  host: 'blockbande.net',
  port: 25565,
  username: 'flexyog1234@gmail.com', // Replace with your Java Edition email
  auth: 'microsoft' // or 'mojang' if you're using an old Mojang account
});

// === On bot spawn ===
bot.once('spawn', () => {
  console.log('✅ Bot connected and spawned.');

  // Wait 15 seconds, then teleport to /home 1
  setTimeout(() => {
    bot.chat('/home 1');
    console.log('🏠 Sent /home 1 command');
  }, 15000);

  // Anti-AFK: look around every 10 seconds
  setInterval(() => {
    const yaw = Math.random() * 2 * Math.PI;
    const pitch = (Math.random() - 0.5) * Math.PI;
    bot.look(yaw, pitch, true);
    console.log('🔄 Looking around to avoid AFK kick');
  }, 10000);
});

// === On bot disconnect ===
bot.on('end', () => {
  console.log('❌ Bot disconnected. Will restart...');
  setTimeout(() => process.exit(), 10000); // Restart via Render auto-restart
});

// === Keep-alive web server for Render ===
const app = express();
app.get('/', (req, res) => res.send('🤖 AFK Bot is alive'));
app.listen(3000, () => console.log('🌐 Web server running on port 3000'));
