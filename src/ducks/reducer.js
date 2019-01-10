const INITIAL_STATE = {
    user: '',
    productList: [],
    cartProducts: [],
}

const ADD_TO_CART = 'ADD_TO_CART';
const GET_PRODUCTS = 'GET_PRODUCTS';
const SET_USER = 'SET_USER';
const GET_CART = 'GET_CART';

function reducer(state = INITIAL_STATE, action){
    switch(action.type){
        case GET_PRODUCTS:
        return Object.assign({}, state, {productList: action.payload})

        case SET_USER:
        return Object.assign({}, state, {user: action.payload})

        case GET_CART:
        return Object.assign({}, state, {cartProducts: action.payload})

        default:
        return state
    }
}

export function getProducts(products){
    return {
        type: GET_PRODUCTS,
        payload: products
    }
}

export function setUser(user){
    console.log('setUser in reducer', user);
    return {
        type: SET_USER,
        payload: user
    }
}

export function getCart(cartProducts){
    console.log('cartProducts on reducer', cartProducts);
    return {
        type: GET_CART,
        payload: cartProducts
    }
}

export default reducer;