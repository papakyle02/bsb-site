import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Store from './components/Store/Store';
import Social from './components/Social/Social';
import Cart from './components/Cart/Cart';
import Payment from './components/Payment/Payment';
import OrderConfirmation from './components/OrderConfirmation/OrderConfirmation';
// import {Elements, StripeProvider} from 'react-stripe-elements';
// import CheckoutForm from './CheckoutForm';

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/store' component={Store}/>
        <Route path='/social' component={Social}/>
        <Route path='/checkout' component={OrderConfirmation}/>
        <Route path='/cart' component={Cart}/>
        {/* <Route path='/checkout' render={ ()=> {
           return <StripeProvider apiKey="pk_test_453A01qjLFh1wbXQ1Wy23PFo">
            <div className="example">
              <h1>React Stripe Elements Example</h1>
              <Elements>
                <CheckoutForm />
              </Elements>
            </div>
          </StripeProvider>
        
        }}/> */}
        {/* <Route path='/confirmation' component={OrderConfirmation}/> */}
    </Switch>
)