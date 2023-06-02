import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const getProducts=createAsyncThunk(
   "products/getproducts",
   async (thunkAPI)=>{
        const res= await axios.get("http://localhost:8000/products")       
        return res.data
   }
)
export const getProductsbyId=createAsyncThunk(
    "products/getproductsbyId",
    async (data,{dispatch})=>{
         const res= await axios.get(`http://localhost:8000/products/${data.id}`) 
         return res.data
    }
 )

const productsReducer=createSlice(
    {
        name:"products",
        initialState:{
            loading:false,
            products:[],
            product:{}
           
        },
        reducers:{
           
        },
        extraReducers:{
            [getProducts.pending]: (state,{payload})=>{
                state.loading=true
            },
            [getProducts.fulfilled]: (state,{payload})=>{             
                state.loading=false;
                state.products=payload              
            },
            [getProducts.rejected]: (state,{payload})=>{
                state.loading=false;

            },
            [getProductsbyId.pending]: (state,{payload})=>{
                state.loading=true
            },
            [getProductsbyId.fulfilled]: (state,{payload})=>{             
                state.loading=false;
                state.pet=payload              
            },
            [getProductsbyId.rejected]: (state,{payload})=>{
                state.loading=false;

            },
        }
    }
)

const { reducer, actions } = productsReducer

export default productsReducer;
