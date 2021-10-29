const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient } = require('mongodb');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2qgak.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {
    try {
        await client.connect();
        const database = client.db('Tour_package');
        const serviceCollection = database.collection('packages');
        const userCollection = database.collection('users');
        //get service;
        app.get('/packages', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const packages = await cursor.toArray();
            res.send(packages);
        })
        //post user
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(req.body)
            const result = await userCollection.insertOne(user);
            res.json(result);
        })
    }
    finally {
        // await client.close();
    }
};
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Server for my first Professional project')
});

app.listen(port, (res, req) => {
    console.log(`listening to port ${port}`)
});