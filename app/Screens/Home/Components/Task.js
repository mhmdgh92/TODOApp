import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const Task = ({ task, onEdit, onDelete }) => {

  return (
    <View key={task.id} style={styles.task}>
      <View style={styles.innerTask}>
        <Text>{task.title}</Text>
        <TouchableOpacity onPress={() => onEdit(task)}>
          <Text style={styles.editBTNText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.innerTask}>
        <Text>{task.desc}</Text>
        <TouchableOpacity onPress={() => onDelete(task.id)}>
          <Text style={styles.deleteBTNText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  task: {
    borderColor: 'darkGrey',
    borderWidth: 1,
    justifyContent: 'space-between',
    padding: 2,
    margin: 5
  },
  innerTask: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editBTNText: {
    margin: 3,
    color: 'grey',
    fontWeight: 'bold',
  },
  deleteBTNText: {
    margin: 3,
    color: 'red',
    fontWeight: 'bold',
  },
});