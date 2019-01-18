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
            console.log(req.body)
            const productIndex = cart.findIndex( product => {
                return product.id === product_id
            })
            if(productIndex === -1){
                req.app.get('db').add_product([auth0_id, product_id, req.session.user.auth0_id]).then( response => {
                    res.status(200).send(response);
                })
            } else {
                let newQuantity = cart[productIndex].quantity + 1
                req.app.get('db').add_qty([newQuantity, cart[productIndex].cart_id, req.session.user.auth0_id]).then(response => {
                    res.status(200).send(response);
                })
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
    },
    deleteProduct: (req, res) => {
        let { id } = req.params
        console.log(id);
        // console.log('req.session on delete', req.session)
        req.app.get('db').delete_product([id, req.session.user.auth0_id]).then( response => {
            console.log('delete successful back end', response)
            res.status(200).send(response)
        }).catch( error => {
            console.log('error in deleteProduct on productsController', error);
        })
    },
    editQty: (req, res) => {
        let { id, qty, auth0_id } = req.body
        console.log('req.body on editQty', req.body)
        req.app.get('db').edit_quantity([id, qty, auth0_id]).then( response => {
            console.log('quantity edited successfully back end')
            res.status(200).send(response);
        })
    }
}