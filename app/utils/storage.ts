import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '@/store/slices/tasksSlice';

const TASKS_KEY = '@tasks_list';

export const saveTasksToStorage = async (tasks: Task[]) => {
    try {
        const jsonValue = JSON.stringify(tasks);
        await AsyncStorage.setItem(TASKS_KEY, jsonValue);
    } catch (e) {
        console.error("Помилка при збереженні у AsyncStorage", e);
    }
};

export const getTasksFromStorage = async (): Promise<Task[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(TASKS_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error("Помилка при читанні з AsyncStorage", e);
        return [];
    }
};