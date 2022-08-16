const TOKEN = '5535735854:AAHEXLmka8FZC1cg-a4YfXnnD2UcAcnkMo4'; // tempatsampah_bot
const { Telegraf } = require('telegraf');

const bot = new Telegraf(TOKEN); // asistenpurno_bot

bot.start((ctx) => ctx.reply('Welcome!'));

// menyimpan pesan
var message = [];

// menyimpan jumlah penggunaan bot
var menggunakanBot = [];

// reset penggunaan bot
function resetPenggunaan(ctx) {
    const date = new Date();
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
    
    // console.log(hour + ':' + minutes + ':' + seconds);
    if (hour === 0 && minutes === 0 && seconds === 0) {
        console.log("reset")
        menggunakanBot = [];
    }
}

setInterval(resetPenggunaan, 1000);


// memastikan user join ke channels
function joinChannel(ctx) {

    ctx.telegram.getChat(ctx.chat.id).then(function (chat) {
        ctx.telegram.getChatMember('@tempatsampahidamanch', chat.id).then(function (member) {
            console.log(member);

            if (member.status == 'left') {
                ctx.reply('Anda belum join ke channel @tempatsampahidamanch');
            }
            else {
                var i = 0;
                while (i < menggunakanBot.length) {
                    if (menggunakanBot[i].guna === 3) {
                        ctx.reply('maaf, anda sudah menggunakan bot 3 kali, silahkan menunggu beberapa saat lagi');
                        i = menggunakanBot.length + 1;
                    }
                    else {
                        i = menggunakanBot.length + 1;
                        broadcastAll(ctx);
                    }
                    i++;
                }
            }
        });
    });
}

function maxPenggunaan(ctx) {
    var i = 0;
    while (menggunakanBot.length > i) {
        if (menggunakanBot[i].idUser === ctx.chat.id) {
            
            if (menggunakanBot[i].guna === 0) {
                menggunakanBot[i].guna = 1;
            }
            else if (menggunakanBot[i].guna === 1) {
                menggunakanBot[i].guna = 2;
            }
            else if (menggunakanBot[i].guna === 2) {
                menggunakanBot[i].guna = 3;
            }
        }
        i++;
    }
}

function broadcastAll(ctx) {

    message = [];
    var lengthChat = ctx.message.text.length;
    var text = ctx.update.message.text;

    for (var i = 0; i <= lengthChat; i++) {
        message.push(text.slice(i, i + 1));
    }
    message[lengthChat] = "kosong";

    var penggunaanHariIni = 0;
    var a = 0;
    while (a < menggunakanBot.length) {
        if (menggunakanBot[a].idUser === ctx.chat.id) {
            console.log(menggunakanBot[a].guna);
            if (menggunakanBot[a].guna === 3) {
                penggunaanHariIni = 3;
                a = menggunakanBot.length + 1;
            }
            else if (menggunakanBot[a].guna === 2) {
                penggunaanHariIni = 3;
                a = menggunakanBot.length + 1;
            }
            else if (menggunakanBot[a].guna === 1) {
                penggunaanHariIni = 2;
                a = menggunakanBot.length + 1;
            }
            else if (menggunakanBot[a].guna === 0) {
                penggunaanHariIni = 1;
                a = menggunakanBot.length + 1;
            }
            else {
                console.log(i)
            }
        }
        a++;
    }

    var a = 0;
    while (a <= lengthChat) {
        if (message[a] === "#") {
            if (message[a + 1] === "o" && message[a + 2] === "r" && message[a + 3] === "g" && message[a + 4] === "a" && message[a + 5] === "n" && message[a + 6] === "i" && message[a + 7] === "k") {
                var capt = `${ctx.message.text}`;
                ctx.telegram.sendPhoto('@tempatsampahidamanch',
                    'https://i.imgur.com/XqQXq.png',
                    { caption: capt },
                    { parse_mode: 'Markdown' },
                    { protect_content: true },
                    { disable_notification: true }
                );

                maxPenggunaan(ctx);
                ctx.reply(`Pesan berhasil terkirim di @tempatsampahidamanch \nTotal penggunaan bot hari ini: ${penggunaanHariIni}`);
            }
            else if (message[a + 1] === "a" && message[a + 2] === "n" && message[a + 3] === "o" && message[a + 4] === "r" && message[a + 5] === "g" && message[a + 6] === "a" && message[a + 7] === "n" && message[a + 8] === "i" && message[a + 9] === "k") {
                var capt = `${ctx.message.text}`;
                ctx.telegram.sendPhoto('@tempatsampahidamanch',
                    'https://i.imgur.com/XqQXq.png',
                    { caption: capt },
                    { parse_mode: 'Markdown' },
                    { protect_content: true },
                    { disable_notification: true }
                );

                maxPenggunaan(ctx);
                ctx.reply(`Pesan berhasil terkirim di @tempatsampahidamanch \nTotal penggunaan bot hari ini: ${penggunaanHariIni}`);
            }
            else {
                console.log(`Mohon gunakan tagar #organik atau #anorganik untuk mengirim pesan`);
                ctx.reply('Mohon gunakan tagar #organik atau #anorganik untuk mengirim pesan');
            }

            a = lengthChat + 1;
        }
        else if (message[a] === "kosong") {
            console.log(`exclude #`);
            ctx.reply("Mohon gunakan tagar #organik atau #anorganik untuk mengirim pesan");
            message = [];
        }
        a++;
    }
}

bot.on('text', (ctx) => {

    // console.log(hour + ':' + minutes + ':' + seconds);

    resetPenggunaan(ctx);
    ctx.telegram.getChat(ctx.chat.id).then(function (chat) {
        menggunakanBot.push({ idUser: chat.id, uName: chat.username, guna: 0 });
    });

    joinChannel(ctx);

    message = [];
    ctx.telegram.deleteWebhook;

})
    // message = [];

bot.launch(console.log('🚀 app running'));