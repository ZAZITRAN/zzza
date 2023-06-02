import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getWhishlist=createAsyncThunk(
    "whishlist/getWhishlist",
    async (data,{dispatch})=>{
        const res= await axios.get(`http://localhost:9000/whishlist`)
        return res.data
    }
)

export const addPetToWhishlist=createAsyncThunk(
    "whishlist/addToWhishlist",
    async (data,{dispatch}) =>{
        const {item,userId,}=data
        
      
            const res=await axios.post(`http://localhost:9000/whishlist`, 
            {   
               ...item,id:Date.now(),class:`pets`,userId:userId,petId:item.id
             
            })
            return res.data
       
    }
)
export const addProductToWhishlist=createAsyncThunk(
    "whishlist/addToWhishlist",
    async (data,{dispatch}) =>{
        const {item,userId,}=data
        
      
            const res=await axios.post(`http://localhost:9000/whishlist`, 
            {   
               ...item,id:Date.now(),class:`products`,userId:userId,productId:item.id
             
            })
            return res.data
       
    }
)
export const removeWhishlist=createAsyncThunk(
    "whishlist/removeWhishlist",
    async (id,{dispatch})=>{
  
        let res=await axios.delete(`http://localhost:9000/whishlist/${id}`)
        .then(response=>{
            
           return response.data
        })
        .catch(err=>{
            console.log(err);
        }

        )
        return {res:res, id:id}
    }
)
export const whishlistReducer=createSlice(
   {
    name:"whishlist",
    initialState:{
        whishlist:[],
        loading:false,
    },
    reducers:{},
    extraReducers:{
        [getWhishlist.pending]: (state,{payload})=>{
            state.loading=true
        },
        [getWhishlist.fulfilled]:(state,{payload})=>{
            state.loading=false;
            state.whishlist=payload
        },
        [getWhishlist.rejected]:(state,{payload})=>{
            state.loading=false;
        },
        [addPetToWhishlist.rejected]:(state,{payload})=>{
            state.loading=false;
            alert("Error Network")
        },
        [addPetToWhishlist.fulfilled]:(state,{payload})=>{
            state.loading=false;
           if (payload!==undefined) {
            
             state.whishlist.push(payload)
           
           } 
          
        },
        [addProductToWhishlist.rejected]:(state,{payload})=>{
            state.loading=false;
            alert("Error Network")
        },
        [addProductToWhishlist.fulfilled]:(state,{payload})=>{
            state.loading=false;
           if (payload!==undefined) {
            
             state.whishlist.push(payload)
           
           } 
          
        },
      
        [removeWhishlist.fulfilled]:(state,{payload})=>{
          
            let index = state.whishlist.findIndex(e => e.id === payload.id)
            state.whishlist.splice(index, 1)   
             
              
        }
      
   
    }
   }
)
/* const { reducer, actions } = whishlistReducer */

export default whishlistReducer;