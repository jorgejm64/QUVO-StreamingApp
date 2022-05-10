const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

MongoClient.connect(process.env.MONGO_CLIENT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        return console.log(err);
    }

    // Specify database you want to access
    const db = client.db('QUVO');

    console.log(`MongoDB Connected locally: ${process.env.MONGO_CLIENT_URL}`);
});