const express = require('express'); // import express from 'express'
const routes = require('./routes');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

class App {

    constructor() {

        this.server = express();
        mongoose.connect('kluster');
        this.middelwares();
        this.routes();

    }

    middelwares() {

        this.server.use(cors()); // nao temos um dominio para limitar as requisiçoes via cors
        
        // caminho para arquivos estaticos
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'uploads'))
        )
        this.server.use(express.json());

    }

    routes() {

        this.server.use(routes);

    }

}

module.exports = new App().server;