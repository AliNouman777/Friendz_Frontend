import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const BaseURL =`http://localhost:4001`

export const LoadUser = createAsyncThunk("Loaduser", async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BaseURL}/user/me`,{
        withCredentials:true
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });