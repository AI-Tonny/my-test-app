import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
    id: string;
    title: string;
    completed: boolean;
}

interface TasksState {
    tasks: Task[];
}

const initialState: TasksState = {
    tasks: []
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(item => item.id !== action.payload);
        },
        setInitialTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        }
    }
})

export const { addTask, deleteTask, setInitialTasks } = tasksSlice.actions;
export default tasksSlice.reducer;