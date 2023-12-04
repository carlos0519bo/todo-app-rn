import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Todo } from '../types';
import { CheckBox } from './CheckBox';
import { Entypo } from '@expo/vector-icons';
import moment from 'moment';
import { useTodoStore } from '../store/todoStore';

export const TodoItem = ({ item }: { item: Todo }) => {
  const { deleteTask } = useTodoStore();

  const createTwoButtonAlert = () =>
    Alert.alert('¡Alerta!', '¿Estás seguro de eliminar la tarea?', [
      {
        text: 'Cancelar',
        onPress: () => {
          return;
        },
        style: 'cancel',
      },
      {
        text: 'Eliminar',
        onPress: () => deleteTask(item.id),
        style: 'destructive',
      },
    ]);

  return (
    <View style={sytles.container}>
      <CheckBox item={item} />
      <View style={sytles.dataContainer}>
        <View>
          <Text selectable style={[sytles.title, item.isCompleted && sytles.isCompleted]}>
            {item.title}
          </Text>
          <Text style={[sytles.hour, item.isCompleted && sytles.isCompleted]}>
            {moment(item.hour).format('HH:mm')}
          </Text>
        </View>
        <TouchableOpacity onPress={createTwoButtonAlert}>
          <Entypo name="trash" size={16} color="grey" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const sytles = StyleSheet.create({
  container: {
    gap: 15,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#737373',
  },
  hour: {
    fontSize: 13,
    color: '#A3A3A3',
  },
  isCompleted: {
    textDecorationLine: 'line-through',
    color: '#73737330',
  },
  dataContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
