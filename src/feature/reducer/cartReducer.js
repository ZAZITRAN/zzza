import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const getCart = createAsyncThunk(
    `cart/getCart`,
    async (thunkAPI) => {
        const res= await axios.get(`http://localhost:9000/cart`)
        return res.data
    }
)

export const getCartFromId = createAsyncThunk(
    "cart/getCartFromId",
    async (data, { dispatch }) => {
        const res = await axios.get(`http://localhost:9000/cart?userId=${data.id}`)
        return res.data
    }
)
export const syncCart = createAsyncThunk(
    "cart/syncCart",
    async (data, { dispatch }) => {
        const { cart, cartCookie, userId } = data
        const payload=[]
        if (cartCookie.length > 0) {
            for (let i = 0; i < cartCookie.length; i++) {
                let findIndex = cart.findIndex(item => item.petId === cartCookie[i].petId)
                if (findIndex === -1) {
                    const res=await axios.post("http://localhost:9000/cart", {...cartCookie[i], userId:userId})
                    .then (response=>{
               
                        payload.push(res.data )               
                    })  
                    .catch(err=>{
                        console.log(111,err);
                    })  
                }else{
                    const res = await  axios.put("http://localhost:9000/cart", {...cart[findIndex], userId:userId, quantity:cartCookie[i].quantity+cart[findIndex].quantity})
                    payload.push(res.data )
                }
            }

        } else {
          
            payload=[...cart]
        }
        return payload
    }
    

)

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (data, { dispatch }) => {
        console.log(data);
        const { cart, item } = data
        let findIndex = cart.findIndex(cartItem => cartItem.productId === item.productId)
        const result={...item, id:Date.now()}
        
        if (findIndex === -1) {
            const res = await axios.post(`http://localhost:9000/cart`, result)
            return res.data
        }else {
            const res = await axios.put(`http://localhost:9000/cart/${cart[findIndex].id}`,
                {
                    ...cart[findIndex], quantity: cart[findIndex].quantity + 1
                }
            )
            return res.data
        }

    }
)



export const decrease = createAsyncThunk(
    "cart/decrease",
    async (data, { dispatch }) => {
        const item = data.item
        const response = await axios.put(`http://localhost:9000/cart/${item.id}`, { ...item, quantity: item.quantity - 1 })
        return response.data
    }
)

export const increase = createAsyncThunk(
    "cart/increase",
    async (data, { dispatch }) => {
        const item = data.item
       
        const response = await axios.put(`http://localhost:9000/cart/${item.id}`, { ...item, quantity: item.quantity + 1 })
        return response.data
    }
)

export const remove = createAsyncThunk(
    "cart/remove",
    async (id, { dispatch }) => {

        const response = await axios.delete(`http://localhost:9000/cart/${id}`)
        return {res:response.data,
            id:id
        }

    }
)





export const cartReducer = createSlice(
    {
        name: "cart",
        initialState: {
            cart: [],
            cartFromId:[],
            loading: false
        },
        reducers: {
            checkBox:(state,{payload})=>{
                state.cart=payload 
            },
           checkAll:(state,{payload}) =>{

               state.cart=payload
            }
        },
        extraReducers: {
            [getCart.pending]: (state, { payload }) => {
                state.loading = true
            },
            [getCart.fulfilled]: (state, { payload }) => {
                state.loading = false
                state.cart = payload
            },
            [getCart.rejected]: (state, { payload }) => {
                state.loading = false
            },
            
            [getCartFromId.pending]: (state, { payload }) => {
                state.loading = true
            },
            [getCartFromId.fulfilled]: (state, { payload }) => {
                state.loading = false
                state.cartFromId = payload
            },
            [getCartFromId.rejected]: (state, { payload }) => {
                state.loading = false
            },

            [addToCart.fulfilled]: (state, { payload }) => {
                    let index = state.cart.findIndex(e => e.id === payload.id)
                    if (index === -1) {
                        
                        state.cart.push(payload)
                    } else {
                        state.cart[index].quantity += 1
                    }
                alert("Success!! Added To Cart")
            },
            [addToCart.rejected]: (state, { payload }) => {
                state.loading = false
                alert("Error network")
            },

            [increase.fulfilled]: (state, { payload }) => {
                let index = state.cart.findIndex(e => e.id === payload.id)
                state.cart[index].quantity += 1
            },

            [decrease.fulfilled]: (state, { payload }) => {
                let index = state.cart.findIndex(e => e.id === payload.id)
                state.cart[index].quantity -= 1
            },
            [remove.fulfilled]: (state, { payload }) => {
                let index = state.cart.findIndex(e => e.id === payload.id)
                state.cart.splice(index, 1)

            },
            
            
        }
    }
)

const { reducer, actions } = cartReducer

export default cartReducer;
