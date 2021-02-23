'use strict';

const express = require('express');
const app = express();
const port = 3000;

const config = require('./config');

const Rcon = require('modern-rcon');
const conn = new Rcon(config.rcon_ip, config.rcon_port, config.rcon_password, 1000 /* timeout */);

app.use(express.static('public'));

app.get('/info', async (req, res) => {
    let online = "0", max_online = "0";
    let difficulty = "Easy";
    let seed = "0";
    let border = "0";
    let day = "0";

    try {
        await conn.connect();
        let data = await conn.send('list');
        let reg = /There are (?<players>[0-9]{1,5}) of a max of (?<max>[0-9]{1,5}) players? online/gm;
        let match = reg.exec(data);
        online = match[1];
        max_online = match[2];

        console.log("difficulty")
        difficulty = await conn.send('difficulty');
        difficulty = /The difficulty is (?<diff>[A-Za-z]+)/gm.exec(difficulty)[1];

        console.log("seed")
        seed = await conn.send('seed')
        seed = /Seed: \[(?<seed>[0-9]+)\]/gm.exec(seed)[1];

        console.log("border")
        border = await conn.send('worldborder get')
        border = /The world border is currently (?<border>[0-9]+) blocks wide/gm.exec(border)[1];

        console.log("day")
        day = await conn.send('time query day')
        day = /The time is (?<day>[0-9]+)/gm.exec(day)[1];

        if (online !== "0")
            await conn.send('say someone visited minecraft.12f.pl');
        await conn.disconnect();
    } catch (err) {
        console.log(err)
    }

    res.send({
        "players_online": online,
        "max_players": max_online,
        "difficulty": difficulty,
        "seed": seed,
        "worldborder": border,
        "day": day,
    });
});

app.listen(port, () => {
    console.log(`Started on localhost:${port}`);
});
