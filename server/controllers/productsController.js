module.exports = {
    getProducts: (req, res) => {
        req.app.get('db').get_products()
        .then( products => {
            res.status(200).send(products)
        })
        .catch( error => console.log('error in getProducts', error))
    },
}