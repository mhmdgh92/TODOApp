import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, TaskEditModal, AddTask } from './Components'

const Home = () => {

  const [tasks, setTasks] = useState([]);
  const [showTaskEditModal, setShowTaskEditModal] = useState(false);
  const [currentEditingTask, setCurrentEditingTask] = useState({ id: 0, title: '', desc: '' });

  //To load stored tasks on initialize
  useEffect(() => {
    loadTasks();
  }, []);

  // Save tasks to AsyncStorage whenever the tasks state is updated
  useEffect(() => {
    saveTasks();
  }, [tasks]);

  // Load tasks from AsyncStorage
  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.log('Error loading tasks:', error);
    }
  };

  // Save tasks from AsyncStorage
  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.log('Error saving tasks:', error);
    }
  };

  // Add new tasks
  async function onAddTask(newTaskTitle, newTaskDesc) {
    if (newTaskTitle !== '') {
      const newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        desc: newTaskDesc
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      await AsyncStorage.setItem('savedTasks', JSON.stringify(tasks));
    }
  };

  // On edit task clicked
  const onEditTask = (task) => {
    setCurrentEditingTask(task);
    setShowTaskEditModal(true);
  };

  // Delete tasks
  const onDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // On edit task saved
  const onSaveEditTask = (currentEditingTask) => {
    setTasks(tasks.map((task) =>
      task.id === currentEditingTask.id ? currentEditingTask : task
    ));
    setShowTaskEditModal(false);
  };

  return (
    <View style={styles.cont}>

      <AddTask onAddTask={onAddTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Task
            task={item}
            onEdit={(task) => onEditTask(task)}
            onDelete={onDeleteTask}
          />
        )}
      />

      {showTaskEditModal ? <TaskEditModal
        task={currentEditingTask}
        visible={showTaskEditModal}
        onSave={onSaveEditTask}
        onCancel={() => setShowTaskEditModal(false)} /> : <View />}
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    padding: 20
  }
});

export default Home;