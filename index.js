'use strict';

const express = require('express');
const app = express();
const port = 3000;

const config = require('./config');

const Rcon = require('rcon');
const conn = new Rcon(config.rcon_ip, config.rcon_port, config.rcon_password);

conn.on('auth', () => console.log('Connected to RCON!'))
    .on('response', (str) => console.log('Response: ', str))
    .on('end', () => console.log('RCON closed'));
conn.connect();

app.use(express.static('public'));

app.get('/info', (req, res) => {
    console.log(conn.send('/list'));
    res.send('hello world');
});

app.listen(port, () => {
    console.log(`Started on localhost:${port}`);
});
