import { MongoClient } from 'mongodb';

let client;

export const initializeDbConnection = async () => {
    // client = await MongoClient.connect('mongodb://localhost:27017', {
    client = await MongoClient.connect('....', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

export const getDbConnection = dbName => {
    const db = client.db(dbName);
    return db;
}