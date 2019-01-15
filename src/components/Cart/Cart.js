import React, { Component } from 'react';
import CartProduct from '../CartProduct/CartProduct';
import './Cart.scss';
import axios from 'axios';
import { connect } from 'react-redux';
import { getCart } from '../../ducks/reducer';
import { NavLink } from 'react-router-dom';

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
            <NavLink to="/checkout">Checkout</NavLink>
                {
                    this.props.cartProducts.length > 0
                    ? this.props.cartProducts.map( product => {
                        return <CartProduct 
                            key={product.id}
                            id={product.cart_id}
                            name={product.name}
                            image={product.image}
                            price={product.price} 
                            setCart={this.setCart.bind(this)}
                            user={{auth0_id: this.props.user.auth0_id}}
                            getCart={this.props.getCart}
                            quantity={product.quantity}
                        />
                    }).sort((a,b) => {
                        return a.key - b.key
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