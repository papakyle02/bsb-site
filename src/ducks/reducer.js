const INITIAL_STATE = {
    user: null,
    productList: [],
    cart: [],
}

const ADD_TO_CART = 'ADD_TO_CART';
const GET_PRODUCTS = 'GET_PRODUCTS';
const SET_USER = 'SET_USER';

function reducer(state = INITIAL_STATE, action){
    switch(action.type){
        case GET_PRODUCTS:
        return Object.assign({}, state, {productList: action.payload})

        case SET_USER:
        return Object.assign({}, state, {user: action.payload})

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
    return {
        type: SET_USER,
        payload: user
    }
}

export default reducer;