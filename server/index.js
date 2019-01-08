const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
const productsController = require('./controllers/productsController');
const authController = require('./controllers/authController');
require('dotenv').config();

const app = express();

massive(process.env.CONNECTION_STRING).then(database => {
    console.log('massive connected');
    app.set('db', database)
}).catch( err => console.log('error in massive init'))

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}))

app.get('/api/products', productsController.getProducts)
app.get('/auth/callback', authController.login)
app.get('/auth/get_customer', authController.getUser)

const PORT = 4000

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})