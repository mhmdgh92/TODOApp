import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export const AddTask = ({ onAddTask }) => {

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDesc, setNewTaskDesc] = useState('');

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Add new task title"
                value={newTaskTitle}
                onChangeText={(text) => setNewTaskTitle(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Add new task description"
                value={newTaskDesc}
                onChangeText={(text) => setNewTaskDesc(text)}
            />

            <TouchableOpacity style={styles.addBTN} onPress={() => {
                onAddTask(newTaskTitle, newTaskDesc);
                setNewTaskTitle('');
                setNewTaskDesc('');
            }}>
                <Text style={styles.addBTNText}>Add Task</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        margin: 10
    },
    addBTN: {
        backgroundColor: '#87CEEB',
        padding: 10,
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 16,
    },
    addBTNText: {
        color: 'black',
        fontWeight: 'bold',
    }
});