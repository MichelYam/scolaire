import { createSlice } from "@reduxjs/toolkit"
import { createMessage, getMessages, updateMessage, deleteMessage } from "./messageAction"
import { IUser } from "../../../Interfaces"


export interface INMessage {
    _id: string,
    sender: IUser
    content: string
    timeStamp: string
    type: 'Message'
}
export interface IMessage {
    loading: boolean,
    error: string | null;
    messages: INMessage[]
}

const initialState: IMessage = {
    loading: false,
    error: null,
    messages: [],
}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //create message
            .addCase(createMessage.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createMessage.fulfilled, (state, { payload }) => {
                state.loading = false
                state.messages.push(payload)
                state.error = null
            })
            .addCase(createMessage.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })
            // get user messages
            .addCase(getMessages.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getMessages.fulfilled, (state, { payload }: any) => {
                state.loading = false
                state.messages = payload?.body
                state.error = null
            })
            .addCase(getMessages.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })
            // update message
            .addCase(updateMessage.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateMessage.fulfilled, (state, { payload }: any) => {
                state.loading = false
                // state.messages = payload?.body
                state.messages = state.messages.map((message) =>
                    message._id === payload._id ? payload.body : message
                )
                state.error = null
            })
            .addCase(updateMessage.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })
            // delete message
            .addCase(deleteMessage.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteMessage.fulfilled, (state, { payload }: any) => {
                state.loading = false
                state.messages = state.messages.filter(item => item._id === payload.body)
                state.error = null
            })
            .addCase(deleteMessage.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })
    }
})

export default taskSlice.reducer