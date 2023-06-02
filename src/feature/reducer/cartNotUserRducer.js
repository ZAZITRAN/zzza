import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



/* export const getcartOnLocal=createAsyncThunk(
    "cartNotUser/getCartOnLocal",
    async ()=>{

    }
) */
export const getcartOnLocal=create
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (data, { dispatch }) => {
        const {  item } = data
        if (findIndex === -1) {
            const res = await axios.post(`http://localhost:9000/cart`, {...item, id:Date.now()})
            return res.data
        }
        else {
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
       
        const response = await axios.put(`http://localhost:8000/cart/${item.id}`, { ...item, quantity: item.quantity + 1 })
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





export const cartNotUserReducer = createSlice(
    {
        name: "cart",
        initialState: {
            cart: [],
            loading: false
        },
        reducers: {
            checkBox:(state,action)=>{

                state.cart=action.payload 
            },
           checkAll:(state,action) =>{
               state.cart=action.payload
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

            [addToCart.fulfilled]: (state, { payload }) => {
                if (payload !== undefined) {
                    let index = state.cart.findIndex(e => e.id === payload.id)
                    if (index === -1) {
                        state.cart.push(payload)
                    } else {
                        state.cart[index].quantity += 1
                    }
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
            }
        }
    }
)

const { reducer, actions } = cartNotUserReducer

export default cartNotUserReducer;
