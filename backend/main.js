const qrcode = require('qrcode-terminal');
const express = require('express');
const cors = require('cors');
const path = require('path');

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

// EXPRESS
require('./routers/msg.js')(app, enviar);

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

async function enviar({ msg, group }) {
    let chats = await client.getChats();
        const chat = chats.find(
            (chat) => chat.name === group
        );

    if(chat && chat.isGroup){
        chat.sendMessage(msg);
        return true;
    } else {
        return false;
    }
}

client.initialize();