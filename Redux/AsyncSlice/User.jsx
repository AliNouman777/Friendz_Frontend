import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const BaseURL =`http://localhost:4001`
const BaseURL = `https://backend-todo-app-pby6.onrender.com`


export const AllUser=createAsyncThunk("AllUser",async(_,{rejectWithValue})=>{
   try {
    const {data}=await axios.get(`${BaseURL}/user/all`,{
        withCredentials:true
    });
    return data;
    
   } catch (error) {
    return rejectWithValue(error.message);
   }
})


export const GetUser=createAsyncThunk("GetUser",async(id,{rejectWithValue})=>{
    try {
     const {data}=await axios.get(`${BaseURL}/user/${id}`,{
         withCredentials:true
     });
     return data;
     
    } catch (error) {
     return rejectWithValue(error.message);
    }

})

export const AsyncFollowUser=createAsyncThunk("AsyncFollowUser",async(id,{rejectWithValue})=>{
    try {

        const {data}=await axios.get(`${BaseURL}/user/follower/${id}`,{
            withCredentials:true
        })

        return data;
    }
     catch (error) {
        return rejectWithValue(error.message);
    }
})


export const AsyncFollowingList =createAsyncThunk("AsyncFollowingList",async(_,{rejectWithValue})=>{
    try {
        const {data}=await axios.get(`${BaseURL}/user/myfollowing`,{
            withCredentials:true
        })
        return data;
    
        
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

export const AsyncFollowerList =createAsyncThunk("AsyncFollowerList",async(_,{rejectWithValue})=>{
    try {
        const {data}=await axios.get(`${BaseURL}/user/myfollower`,{
            withCredentials:true
        })
        return data;
    
        
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

export const AsyncChangeProfile=createAsyncThunk("AsyncChangeProfile",async(data,{rejectWithValue})=>{
    const {email, name}=data;
    try {
    
        const {data:res}=await axios.put(`${BaseURL}/user/changeprofile`,
        {email,name},
        {
            withCredentials:true
        })
        return res;
    } catch (error) {
        return rejectWithValue(error.message);
    }

})

export const AsyncChangePassword=createAsyncThunk("AsyncChangePassword",async(data,{rejectWithValue})=>{
    try {
        const {data:res}=await axios.put(`${BaseURL}/user/changepassword`,data,{
            withCredentials:true
        })
        return res;
    
        
    } catch (error) {
        return rejectWithValue(error.message);
    }
})
   

export const AsyncDeleteProfile =createAsyncThunk("DeleteProfile",async(_,{rejectWithValue})=>{

    try {
        const {data:res}=await axios.delete(`${BaseURL}/user/deleteprofile`,{
            withCredentials:true
        })
        return res;
    } catch (error) {
        return rejectWithValue(error.message);
    }

})

export const AsyncLogoutProfile = createAsyncThunk("LogoutProfile",async(_,{rejectWithValue})=>{
    try {
        const {data:res}=await axios.get(`${BaseURL}/user/logout`,{
            withCredentials:true
        })
        return res;
    } catch (error) {
        return rejectWithValue(error.message);
    }

})