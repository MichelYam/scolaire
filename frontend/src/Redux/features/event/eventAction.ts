import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3001/api/v1/events";

interface IEventParams {
    _id?: string
    title?: string,
    description?: string,
    assignee?: string;
    date?: string;
    timetable?: string;
    createdBy?: string;
}

export const createEvent = createAsyncThunk("event/create", async ({ title, description, assignee, date, timetable }: IEventParams, { rejectWithValue, getState }) => {

    const { user }: any = getState()
    const createdBy = [user.userInfo.firstName, user.userInfo.lastName].join(" ")
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.userToken}`
            },
        }
        const { data } = await axios.post(`${BASE_URL}/`, { title, description, date, assignee, createdBy, timetable }, config)
        // console.log(data);

        return data.body
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})

export const getMyEvents = createAsyncThunk('event/myEvents', async (arg, { rejectWithValue, getState }) => {
    const { user }: any = getState()
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.userToken}`
            },
        }
        const { data } = await axios.get(`${BASE_URL}/`, config)
        // console.log(data);

        return data
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})

export const updateEvent = createAsyncThunk("user/updateEvent", async (eventData: IEventParams, { rejectWithValue, getState }) => {
    const { user }: any = getState()
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.userToken}`,
            },
        }
        const { data } = await axios.put(`${BASE_URL}/${eventData._id}`, eventData, config);
        // console.log("update:",data)
        return data
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
}
)

export const deleteEvent = createAsyncThunk('user/delete', async (_id: IEventParams, { rejectWithValue }) => {

    try {
        const { data } = await axios.delete(`${BASE_URL}/${_id._id}`, { data: _id });
        return data;
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})
