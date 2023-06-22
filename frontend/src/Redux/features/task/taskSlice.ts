import { createSlice } from "@reduxjs/toolkit"
import { createTask, deleteTask, getMyTasks, getMyTasksCreated } from "./taskAction"
import { IUser } from "../../../Interfaces";


export interface Task {
    _id: string,
    title: string,
    description: string,
    assignee: string,
    dateDue: string,
    createdBy: IUser,
    date: string;
    status: string,
    type: 'Task'
}
interface ITask {
    loading: boolean,
    error: any
    tasks: Task[]
}

const initialState: ITask = {
    loading: false,
    error: null,
    tasks: [],
}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //create task
            .addCase(createTask.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createTask.fulfilled, (state, { payload }) => {
                state.loading = false
                state.tasks.push(payload)
                state.error = null
            })
            .addCase(createTask.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })
            // get user tasks
            .addCase(getMyTasks.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getMyTasks.fulfilled, (state, { payload }: any) => {
                state.loading = false
                state.tasks = payload?.body
                state.error = null
            })
            .addCase(getMyTasks.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })
            // get user tasks assignee
            .addCase(getMyTasksCreated.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getMyTasksCreated.fulfilled, (state, { payload }: any) => {
                state.loading = false
                state.tasks = payload?.body
                state.error = null
            })
            .addCase(getMyTasksCreated.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })
            //delete taks
            .addCase(deleteTask.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteTask.fulfilled, (state, { payload }: any) => {
                state.loading = false
                state.tasks = state.tasks.filter(item => item._id !== payload.body.id)
                state.error = null
            })
            .addCase(deleteTask.rejected, (state, { payload }: any) => {
                state.loading = false
                state.error = payload
            })
    }
})

export default taskSlice.reducer