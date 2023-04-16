import { createSlice } from "@reduxjs/toolkit"
import { IUser } from "../user/userAction";
import { sendFriendRequest, rejectFriendRequest, getFriendRequest, acceptFriendRequest } from "./notificationAction"


export interface Notification {
    _id: string,
    users: IUser[]
    messages: string[]
    type: 'Notification'
}

interface INotification {
    loading: boolean,
    error: string | null;
    notifications: Notification[]
}

const initialState: INotification = {
    loading: false,
    error: null,
    notifications: [],
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //send friend request
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
                state.loading = false
                // state.notifications = state.notifications.filter(item => item._id !== payload.body.id)
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
                // state.notifications = state.notifications.filter(item => item._id !== payload.body.id)
                state.error = null
            })
            .addCase(rejectFriendRequest.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })
    }
})

export default notificationSlice.reducer