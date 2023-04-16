import { configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import appStateSlice from "./features/appStateSlice";
import userReducer from "./features/user/userSlice"
import taskReducer from "./features/task/taskSlice"
import eventReducer from "./features/event/eventSlice"
import roomReducer from "./features/room/roomSlice"
import messageReducer from "./features/message/messageSlice"
import notificationReducer from "./features/notification/notificationSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
        task: taskReducer,
        event: eventReducer,
        room: roomReducer,
        message: messageReducer,
        // notification: notificationReducer,
        appState: appStateSlice,
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store