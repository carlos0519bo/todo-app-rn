import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Todo } from '../types';
import { useTodoStore } from '../store/todoStore';

export const CheckBox = ({ item }: { item: Todo }) => {
  const { completeTask } = useTodoStore();

  return item.isToday ? (
    <TouchableOpacity
      onPress={() => completeTask(item.id)}
      style={item.isCompleted ? styles.checked : styles.unChecked}
    >
      {item.isCompleted && <Entypo name="check" size={16} color="#FAFAFA" />}
    </TouchableOpacity>
  ) : (
    <View style={styles.forTomorroy}>
      <Entypo name="controller-record" size={16} color="#262626" />
    </View>
  );
};

const styles = StyleSheet.create({
  checked: {
    width: 20,
    height: 20,
    backgroundColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  unChecked: {
    width: 20,
    height: 20,
    borderWidth: 2,
    backgroundColor: '#FFF',
    borderColor: '#E8E8E8',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  forTomorroy: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
