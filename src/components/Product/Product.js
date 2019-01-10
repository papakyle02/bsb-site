import React, { Component } from 'react';
import './Product.scss';
import axios from 'axios';
import { connect } from 'react-redux';

class Product extends Component {

    addToCart = (productId) => {
        console.log('auth0_id on addToCart',this.props.user.auth0_id)
        const cartBody = {
            auth0_id: this.props.user.auth0_id,
            product_id: productId
        }
        axios.post('/api/products', cartBody).then(response => {
            console.log('cartItem added to db', response)
        })
    }

    render() {

        const { user } = this.props
        const { name, image, price, id } = this.props
        return(
            <div className='product-container' key={id}>
                    <h2>{name}</h2>
                    <img src={image} alt={name}/>
                    <p>{price}</p>
                    <button onClick={() => this.addToCart(id)}>Hello</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Product)