import React, { Component } from 'react';
import './Product.scss';
import axios from 'axios';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import starEmpty from './starempty.svg';
import starFull from './starfull.svg';
import { getCart } from '../../ducks/reducer';

class Product extends Component {
    constructor(){
        super();
        this.state = {
            value: 0
        }
    }

    addToCart = (productId) => {
        console.log('auth0_id on addToCart',this.props.user.auth0_id)
        const cartBody = {
            auth0_id: this.props.user.auth0_id,
            product_id: productId
        }
        axios.post('/api/products', cartBody).then(response => {
            this.props.getCart(response.data);
            console.log('cartItem added to db', response)
        })
    }

    ratingChanged = newRating => {
        console.log(newRating);
    }

    render() {
        // console.log('productList on Product', this.props.productList)
        const { name, image, price, id } = this.props
        return(
            <div className='product-container' key={id}>
                    <img src={image} alt={name}/>
                    <h2>{name}</h2>
                    <p>${price}</p>
                    <div id='product-button' onClick={() => this.addToCart(id)}><h3>Add to Cart</h3></div>
                    <Rating
                    // readonly={true}
                    stop={100}
                    step={20}
                    fractions={2}
                    emptySymbol={<img src={starEmpty} className='rating'/>}
                    fullSymbol={<img src={starFull} className='rating'/>}
                    // use for adding reviews after purchase.  separate nodemailer url? ?
                    // onChange={(rate) => alert(rate)}
                    />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        productList: state.productList
    }
}

export default connect(mapStateToProps, { getCart })(Product)