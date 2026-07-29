const express = require('express');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Replace with your actual Telegram Bot Token from BotFather if not using environment variables
const token = process.env.BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';
const bot = new TelegramBot(token, { polling: true });

// Listen for the /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    
    const welcomeMessage = "Welcome to Global NFT Marketplace!\n\nPlease click the button below to create your account:";
    
    const opts = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Create Account", url: "https://global-nft-vcla.vercel.app" }
                ]
            ]
        }
    };

    bot.sendMessage(chatId, welcomeMessage, opts);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
