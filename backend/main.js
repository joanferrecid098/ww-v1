const qrcode = require('qrcode-terminal');
const express = require('express');
const cors = require('cors');
const path = require('path');
const yaml = require('js-yaml');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './public');
app.set('view engine', 'ejs');

const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});

try {
    const doc = yaml.load(fs.readFileSync('./config.yml', 'utf8'));
    console.log(doc);
} catch (e) {
    console.log(e);
}

// EXPRESS
require('./routers/msg.js')(app, { enviar, doc });

app.listen(8080);

// BOT
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    /*const enviat = enviar({msg: msg.body, group: "Jijijija"});

    if ( enviat ) {
        console.log(`"${msg}" ha sido enviado a "${groupName}"`);
        res.msg("msg enviat");
    } else {
        console.log(`Error al enviar mensaje`);
        res.msg("error inesperat");
    }*/
});

async function enviar({ msg, group, times }) {
    let chats = await client.getChats();
        const chat = chats.find(
            (chat) => chat.name === group
        );

    if(chat && chat.isGroup) {
        for (let i = 1; i <= times; ++i) {
            chat.sendMessage(msg);
        }
        return true;
    } else {
        return false;
    }
}

client.initialize();