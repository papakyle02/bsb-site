import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Product from '../Product/Product';
import './Store.scss';

class Store extends Component {
    render() {
        const products = this.props.productList.map( product => {
            return (
                <Product 
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    image={product.image}
                    price={product.price} 
                />
            )
        })
        return (
            <div className='store-container'>
                {products}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        productList: state.productList
    }
}

export default connect(mapStateToProps)(Store);