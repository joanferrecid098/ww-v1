const qrcode = require('qrcode-terminal');
const express = require('express');

const app = express();
app.use(express.json())

const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});

// EXPRESS
app.post('/send', (req, res) => {
    const { msg, groupName } = req.body;

    const enviat = enviar({msg: msg, group: groupName});

    if ( enviat == true ) {
        res.status(200).json({ msg: "msg enviat" })
    } else if ( enviat == false ) {
        res.status(400).json({ msg: "error inesperat" })
    }
});

// BOT
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
    app.listen(8080);
});

client.on('message', msg => {
    const enviat = enviar({msg: msg.body, group: "Jijijija"});

    if ( enviat == true ) {
        msg.reply("mensaje enviado")
    } else if ( enviat == false ) {
        msg.reply("error")
    }
    
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