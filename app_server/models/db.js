const mongoose = require('mongoose');
let dbUrl = "mongodb://127.0.0.1:27017/gruppe7";
if (process.env.NODE_ENV === 'production') {
    if (process.env.MONGODB_URI) {
        console.log('Using env.MONGODB_URI as db url');
        dbUrl = process.env.MONGODB_URI;
    } else {
        console.log('No production db url!');
    }
}
mongoose.connect(dbUrl);

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbUrl}`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

const readLine = require ('readline');
if (process.platform === 'win32'){
    const rl = readLine.createInterface ({
        input: process.stdin,
        output: process.stdout
    });
    rl.on ('SIGINT', () => {
        process.emit ("SIGINT");
    });
}

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    })
};

process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

require('./exercise');
require('./workout');
require('./user');
