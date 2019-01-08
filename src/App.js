import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import routes from './routes';
import axios from 'axios';
import { connect } from 'react-redux';
import { getProducts } from './ducks/reducer';
import { withRouter } from 'react-router-dom';

class App extends Component {

  componentDidMount(){
    axios.get('/api/products').then( products => {
      this.props.getProducts(products.data);
    })
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <div>
          {routes}
        </div>
        {/* <Footer/> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    productList: state.productList
  }
}

export default withRouter(connect(mapStateToProps, { getProducts })(App));
