const express = require('express'); // import express from 'express'
const routes = require('./routes');
const mongoose = require('mongoose');

class App {

    constructor() {

        this.server = express();
        mongoose.connect('cluster');
        this.middelwares();
        this.routes();

    }

    middelwares() {

        this.server.use(express.json());

    }

    routes() {

        this.server.use(routes);

    }

}

module.exports = new App().server;
