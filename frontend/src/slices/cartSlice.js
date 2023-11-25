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
            // const { user, rating, numReviews, reviews, ...item } = action.payload;
            const { user, rating, reviews, ...item } = action.payload;
            // console.log("action.payload", action.payload)
            // console.log("state.cartItems", state.cartItems)
            // console.log("state.shippingPrice", state.shippingPrice)
            
            const existItems = state.cartItems.find((x) => x._id === item._id)
            // console.log("existItems", existItems)


            if (existItems) { 
                // console.log("ifffffff")
                state.cartItems = state.cartItems.map((x) => x._id === existItems._id ? item : x) 
            }
            else {
                // console.log("elseeee")
                state.cartItems = [...state.cartItems, item]
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