import React, { useState } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, StyleSheet } from 'react-native';

export const TaskEditModal = ({ task, visible, onSave, onCancel }) => {
  const [currentEditingTask, setCurrentEditingTask] = useState(task);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ alignItems: 'center', justifyContent: 'center' }} >
        <TextInput
          placeholder="Edit title"
          defaultValue={task.title}
          onChangeText={(text) => setCurrentEditingTask({ ...currentEditingTask, title: text })}
        />
        <TextInput
          placeholder="Edit description"
          defaultValue={task.desc}
          onChangeText={(text) => setCurrentEditingTask({ ...currentEditingTask, desc: text })}
        />
        <TouchableOpacity title="Save" onPress={() => onSave(currentEditingTask)}>
          <Text style={styles.saveBTN}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity title="Cancel" onPress={onCancel} >
          <Text style={styles.cancelBTN}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  saveBTN: {
    margin: 10,
    fontSize: 20, color: 'red'
  },
  cancelBTN: {
    margin: 10,
    fontSize: 20
  }
});