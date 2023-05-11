import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../user/userAction";

const BASE_URL = "http://localhost:3001/api/v1/notification";

interface INotificationParams {
    _id: string
    users: {}
    messages: string[]
}

export const sendFriendRequest = createAsyncThunk("notification/new", async (receiverId: string, { rejectWithValue, getState }) => {

    const { user }: any = getState()
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.userToken}`
            },
        }
        const { data } = await axios.post(`${BASE_URL}/new`, receiverId, config)
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

export const getFriendRequest = createAsyncThunk('notification/myNotifications', async (arg, { rejectWithValue, getState }) => {
    const { user }: any = getState()
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.userToken}`
            },
        }
        const { data } = await axios.get(`${BASE_URL}/`, config)

        return data
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})
export const acceptFriendRequest = createAsyncThunk("notification/new", async (receiverId: string, { rejectWithValue, getState }) => {

    const { user }: any = getState()
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.userToken}`
            },
        }
        const { data } = await axios.post(`${BASE_URL}/new`, receiverId, config)
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
export const rejectFriendRequest = createAsyncThunk('notification/delete', async (id: INotificationParams, { rejectWithValue }) => {

    try {
        const { data } = await axios.delete(`${BASE_URL}/delete/${id._id}`, { data: id });
        return data;
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})
