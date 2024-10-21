import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const BaseURL =`http://localhost:4001`

export const SignupCall = createAsyncThunk("/signup", async ({ name, email, password,avatar }, { rejectWithValue }) => {
       try {
              const { data } = await axios.post(`${BaseURL}/user/register`,
               { name, email, password,avatar },
               { withCredentials: true });
              return { data, status: 201 };

       } catch (error) {
              const message = error.response.data.message;
              const status = error.response.status;
              return rejectWithValue({ message, status });
       }
})



