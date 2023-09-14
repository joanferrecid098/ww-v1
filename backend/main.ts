import qrcode from 'qrcode-terminal';
import express from 'express';
import cors from 'cors';
import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';

// Express
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './public');
app.set('view engine', 'ejs');

// Client Setup
const { Client, NoAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new NoAuth()
});

let doc;

try {
    doc = yaml.load(fs.readFileSync('./config.yml', 'utf8'));
    console.log(doc);
} catch (e) {
    console.log(e);
}

// Interfaces
interface EnviarData {
    msg: string;
    group: string;
    times: number;
}

interface Chat {
    archived: boolean;
    id: object;
    isGroup: boolean;
    isMuted: boolean;
    isReadOnly: boolean;
    lastMessage: any;
    muteExpiration: Date;
    name: string;
    pinned: boolean;
    timestamp: Date;
    unreadCount: number;
}

// EXPRESS
require('./routers/msg.ts')(app, { enviar, doc });

app.listen(8080);

// BOT
client.on('qr', (qr:string) => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

async function enviar({ msg, group, times }:EnviarData) {
    let chats = await client.getChats();
        const chat = chats.find(
            (chat:Chat) => chat.name === group
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