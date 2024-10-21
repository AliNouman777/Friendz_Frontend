import {createSlice} from "@reduxjs/toolkit"
import {Allpost,LikeAndUnlikePost,AsynComment,AsynViewComment,AsynDeleteComment,AsyncDeletePost,AsyncCreatePost} from "../AsyncSlice/Allpost"

const initialState={
    loading:false,
    posts:[],
    comment:[],
    error:[],
    message:"",
}

const PostSlice=createSlice({
    name:"Post",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(Allpost.pending,(state)=>{
            state.loading=true;
        })
        .addCase(Allpost.fulfilled,(state,action)=>{
            state.loading=false;
            state.posts=action.payload
        })
        .addCase(Allpost.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
        .addCase(LikeAndUnlikePost.pending,(state)=>{
            state.loading=true;
        })
        .addCase(LikeAndUnlikePost.fulfilled,(state,action)=>{
            state.loading=false
            state.like=action.payload
        })
        .addCase(LikeAndUnlikePost.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(AsynComment.pending,(state)=>{
            state.loading=true
        })
        .addCase(AsynComment.fulfilled,(state,action)=>{
            state.loading=false
        })
        .addCase(AsynComment.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
        .addCase(AsynViewComment.pending,(state)=>{
            state.loading=true
        })
        .addCase(AsynViewComment.fulfilled,(state,action)=>{
            state.loading=false
            state.comment=action.payload
        })
        .addCase(AsynViewComment.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
        .addCase(AsynDeleteComment.pending,(state)=>{
            state.loading=true
        })
        .addCase(AsynDeleteComment.fulfilled,(state,action)=>{
            state.loading=false
        })
        .addCase(AsynDeleteComment.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
        .addCase(AsyncDeletePost.pending,(state)=>{
            state.loading=true
        })
        .addCase(AsyncDeletePost.fulfilled,(state,action)=>{
            state.loading=false
        })
        .addCase(AsyncDeletePost.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
        .addCase(AsyncCreatePost.pending,(state)=>{
            state.loading=true;
        })
        .addCase(AsyncCreatePost.fulfilled,(state,action)=>{
            state.loading=false;
        })
        .addCase(AsyncCreatePost.rejected,(state,action)=>{
            state.loading=false;
        })
    }
    
})


export default PostSlice.reducer;