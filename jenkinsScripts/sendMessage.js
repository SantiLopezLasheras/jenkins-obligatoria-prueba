import TelegramBot from "node-telegram-bot-api";
const chatId = process.argv[3];
const botToken = "8083564169:AAEq3CdtmK7OmpIrAJS3HQeOmCyyyqdTUiE";
const bot = new TelegramBot(botToken, { polling: true });
const message = process.argv[2];
bot
  .sendMessage(chatId, message)
  .then(() => {
    console.log("Telegram sended");
    process.exit(0);
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
