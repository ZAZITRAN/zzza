import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
 
export const getAdressUsers= createAsyncThunk(
   "users/getUsers",
    async (data, {dispatch})=>{
        const {id}=data
        const res=await axios.get(`http://localhost:8000/adress/${id}`)
        return res.data
    }
)
export const postAdressUsers= createAsyncThunk(
    "users/getUsers",
     async (data, {dispatch})=>{
        const {info,id}=data
         const res=await axios.post(`http://localhost:8000/adress/${id}`)
         return res.data
     }
)

const usersReducer=createSlice(
    {
        name:"users",      
        initialState:{
            loading:false,
            users:[],
            adress:{}         
        },
        reducers:{},
        extraReducers:{
            [getAdressUsers.pending]:(state)=>{
                state.loading=true;
            },
            [getAdressUsers.fulfilled]:(state,{payload})=>{   
                state.loading=false;
                state.users=payload
            },  
            [getAdressUsers.rejected]:(state,{payload})=>{            
                state.loading=false;
            },
           
        }

        
    }
)
const {reducer, actions}=usersReducer

export default usersReducer