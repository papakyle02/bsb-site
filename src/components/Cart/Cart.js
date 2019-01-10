import React, { Component } from 'react';
import CartProduct from '../CartProduct/CartProduct';
import './Cart.scss';
import axios from 'axios';
import { connect } from 'react-redux';
import { getCart } from '../../ducks/reducer';

class Cart extends Component {

    componentDidMount(){ 
        this.setCart();
    }

    setCart(){
        axios.get(`/api/cart/${this.props.user.auth0_id}`).then(cartProducts => {
            console.log('cartProducts on setCart in Cart.js', cartProducts);
            this.props.getCart(cartProducts.data);
        }).catch(error => {
            console.log('error in setCart front end', error);
        });
    }

    render() {
        console.log('cartProducts on Cart.js', this.props.cartProducts)
        return (
            <div className='cart-container'>
                {
                    this.props.cartProducts
                    ? this.props.cartProducts.map( product => {
                        return <CartProduct 
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            image={product.image}
                            price={product.price} 
                        />
                    })
                    : <div className="no-items">
                        <h1>No items in cart</h1>
                      </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cartProducts: state.cartProducts,
        user: state.user
    }
}

export default connect(mapStateToProps, { getCart })(Cart);