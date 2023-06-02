import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const getPets=createAsyncThunk(
   "pets/getPets",
   async (thunkAPI)=>{
        const res= await axios.get("http://localhost:8000/pets")       
        console.log(res.data);
        return res.data
   }
)

export const getPetsbyId=createAsyncThunk(
    "pets/getPetsbyId",
    async (data,{dispatch})=>{
         const res= await axios.get(`http://localhost:8000/pets/${data.id}`) 
         return res.data
    }
 )

const petsReducer=createSlice(
    {
        name:"pets",
        initialState:{
            loading:false,
            pets:[],
            pet:{},
           
        },
        reducers:{
           
        },
        extraReducers:{
            [getPets.pending]: (state,{payload})=>{
                state.loading=true
            },
            [getPets.fulfilled]: (state,{payload})=>{ 
                          
                state.loading=false;
                state.pets=payload             
            },
            [getPets.rejected]: (state,{payload})=>{
                state.loading=false;

            },
            [getPetsbyId.pending]: (state,{payload})=>{
                state.loading=true
            },
            [getPetsbyId.fulfilled]: (state,{payload})=>{             
                state.loading=false;
                state.pet=payload              
            },
            [getPetsbyId.rejected]: (state,{payload})=>{
                state.loading=false;

            },

          /*   [filterPets.pending]: (state, {payload})=>{
                state.loading=true;
            },
            [filterPets.fulfilled]: (state,{payload})=>{             
                state.loading=false;
                state.petsFiltered=payload
                             
            },
            [filterPets.rejected]: (state,{payload})=>{
                state.loading=false;

            }, */
        }
    }
)

const { reducer, actions } = petsReducer

export default petsReducer;
