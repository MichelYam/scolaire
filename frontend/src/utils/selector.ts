import type { RootState } from '../Redux/store';

export const selectUser = (state: RootState) => state.user
export const selectTask = (state: RootState) => state.task
export const selectEvent = (state: RootState) => state.event
