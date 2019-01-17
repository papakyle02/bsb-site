const axios = require('axios');

module.exports = {
    login: (req, res) => {
        const { code } = req.query;
        console.log('---------code', code)
        const payload = {
            client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: `http://${req.headers.host}/auth/callback`
        };

        function tradeCodeForAccessToken() {
            return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload);
        }

        // function tradeAccessTokenForUserInfo(response) {
        //     console.log('------------- response.data.access_token', response.data.access_token)
        //     return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${response.data.access_token}`)
        // }

        function tradeAccessTokenForUserInfo(response){
            console.log("tradeAccess", response.data.access_token)
            return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${response.data.access_token}`)
        }

        function storeUserInfoInDatabase(response) {
            console.log('user info', response.data);
            const user = response.data;
            const db = req.app.get('db')
            return db.get_customer([user.sub]).then(users => {
                if (users.length) {
                    req.session.user = {
                        name: users[0].name,
                        email: users[0].email,
                        image: users[0].image,
                        auth0_id: users[0].auth0_id
                    }
                    res.redirect('/')
                } else {
                    return db.create_customer([
                        user.name,
                        user.email,
                        user.picture,
                        user.sub
                    ]).then( newUsers => {
                        req.session.user = newUsers[0];
                        res.redirect('/');
                    })
                }
            })
        }
    tradeCodeForAccessToken()
    .then(tradeAccessTokenForUserInfo)
    .then(storeUserInfoInDatabase)
    .catch( error => {
        console.log('Error in login route', error);
        res.status(500).send('Something bad happened on the server');
    });
    },
    getUser: (req, res) => {
            res.json(req.session.user)
    },
    logout: (req, res) => {
        req.session.destroy();
        res.send();
    }
}