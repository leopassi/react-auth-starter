import { MongoClient } from 'mongodb';

let client;

export const initializeDbConnection = async () => {
    // client = await MongoClient.connect('mongodb://localhost:27017', {
    client = await MongoClient.connect('mongodb+srv://adminleo:Ekaloe00@cluster0.srvkd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

export const getDbConnection = dbName => {
    const db = client.db(dbName);
    return db;
}