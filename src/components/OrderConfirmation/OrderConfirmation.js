import React, { Component } from 'react'
import Payment from '../Payment/Payment';
import { connect } from 'react-redux';

class OrderConfirmation extends Component {
    constructor(){
        super();
        this.state = {

        }
    }
  render() {
    return (
        <div className='order-confirmation-container'>
            <div>
                
            </div>
            <div>
                <Payment/>
            </div>
        </div>
    )
  }
}

export default connect()(OrderConfirmation)
