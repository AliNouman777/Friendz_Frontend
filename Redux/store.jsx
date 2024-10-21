import {configureStore} from '@reduxjs/toolkit'
import UserSlice from './Slice/UserSlice';
import PostSlice from './Slice/PostSlice';

const store = configureStore({
    reducer:{
        user:UserSlice,
        post:PostSlice
    }   
    
})

export default store;