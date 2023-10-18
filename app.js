const express = require('express');
const mongoose = require('mongoose');

// express app
const app = express();

// connect to mongo database
const dbURI = 'mongodb+srv://Miki:06422Meowgawdatabase@meowgaw.o1wmqdk.mongodb.net/';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err)); 

// register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static('public'));

app.get('/', (req, res) =>{
    res.render('index');
})

app.get('/gallery', (req, res) =>{
    res.render('gallery');
})

app.get('/about', (req, res) =>{
    res.render('about');
})