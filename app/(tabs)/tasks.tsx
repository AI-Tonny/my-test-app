import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addTask, deleteTask, setInitialTasks } from '@/store/slices/tasksSlice';
import { saveTasksToStorage, getTasksFromStorage } from '../utils/storage';

export default function TasksScreen() {
    const [taskText, setTaskText] = useState('');
    const tasks = useAppSelector((state) => state.tasks.tasks);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const load = async () => {
            const data = await getTasksFromStorage();
            if (data.length > 0) {
                dispatch(setInitialTasks(data));
            }
        };
        load();
    }, []);

    const handleAdd = async () => {
        if (taskText.trim() === '') return;

        const newTask = {
            id: Date.now().toString(),
            title: taskText,
            completed: false,
        };

        dispatch(addTask(newTask));
        setTaskText('');

        await saveTasksToStorage([...tasks, newTask]);
    };

    const handleDelete = async (id: string) => {
        dispatch(deleteTask(id));
        const updated = tasks.filter(t => t.id !== id);
        await saveTasksToStorage(updated);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Напишіть завдання..."
                value={taskText}
                onChangeText={setTaskText}
            />
            <Button title="Додати завдання" onPress={handleAdd} />

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <Text>{item.title}</Text>
                        <TouchableOpacity onPress={() => handleDelete(item.id)}>
                            <Text style={{ color: 'red' }}>Видалити</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
    },
    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#eee'
    }
});