import express from 'express';
const app     = express();
import cors from 'cors';
import { create, find, update, createGoogle } from './dal.js';
import bcrypt from 'bcrypt';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ___filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(___filename);

import swaggerUi from 'swagger-ui-express';
const swaggerDocument = JSON.parse(fs.readFileSync('./swagger.json'));

app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/account/create/:name/:email/:password', function (req, res) {

    find(req.params.email)
       .then((users) => {

            if(users.length > 0){
                console.log('User already exists');
                res.send('User already exists');    
            }
            else{
                create(req.params.name,req.params.email,req.params.password)
                    .then((user) => {
                        res.send(user);            
                    });            
            }

        });
});

app.get('/account/login/:email/:password', function (req, res) {

    find(req.params.email)
            .then((user) => {

            if(user.length > 0){
                bcrypt.compare(req.params.password, user[0].password ).then(function(result) {
                    // result == true
                    if (result){
                        res.send(user[0]);
                    }
                    else{
                        res.send('Login failed: wrong password');
                    }
                });
            }
            else{
                res.send('Login failed: user not found');
            }
    });
    
});

app.get('/account/find/:email', function (req, res) {
    find(req.params.email)
        .then((user) => {
            res.send(user);
    });
});

app.get('/account/update/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    update(req.params.email, amount)
        .then((response) => {
            res.send(response);
    });    
});

app.get('/account/google/:name/:email', function (req, res) {

    find(req.params.email)
        .then((user) => {

            if(user.length > 0){
                res.send(user[0]);    
        }
            else{                     
                createGoogle(req.params.name,req.params.email)
                    .then((user) => {
                        res.send(user);            
                    });    
            }

        });
});

app.use(express.static(path.join(__dirname, 'public/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/dist/index.html'))
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Running on Port: ${PORT}`);
});