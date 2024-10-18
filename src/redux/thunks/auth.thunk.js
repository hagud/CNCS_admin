import { createAsyncThunk } from "@reduxjs/toolkit";

export const authThunk = createAsyncThunk(
    'auth/signIn',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            // const res = await authController.signIn(email, password);
            // if (res.status !== 200) {
            //     return rejectWithValue(res.message)
            // }
            // return { access: res.access }
            console.log('authThunk', email, password)
        }
        catch (error) {
            return rejectWithValue(error)
        }
    }
)