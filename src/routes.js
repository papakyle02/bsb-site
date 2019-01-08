import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Store from './components/Store/Store';
import Social from './components/Social/Social';
import OrderConfirmation from './components/OrderConfirmation/OrderConfirmation';

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/store' component={Store}/>
        <Route path='/social' component={Social}/>
        {/* <Route path='/login' component={Login}/> */}
        {/* <Route path='/cart' component={Cart}/> */}
        {/* <Route path='/confirmation' component={OrderConfirmation}/> */}
    </Switch>
)