import type { RootState } from '../Redux/store';

export const selectUser = (state: RootState) => state.user
export const selectTask = (state: RootState) => state.task
export const selectEvent = (state: RootState) => state.event
export const selectRoom = (state: RootState) => state.room
export const selectMessage = (state: RootState) => state.message
// export const selectNotification = (state: RootState) => state.notification
