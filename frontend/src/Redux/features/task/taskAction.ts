import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3001/api/v1/tasks";

interface ITaskParams {
    _id?: string
    title?: string,
    description?: string,
    assignee?: string;
    dateDue?: string;
    date?: string;
}

export const createTask = createAsyncThunk("task/create", async ({ title, description, assignee, dateDue }: ITaskParams, { rejectWithValue, getState }) => {

    const { user }: any = getState()
    const createdBy = user.userInfo.email
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.userToken}`
            },
        }
        const { data } = await axios.post(`${BASE_URL}`, { title, description, dateDue, assignee, createdBy }, config)
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

export const getMyTasks = createAsyncThunk('task/myTasks', async (arg, { rejectWithValue, getState }) => {
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

export const getMyTasksAssignee = createAsyncThunk('task/myTasksAssignee', async (arg, { rejectWithValue, getState }) => {
    const { user }: any = getState()
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.userToken}`
            },
        }
        const { data } = await axios.post(`${BASE_URL}/myTasksAssignee`, arg, config)
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

export const updateTask = createAsyncThunk("user/updateTask", async (taskData: ITaskParams, { rejectWithValue, getState }) => {
    const { user }: any = getState()
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.userToken}`,
            },
        }
        const { data } = await axios.put(`${BASE_URL}/${taskData._id}`, taskData, config);
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

export const deleteTask = createAsyncThunk('user/delete', async (_id: ITaskParams, { rejectWithValue }) => {

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
