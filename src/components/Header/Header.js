import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.scss';
import { withRouter } from 'react-router';
import axios from 'axios';
import { setUser } from '../../ducks/reducer';
import cart from './carticon.svg';

class Header extends Component {

    login = () => {
        const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback')
        window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
      }

    render() {
        return (
            <div className='header-container'>
                <div className='logo-name'>
                <img src="https://pbs.twimg.com/profile_images/688255438/logo.gif" alt="logo"/>
                <div className="site-title">
                    <h1>Bombsquad</h1>
                    <h2>Custom Batting Gloves</h2>
                </div>
                </div>
                <ul>
                    <li><NavLink activeClassName='active' exact to="/">Home</NavLink></li>
                    <li><NavLink activeClassName='active' to="/store">Store</NavLink></li>
                    <li><NavLink activeClassName='active' to="/social">Social</NavLink></li>
                    <li className='li-cart-container'>
                    <div>
                        <p>{this.props.cartProducts.length}</p>
                    </div>
                        <NavLink to="/cart"><img style={{height: 40, width: 40}} src={cart} alt="shopping cart"/></NavLink>
                    </li>
                    <li onClick={this.login}>
                        <img className="profile-image" src={
                            this.props.user
                            ? this.props.user.image
                            : "https://png.pngtree.com/svg/20151204/_home_login_icon_543863.png"
                        }
                        />
                    </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        cartProducts: state.cartProducts
    }
}

export default withRouter(connect(mapStateToProps, { setUser })(Header))

