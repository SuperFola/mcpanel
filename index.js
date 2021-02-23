'use strict';

const express = require('express');
const app = express();
const port = 3000;

const config = require('./config');

const Rcon = require('modern-rcon');
const conn = new Rcon(config.rcon_ip, config.rcon_port, config.rcon_password);

app.use(express.static('public'));

app.get('/info', async (req, res) => {
    let co = await conn.connect();
    let data = await co.send('/list');
    console.log(data);

    let reg = /There are (?<players>[0-9]{1,5}) of a max (?<max>[0-9]{1,5}) players? online/gm;
    let match = reg.exec(data);
    console.log(match.groups.players, match.groups.max);

    await co.disconnect();

    res.send('hello world');
});

app.listen(port, () => {
    console.log(`Started on localhost:${port}`);
});
