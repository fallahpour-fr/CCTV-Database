"use strict";
// config/config.ts
// import { Sequelize } from 'sequelize';
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    development: {
        username: 'cctvuser',
        password: 'cctvpassword',
        database: 'cctvdatabase',
        host: '127.0.0.1',
        dialect: 'postgres',
        logging: false,
    },
    test: {
        username: 'cctvuser',
        password: 'cctvpassword',
        database: 'cctvdatabase',
        host: '127.0.0.1',
        dialect: 'postgres',
        logging: false,
    },
    production: {
        username: 'cctvuser',
        password: 'cctvpassword',
        database: 'cctvdatabase',
        host: '127.0.0.1',
        dialect: 'postgres',
        logging: false,
    },
};
exports.default = config;
