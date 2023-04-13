import { createSlice } from "@reduxjs/toolkit"
import { IUser } from "../user/userAction";
import { createNotification, deleteNotification, getMyNotifications } from "./notificationAction"


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
            //create notification
            .addCase(createNotification.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createNotification.fulfilled, (state, { payload }) => {
                state.loading = false
                state.notifications.push(payload)
                state.error = null
            })
            .addCase(createNotification.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })
            // get user notifications
            .addCase(getMyNotifications.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getMyNotifications.fulfilled, (state, { payload }: any) => {
                state.loading = false
                state.notifications = payload?.body
                state.error = null
            })
            .addCase(getMyNotifications.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })
            //delete taks
            .addCase(deleteNotification.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteNotification.fulfilled, (state, { payload }: any) => {
                state.loading = false
                // state.notifications = state.notifications.filter(item => item._id !== payload.body.id)
                state.error = null
            })
            .addCase(deleteNotification.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })
    }
})

export default notificationSlice.reducer