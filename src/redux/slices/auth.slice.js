import { createSlice } from '@reduxjs/toolkit'
import { authThunk } from '../thunks/auth.thunk'
import { hasExpiredToken } from '../../utils/jwt'

const initialState = {
    isAuth: localStorage.getItem('accessCncs') !== null ? !hasExpiredToken(localStorage.getItem('accessCncs')) : false,
    access: localStorage.getItem('accessCncs') !== null ? localStorage.getItem('accessCncs') : null,
    success: localStorage.getItem('accessCncs') !== null,
    error: null,
    loading: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signOut: state => {
            localStorage.removeItem("accessCncs");
            state.access = null
            state.isAuth = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(authThunk.pending, (state) => {
            return (state = {
                ...initialState,
                loading: true,
                isAuth: false,
                access: null
            })
        })
        builder.addCase(authThunk.fulfilled, (state, action) => {
            localStorage.setItem("accessCncs", action.payload.access);
            return (state = {
                ...initialState,
                loading: false,
                success: true,
                access: action.payload.access,
                isAuth: true,
            })
        })
        builder.addCase(authThunk.rejected, (state, action) => {
            return (state = {
                ...initialState,
                error: action.payload,
                isAuth: false,
                access: null
            })
        })
    }
})

export const { signOut } = authSlice.actions

export default authSlice.reducer