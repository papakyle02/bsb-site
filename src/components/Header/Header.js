import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.scss';
import { withRouter } from 'react-router';
import axios from 'axios';
import { setUser } from '../../ducks/reducer';

class Header extends Component {

    componentDidMount(){
        axios.get('/auth/get_customer').then( user => {
            console.log('user from db', user)
            this.props.setUser(user.data)
        })
    }

    login = () => {
        const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback')
        window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
      }

    render() {
        return (
            <div className='header-container'>
                <img src="https://pbs.twimg.com/profile_images/688255438/logo.gif" alt="logo"/>
                <ul>
                    <li><NavLink activeClassName='active' exact to="/">Home</NavLink></li>
                    <li><NavLink activeClassName='active' to="/store">Store</NavLink></li>
                    <li><NavLink activeClassName='active' to="/social">Social</NavLink></li>
                    <li onClick={this.login}>
                        <img src="https://png.pngtree.com/svg/20151204/_home_login_icon_543863.png"/>
                    </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps, { setUser })(Header))

