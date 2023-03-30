import { createSlice } from "@reduxjs/toolkit"
import { createMessage, getMessages } from "./messageAction"


export interface INMessage {
    _id: string,
    sender: string
    content: string
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
    }
})

export default taskSlice.reducer