
require('dotenv').config()
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const {Telegraf} = require('telegraf');

const { TOKEN, SERVER_URL } = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
const URI = `/webhook/${TOKEN}`
const WEBHOOK_URL = SERVER_URL + URI
const bot = new Telegraf(TOKEN)

const app = express()
app.use(bodyParser.json())

const init = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
    console.log(res.data)
}

bot.start((ctx) => ctx.reply('Welcome!'));

app.post(URI, async (req, res) => {
    console.log(req.body)
    
    const chatId = req.body.message.chat.id
    const text = req.body.message.text

    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: text
    })
    return res.send()
})


// bot.on('text', async (ctx) => {
//         console.log(ctx.message);

//     const chatId = ctx.message.chat.id;
//     const text = ctx.message.text;

//     ctx.telegram.sendMessage(chatId, text);
// });

// bot.command('chat', function (ctx) {
//     // console.log(ctx);
//     return ctx.reply('Hello World!');
// });

// bot.command('pin', (ctx) => {

//     console.log(ctx);
//     // ctx.telegram.reply(ctx.chat.id, `Berhasil di pin ${ctx.message.from.id} dan ${ctx.message.reply_to_message.message_id}`);
//     console.log(ctx.message);

//     ctx.telegram.pinChatMessage(ctx.message.from.id, ctx.message.reply_to_message.message_id, true);
//     ctx.telegram.deleteWebhook;
// });

// bot.command('unpinAll', (ctx) => {
//     console.log(ctx);
//     ctx.telegram.sendMessage(ctx.chat.id, `Berhasil di unpin all \nOleh @${ctx.message.from.username}`);
//     ctx.telegram.unpinAllChatMessages(ctx.botInfo.id);
//     ctx.telegram.deleteWebhook;
// })


app.listen(process.env.PORT || 5000, async () => {
    console.log('🚀 app running on port', process.env.PORT || 5000)
    await init()
})

bot.launch();


// menghapus data dalam array
    // while(menggunakanBot.length > 0){
    //     var length = menggunakanBot.length;
    //     var i = 0;
    //     while(i < length){
    //         if(menggunakanBot[i].id == ctx.chat.id){
    //             menggunakanBot.splice(i, 1);
    //         }
    //         i++;
    //     }
    // }


// reply pesan
// ctx.message = { 
//     message_id: 241,
//     from: {
//       id: 806781448,
//       is_bot: false,
//       first_name: 'Gopat',
//       username: 'gogogopat',
//       language_code: 'en'
//     },
//     chat: {
//       id: 806781448,
//       first_name: 'Gopat',
//       username: 'gogogopat',
//       type: 'private'
//     },
//     date: 1660119042,
//     reply_to_message: {
//       message_id: 239,
//       from: {
//         id: 806781448,
//         is_bot: false,
//         first_name: 'Gopat',
//         username: 'gogogopat',
//         language_code: 'en'
//       },
//       chat: {
//         id: 806781448,
//         first_name: 'Gopat',
//         username: 'gogogopat',
//         type: 'private'
//       },
//       date: 1660119031,
//       text: 'asd'
//     },
//     text: 'aku padamu'
//   }
  


// Context {
//     update: {
//       update_id: 89133823,
//       message: {
//         message_id: 214,
//         from: [Object],
//         chat: [Object],
//         date: 1660118005,
//         text: 'asd'
//       }
//     },
//     telegram: Telegram {
//       token: '5535735854:AAHEXLmka8FZC1cg-a4YfXnnD2UcAcnkMo4',
//       response: undefined,
//       options: {
//         apiRoot: 'https://api.telegram.org',
//         apiMode: 'bot',
//         webhookReply: true,
//         agent: [Agent],
//         attachmentAgent: undefined,
//         testEnv: false
//       }
//     },
//     botInfo: {
//       id: 5535735854,
//       is_bot: true,
//       first_name: 'tempatsampah',
//       username: 'tempatsampahidaman_bot',
//       can_join_groups: true,
//       can_read_all_group_messages: false,
//       supports_inline_queries: false
//     },
//     state: {}
//   }


// 777000
// ctx.message ={
//     message_id: 216,
//     from: {
//       id: 806781448,
//       is_bot: false,
//       first_name: 'Gopat',
//       username: 'gogogopat',
//       language_code: 'en'
//     },
//     chat: {
//       id: 806781448,
//       first_name: 'Gopat',
//       username: 'gogogopat',
//       type: 'private'
//     },
//     date: 1660118155,
//     text: 'asd'
//   }

// Unhandled error while processing {
//     update_id: 89133840,
//     message: {
//       message_id: 244,
//       from: {
//         id: 806781448,
//         is_bot: false,
//         first_name: 'Gopat',
//         username: 'gogogopat',
//         language_code: 'en'
//       },
//       chat: {
//         id: 806781448,
//         first_name: 'Gopat',
//         username: 'gogogopat',
//         type: 'private'
//       },
//       date: 1660119285,
//       reply_to_message: {
//         message_id: 241,
//         from: [Object],
//         chat: [Object],
//         date: 1660119042,
//         text: 'aku padamu'
//       },
//       text: '/pin',
//       entities: [ [Object] ]
//     }
//   }