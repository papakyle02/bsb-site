import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
 
class Payment extends React.Component {
  onToken = (token) => {
      let amount = 0
      this.props.cartProducts.forEach( e => {
        amount += e.price * e.quantity
      })
      console.log('sale amount on payment', amount)
    axios.post('/stripe', {
      token,
      amount,
    }).then(response => {
      const recipient = {
        auth0_id: this.props.user.auth0_id,
        name: this.props.user.name,
        to: this.props.user.email,
        subject: `Thank you ${this.props.user.name} for your recent purchase from Bombsquad Batting Gloves!`,
        price: this.total(),
        cart: this.props.cartProducts
      }
      axios.post('/nodemailer', recipient).then(() => {
        alert(`Payment successful! Check your e-mail for order confirmation shortly`);
      })
      this.props.history.push('/')
    });
  }
 
  total = () => {
    let amount = 0
    this.props.cartProducts.forEach( e => {
      console.log('e.price', e.price)
      console.log('e.quantity', e.quantity)
      console.log('e.price times e.quantity', e.price * e.quantity)
      amount += (e.price * e.quantity)
      console.log('amount in forEach', amount)
    })
    return amount
  }
 
  render() {
    console.log('user object on Payment', this.props.user)
    console.log('cartProducts object on Payment', this.props.cartProducts)
    console.log('total cart value', this.total())
    return (
      // ...
      <StripeCheckout
        // name="Bombsquad Batting Gloves"
        token={this.onToken}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        amount={this.total() * 100}
        email={this.props.user.email}
        // currency="USD"
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    cartProducts: state.cartProducts
  }
}

export default withRouter(connect(mapStateToProps)(Payment))