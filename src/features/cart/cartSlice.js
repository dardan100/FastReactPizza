import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: [],
    favoriteCart: [],
    // cart: [
    //     {
    //         pizzaId: 12,
    //         name: 'Medetirranean',
    //         quantity: 2,
    //         unitPrice: 16,
    //         totalPrice: 32,
    //     },
    // ],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            state.cart.push(action.payload)
        },
        addFavItem(state, action) {
            state.favoriteCart.push(action.payload)
        },
        deleteItem(state, action) {
            state.cart = state.cart.filter(
                (item) => item.pizzaId !== action.payload
            )
        },
        deleteFavItem(state, action) {
            state.favoriteCart = state.favoriteCart.filter(
                (item) => item.pizzaId !== action.payload
            )
        },
        increaseItemQuantity(state, action) {
            // payload = pizzaId
            const item = state.cart.find(
                (item) => item.pizzaId === action.payload
            )

            item.quantity++
            item.totalPrice = item.quantity * item.unitPrice
        },
        decreaseItemQuantity(state, action) {
            const item = state.cart.find(
                (item) => item.pizzaId === action.payload
            )
            item.quantity--
            item.totalPrice = item.quantity * item.unitPrice

            if (item.quantity === 0)
                cartSlice.caseReducers.deleteItem(state, action)
        },
        clearCart(state) {
            state.cart = []
        },
    },
})

export const {
    addItem,
    addFavItem,
    deleteItem,
    deleteFavItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart,
} = cartSlice.actions

export default cartSlice.reducer

export const getCart = (state) => state.cart.cart

export const getFavoriteCart = (state) => state.cart.favoriteCart

export const getTotalQuantity = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)

export const getTotalPrice = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)

export const getCurrentQuantityById = (id) => (state) =>
    state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0

export const getCurrentFavQuantityById = (id) => (state) =>
    state.cart.favoriteCart.find((item) => item.pizzaId === id)
