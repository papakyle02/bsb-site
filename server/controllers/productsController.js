module.exports = {
    getProducts: (req, res) => {
        req.app.get('db').get_products()
        .then( products => {
            res.status(200).send(products)
        })
        .catch( error => console.log('error in getProducts', error))
    },
    addToCart: (req, res) => {
        const { auth0_id, product_id } = req.body
        req.app.get('db').get_cart([auth0_id]).then( cart => {
            console.log('cart', cart);
            const productIndex = cart.findIndex( product => {
                return product.id === product_id
            })
            if(productIndex === -1){
                req.app.get('db').add_product([auth0_id, product_id])
            } else {
                let newQuantity = cart[productIndex].quantity + 1
                req.app.get('db').add_qty([newQuantity, cart[productIndex].cart_id]);
            }
        }).catch( error => {
            console.log('error in addToCart', error);
        });
        
    },
    getCart: (req, res) => {
        let singleQuotes = req.params.auth0_id.replace(/"/g, '\'');
        req.app.get('db').get_cart([singleQuotes])
        .then(cartProducts => {
            res.send(cartProducts);
        }).catch(error => {
            console.log('error on getCart back end', error);
        });
    }
}