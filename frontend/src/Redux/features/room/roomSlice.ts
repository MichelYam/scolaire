import { createSlice } from "@reduxjs/toolkit"
import { IUser } from "../user/userAction";
import { createRoom, deleteRoom, getMyRooms } from "./roomAction"


interface Room {
    id: string,
    users: IUser[]
    messages: string[]
    type: 'Room'
}

interface IRoom {
    loading: boolean,
    error: string | null;
    rooms: Room[]
}

const initialState: IRoom = {
    loading: false,
    error: null,
    rooms: [],
}

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //create room
            .addCase(createRoom.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createRoom.fulfilled, (state, { payload }) => {
                state.loading = false
                state.rooms.push(payload)
                state.error = null
            })
            .addCase(createRoom.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })
            // get user rooms
            .addCase(getMyRooms.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getMyRooms.fulfilled, (state, { payload }: any) => {
                console.log(payload?.body);

                state.loading = false
                state.rooms = payload?.body
                state.error = null
            })
            .addCase(getMyRooms.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })
            //delete taks
            .addCase(deleteRoom.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteRoom.fulfilled, (state, { payload }: any) => {
                state.loading = false
                // state.rooms = state.rooms.filter(item => item._id !== payload.body.id)
                state.error = null
            })
            .addCase(deleteRoom.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })
    }
})

export default roomSlice.reducer