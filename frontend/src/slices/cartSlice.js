import { createSlice } from "@reduxjs/toolkit";
import { cartUpdate } from "../utils/cartUtils";


const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        addToCart: (state, action) => {
             const { user, rating, numReviews, reviews, ...item } = action.payload;
            const existItems = state.cartItems.find((x) => x._id === item._id)


            if (existItems) { 
                state.cartItems = state.cartItems.map((x) => x._id === existItems._id ? item : x) 
            }
            else {
                state.cartItems = [...state.cartItems]
            }
            return cartUpdate(state)

          
        },
        removeFromCart: (state, action) => {
            
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)
            return cartUpdate(state)
        }
    }

})
export const {addToCart, removeFromCart} =  cartSlice.actions

export default cartSlice.reducer