import { createSlice } from "@reduxjs/toolkit";
import { IUser, INotification } from "../../../Interfaces";
import { clearStorage } from "../../../utils/TokenStorage";
import { userLogin, userRegister, getUserDetails, updateUserProfile, getAllUsers, deleteUser, getFriendList, sendFriendRequest, acceptFriendRequest, getFriendRequest, rejectFriendRequest } from './userAction'

type friendList = IUser

export interface IDataAPI {
    isAuthenticated: boolean,
    loading: boolean,
    userInfo: IUser | null,
    userToken: string | null,
    error: string | null,
    allUsers: IUser[],
    notifications: INotification[],
    friendList: friendList[]
}

const initialState: IDataAPI = {
    isAuthenticated: false,
    loading: false,
    userInfo: null,
    userToken: sessionStorage.getItem('userToken') || localStorage.getItem('userToken') || null,
    error: null,
    allUsers: [],
    friendList: [],
    notifications: [],
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
                state.error = null
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
                state.error = null
            })
            .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
                state.loading = false
                state.userInfo = payload?.body
            })
            .addCase(updateUserProfile.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })

            //Get all users
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getAllUsers.fulfilled, (state, { payload }) => {
                state.loading = false
                state.allUsers = payload?.body
            })
            .addCase(getAllUsers.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })

            //Get all users
            .addCase(getFriendList.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getFriendList.fulfilled, (state, { payload }) => {
                state.loading = false
                state.friendList = payload?.body
            })
            .addCase(getFriendList.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })

            //Delete user
            .addCase(deleteUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteUser.fulfilled, (state, { payload }) => {
                state.loading = false
                state.allUsers = state.allUsers.filter(user => user._id !== payload.id)
            })
            .addCase(deleteUser.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })

            // Notification Friend Request
            // Send friend Request
            .addCase(sendFriendRequest.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(sendFriendRequest.fulfilled, (state, { payload }) => {
                state.loading = false
                state.notifications.push(payload)
                state.error = null
            })
            .addCase(sendFriendRequest.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })
            // get all friend Request
            .addCase(getFriendRequest.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getFriendRequest.fulfilled, (state, { payload }: any) => {
                state.loading = false
                state.notifications = payload?.body
                state.error = null
            })
            .addCase(getFriendRequest.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })
            //Accept Friend request
            .addCase(acceptFriendRequest.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(acceptFriendRequest.fulfilled, (state, { payload }: any) => {
                console.log("payload", payload)
                state.loading = false
                state.notifications = payload?.body
                state.error = null
            })
            .addCase(acceptFriendRequest.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })
            //Reject friend request
            .addCase(rejectFriendRequest.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(rejectFriendRequest.fulfilled, (state, { payload }: any) => {
                state.loading = false
                state.notifications = state.notifications.filter(item => item._id !== payload.body.id)
                state.error = null
            })
            .addCase(rejectFriendRequest.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })

    }
});
export const { logout } = userSlice.actions;
export default userSlice.reducer