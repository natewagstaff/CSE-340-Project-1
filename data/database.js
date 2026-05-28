const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let database;

const initDatabase = (callback) => {
    if (database) {
        console.log('Database already initialized!');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            database = client.db();
            console.log('Database connection established!');
            callback(null, database);
        })
        .catch((error) => {
            console.error('Error connecting to the database:', error);
            callback(error);
        });
}

const getDatabase = () => {
    if (!database) {
        throw new Error('Database not initialized! Call initDatabase first.');
    }
    return database;
};

module.exports = {
    initDatabase,
    getDatabase
};