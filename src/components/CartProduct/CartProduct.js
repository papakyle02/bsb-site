import React, { Component } from 'react';
import './CartProduct.scss';
import axios from 'axios';

export default class CartProduct extends Component {
    state = {
        loading: false
    }

    handleDelete = id => {
        axios.delete(`/api/products/${id}`).then( () => {
            console.log('delete successful')
        })
        axios.get(`/api/cart/${this.props.auth0_id}`).then(cartProducts => {
            console.log('cartProducts on setCart in Cart.js', cartProducts);
            this.props.getCart(cartProducts.data);
        }).catch(error => {
            console.log('error in setCart front end', error);
        });
    }

    handleQuantity = (id, quantity) => {
        let parsedQty = parseInt(quantity)
        console.log('cartProduct id on frontend', id)
        this.setState({ loading: true })
        axios.put('/api/cart', {id, qty: parsedQty, auth0_id: this.props.auth0_id}).then(cartProducts => {
            console.log('handleQuantity response', cartProducts)
            this.props.setCart()  
            this.setState({ loading: false })     
        })
    }

    render() {
        const { name, image, price, id, quantity, cart_id } = this.props
        return(
            <div className={`cart-product-container ${this.state.loading ? 'loading': ''}`} key={id}>
                    <img src={image} alt={name}/>
                    <h2>{name}</h2>
                    <p>{price}</p>
                    <select onChange={e => this.handleQuantity(id, e.target.value)} name="quantity" value={quantity}>
                        {/* <option value={() => this.handleDelete(id)}>Delete</option> */}
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <button disabled={this.state.loading} onClick={() => this.handleDelete(id)}>Delete</button>
            </div>
        )
    }
}