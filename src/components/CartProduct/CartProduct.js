import React, { Component } from 'react';
import './CartProduct.scss';

export default class CartProduct extends Component {
    render() {
        const { name, image, price, id } = this.props
        return(
            <div className='cart-product-container' key={id}>
                    <img src={image} alt={name}/>
                    <h2>{name}</h2>
                    <p>{price}</p>
            </div>
        )
    }
}