import 'dotenv/config'
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@belle-bank.me7fxxl.mongodb.net/?retryWrites=true&w=majority&appName=belle-bank`;
const client = new MongoClient(url);

const dbName = 'bank-app';

async function main() {
    await client.connect();
    console.log('Connected to db server!');
    const db = client.db(dbName);
    const collection = db.collection('users');
  
    return 'Done.';
}

main()
  .then(console.log)
  .catch(console.error)
//   .finally(() => client.close());

function create(name, email, password){
    return new Promise((resolve,reject) => {
        let db = client.db(dbName);
        const collection = db.collection('users');
        
        const saltRounds = 10;

        bcrypt.hash(password, saltRounds).then(function(hash) {
            const doc = {name, email, password: hash, balance: 0};
            
            collection.insertOne(doc, {w:1}, function(err, result) {
                err ? reject(err) : resolve(doc);
            })
        })
    })
}

function find(email) {
    return new Promise((resolve, reject) => {
        const customers = client.db(dbName)
            .collection('users')
            .find({ email: email })
            .toArray(function (err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })
}

function update(email, amount) {
    return new Promise((resolve, reject) => {
        const customers = client.db(dbName)
            .collection('users')
            .findOneAndUpdate(
                { email: email },
                { $inc: { balance: amount } },
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );


    });
}

function createGoogle(name, email){
    return new Promise((resolve,reject) => {
        let db = client.db(dbName);
        const collection = db.collection('users');
        const doc = {name, email, balance: 0};
        
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
    })
    })
}

export { create, find, update, createGoogle };