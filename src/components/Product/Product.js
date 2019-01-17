import React, { Component } from 'react';
import './Product.scss';
import axios from 'axios';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import starEmpty from './starempty.svg';
import starFull from './starfull.svg';

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
            console.log('cartItem added to db', response)
        })
    }

    ratingChanged = newRating => {
        console.log(newRating);
    }

    render() {
        console.log('productList on Product', this.props.productList)
        const { name, image, price, id } = this.props
        return(
            <div className='product-container' key={id}>
                    <h2>{name}</h2>
                    <img src={image} alt={name}/>
                    <p>{price}</p>
                    <button onClick={() => this.addToCart(id)}>Add to Cart</button>
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

export default connect(mapStateToProps)(Product)