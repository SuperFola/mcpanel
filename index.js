'use strict';

const express = require('express');
const app = express();
const port = 3000;

const config = require('./config');

const Rcon = require('modern-rcon');
const conn = new Rcon(config.rcon_ip, config.rcon_port, config.rcon_password, 500 /* timeout */);

app.use(express.static('public'));

app.get('/info', async (req, res) => {
    let online = "0", max_online = "0";

    try {
        await conn.connect();
        let data = await conn.send('/list');
        let reg = /There are (?<players>[0-9]{1,5}) of a max of (?<max>[0-9]{1,5}) players? online/gm;
        let match = reg.exec(data);
        await conn.disconnect();

        online = match[1];
        max_online = match[2];
    } catch (err) {
        online = "0";
        max_online = "0";
    }

    res.send({
        "players_online": online,
        "max_players": max_online,
    });
});

app.listen(port, () => {
    console.log(`Started on localhost:${port}`);
});
