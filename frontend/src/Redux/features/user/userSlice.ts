import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../Interfaces";
import { clearStorage } from "../../../utils/TokenStorage";
import { userLogin, userRegister, getUserDetails, updateUserProfile, getAllUsers } from './userAction'



export interface IDataAPI {
    isAuthenticated: boolean,
    loading: boolean,
    userInfo: IUser | null,
    userToken: string | null,
    error: string | null,
    allUsers: [],
}

const initialState: IDataAPI = {
    isAuthenticated: false,
    loading: false,
    userInfo: null,
    userToken: sessionStorage.getItem('userToken') || localStorage.getItem('userToken') || null,
    error: null,
    allUsers : [],
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            clearStorage()
            state.loading = false
            state.userInfo = null
            state.userToken = null
            state.error = null
            state.isAuthenticated = false
        },
    },
    extraReducers: (builder) => {
        builder
            //Login
            .addCase(userLogin.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(userLogin.fulfilled, (state, { payload }) => {
                state.loading = false
                state.userToken = payload?.body.token
                state.isAuthenticated = true
            })
            .addCase(userLogin.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })
            //Register
            .addCase(userRegister.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(userRegister.fulfilled, (state, { payload }) => {
                state.loading = false
                state.userToken = payload?.body.token
                state.isAuthenticated = true

            })
            .addCase(userRegister.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })
            //Get user
            .addCase(getUserDetails.pending, (state) => {
                state.loading = true
            })
            .addCase(getUserDetails.fulfilled, (state, { payload }) => {
                state.loading = false
                state.userInfo = payload?.body
            })
            .addCase(getUserDetails.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })

            //Update user
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
                state.loading = false
                state.userInfo = payload?.body
            })
            .addCase(updateUserProfile.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })

            //Get all  users
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllUsers.fulfilled, (state, { payload }) => {
                state.loading = false
                state.allUsers = payload?.body
            })
            .addCase(getAllUsers.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })

    }
});
export const { logout } = userSlice.actions;
export default userSlice.reducer