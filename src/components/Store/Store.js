import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Store extends Component {
    render() {
        const products = this.props.productList.map( product => {
            return (
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <img src={product.image} alt={product.name}/>
                    <p>{product.price}</p>
                </div>
            )
        })
        return (
            <div>
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