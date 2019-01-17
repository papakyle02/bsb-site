const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
const productsController = require('./controllers/productsController');
const authController = require('./controllers/authController');
const nodemailer = require('./controllers/nodemailer');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET)

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

app.get('/auth/callback', authController.login)
app.get('/auth/get_customer', authController.getUser)


app.get('/api/products', productsController.getProducts)
app.post('/api/products', productsController.addToCart)
app.delete('/api/products/:id', productsController.deleteProduct)

app.get('/api/cart/:auth0_id', productsController.getCart)
app.put('/api/cart', productsController.editQty)

app.post('/nodemailer', nodemailer.send)

app.post('/stripe', (req,res)=>{
    const {token, amount} = req.body;
    stripe.charges.create({
        source: token.id, 
        amount, 
        currency: 'usd',
        description: 'whatever'
    },
        (error, response)=>{
            error
            ?res.status(500).send({error})
            :res.status(200).send({response})
        })
})

const PORT = 4000

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})