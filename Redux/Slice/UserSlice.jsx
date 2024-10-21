import { createSlice, isAction } from '@reduxjs/toolkit'
import { SignupCall } from '../AsyncSlice/signUp'
import { LoginCall } from '../AsyncSlice/LoginCall'
import { LoadUser } from '../AsyncSlice/LoadUser'
import { AllUser,GetUser ,AsyncFollowUser ,AsyncFollowingList,AsyncFollowerList,AsyncChangeProfile,AsyncChangePassword,AsyncDeleteProfile,AsyncLogoutProfile} from '../AsyncSlice/User'

const initialState = {
    loading: false,
    isAuth: false,
    user: [],
    AllUserdata:[],
    ParticularUser:[],
    follow:"",
    followingList:[],
    followerList:[],
    message:""
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(SignupCall.pending, (state) => {
          state.loading = true;
          state.isAuth = false;
        })
        .addCase(SignupCall.fulfilled, (state) => {
          state.loading = false;
          state.isAuth = true;
        })
        .addCase(SignupCall.rejected, (state, action) => {
          state.loading = false;
          state.isAuth = false;
        })
        .addCase(LoginCall.pending, (state) => {
          state.loading = true;
          state.isAuth = false;
        })
        .addCase(LoginCall.fulfilled, (state, action) => {
          state.loading = false;
          state.isAuth = true;
        })
        .addCase(LoginCall.rejected, (state, action) => {
          state.loading = false;
          state.isAuth = false;
        })
        .addCase(LoadUser.pending, (state,action) => {
          state.loading = true;
          state.error = action.payload;
        })
        .addCase(LoadUser.fulfilled, (state, action) => {
          state.loading = false;
          state.isAuth = true;  
          state.user=action.payload
        })
        .addCase(LoadUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(AllUser.pending, (state,action) => {
          state.loading=true
        })
        .addCase(AllUser.fulfilled, (state, action) => {
          state.loading=false
          state.AllUserdata=action.payload.AllUsers
        })
        .addCase(AllUser.rejected, (state, action) => {
          state.loading=false
          state.error=action.payload
        
        })
        .addCase(GetUser.pending, (state) => {
          state.loading=true
        })
        .addCase(GetUser.fulfilled, (state, action) => {
          state.loading=false;
          state.ParticularUser=action.payload
        })
        .addCase(GetUser.rejected, (state, action) => {
          state.loading=false;
          state.error=action.payload
        })
        .addCase(AsyncFollowUser.pending, (state) => {
          state.loading=true
        })
        .addCase(AsyncFollowUser.fulfilled, (state, action) => {
          state.loading=false;
          state.follow=action.payload
        })
        .addCase(AsyncFollowUser.rejected, (state, action) => {
          state.loading=false;
          state.error=action.payload
        })
        .addCase(AsyncFollowingList.pending, (state) => {
          state.loading=true
        })
        .addCase(AsyncFollowingList.fulfilled, (state, action) => {
          state.loading=false;
          state.followingList=action.payload
        })
        .addCase(AsyncFollowingList.rejected, (state, action) => {
          state.loading=false;
          state.error=action.payload
        })
        .addCase(AsyncFollowerList.pending, (state) => {
          state.loading=true
        })
        .addCase(AsyncFollowerList.fulfilled, (state, action) => {
          state.loading=false;
          state.followerList=action.payload
        })
        .addCase(AsyncFollowerList.rejected, (state, action) => {
          state.loading=false;
          state.error=action.payload
        })
        .addCase(AsyncChangeProfile.pending, (state) => {
          state.loading=true
        })
        .addCase(AsyncChangeProfile.fulfilled, (state, action) => {
          state.loading=false;
        })
        .addCase(AsyncChangeProfile.rejected, (state, action) => {
          state.loading=false;
          state.error=action.payload
        })
        .addCase(AsyncChangePassword.pending, (state) => {
          state.loading=true
        })
        .addCase(AsyncChangePassword.fulfilled, (state, action) => {
          state.loading=false;
          state.message=action.payload
        })
        .addCase(AsyncChangePassword.rejected, (state, action) => {
          state.loading=false;
          state.error=action.payload
        })
        .addCase(AsyncDeleteProfile.pending, (state) => {
          state.loading=true
        })
        .addCase(AsyncDeleteProfile.fulfilled, (state, action) => {
          state.loading=false;
          state.isAuth=false
        })
        .addCase(AsyncDeleteProfile.rejected, (state, action) => {
          state.loading=false;
          state.isAuth=true
          state.error=action.payload
        })
        .addCase(AsyncLogoutProfile.pending, (state) => {
          state.loading=true
        })
        .addCase(AsyncLogoutProfile.fulfilled, (state, action) => {
          state.loading=false;
          state.isAuth=false
        })
        .addCase(AsyncLogoutProfile.rejected, (state, action) => {
          state.loading=false;
          state.isAuth=true
          state.error=action.payload
        })
    }
  });

export default UserSlice.reducer