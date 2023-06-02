import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

export const getUserLogin=createAsyncThunk(
    "userLogin/getUserLogin",
    async ()=>{
        const res= await axios.get(`http://localhost:8000/userLogin`)
        return res.data
    }
)

const userLoginReducer=createSlice(
    {
        name:"userLogin",
        initialState:{
            loading:false,
            userLogin:[]
        },
        reducers:{},
        extraReducers:{
              [getUserLogin.pending]:(state)=>{
                state.loading=true;
            },
            [getUserLogin.fulfilled]:(state,{payload})=>{   
                state.loading=false;
                state.users=payload
            },  
            [getUserLogin.rejected]:(state,{payload})=>{            
                state.loading=false;
            },
        }
    }
)