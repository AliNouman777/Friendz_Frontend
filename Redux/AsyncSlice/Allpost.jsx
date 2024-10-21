import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const BaseURL =`http://localhost:4001`
const BaseURL = `https://friendz-backend.onrender.com`

export const Allpost = createAsyncThunk(
  "AllPost",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BaseURL}/post/all`, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const LikeAndUnlikePost = createAsyncThunk(
  "LikePost",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${BaseURL}/post/LikeandUnlike/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const AsynComment = createAsyncThunk(
  "Comment",
  async ({ id, comment }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${BaseURL}/post/CreatComment/${id}`,
        { comment },
        {
          withCredentials: true,
        }
      );m
      console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const AsynViewComment = createAsyncThunk(
  "viewComment",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${BaseURL}/post/viewcomment/${id}`,
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const AsynDeleteComment = createAsyncThunk(
  "deleteComment",
  async ({ id, commentId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${BaseURL}/post/deleteComment/${id}`,
        {
          data: { commentId },
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const AsyncDeletePost = createAsyncThunk(
  "deletePost",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${BaseURL}/post/delete/${id}`,
        {
         
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  
  }
);


export const AsyncCreatePost = createAsyncThunk("AsyncCreatePost", async ({image, caption}, {rejectWithValue}) => {
  try {

    const { data: res } = await axios.post(`${BaseURL}/post/upload`, {image,caption}, {
      withCredentials: true
    });
    return res;
  } catch (error) {
    console.log(error)
    return rejectWithValue(error);
  }
});
