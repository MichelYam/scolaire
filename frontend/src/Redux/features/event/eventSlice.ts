import { createSlice } from "@reduxjs/toolkit"
import { createEvent, deleteEvent, getMyEvents } from "./eventAction"


export interface Event {
    _id: string,
    title: string,
    description?: string,
    assignee: string,
    date: string,
    timetable?: string;
    createdBy: string,
    type: 'Event'
}

interface IEvent {
    loading: boolean,
    error: string | null;
    events: Event[]
}

const initialState: IEvent = {
    loading: false,
    error: null,
    events: [],
}

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //create event
            .addCase(createEvent.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createEvent.fulfilled, (state, { payload }) => {
                state.loading = false
                state.events.push(payload)
                state.error = null
            })
            .addCase(createEvent.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })
            // get user events
            .addCase(getMyEvents.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getMyEvents.fulfilled, (state, { payload }: any) => {
                state.loading = false
                state.events = payload?.body
                state.error = null
            })
            .addCase(getMyEvents.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })
            //delete taks
            .addCase(deleteEvent.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteEvent.fulfilled, (state, { payload }: any) => {
                state.loading = false
                // state.events = state.events.filter(item => item._id !== payload.body.id)
                state.error = null
            })
            .addCase(deleteEvent.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })
    }
})

export default eventSlice.reducer