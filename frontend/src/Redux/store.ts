import { configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import appStateSlice from "./features/appStateSlice";
import userReducer from "./features/user/userSlice"
import taskReducer from "./features/task/taskSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
        task: taskReducer,
        appState: appStateSlice,
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store