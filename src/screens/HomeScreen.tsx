import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FloatingButton, Title, TodoList } from '../components';
import { AddTodoModal } from '../components';
import { useTodoStore } from '../store/todoStore';

const Avatar = require('../../assets/avatar.jpg');

export const HomeScreen = () => {
  const { tasks } = useTodoStore();
  const sortedTodos = [...tasks].sort((a, b) => (a.isCompleted ? 1 : -1));
  const uncompletedTasks = sortedTodos.filter((todo) => !todo.isCompleted);
  const [isHidden, setIsHidden] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHiddenPress = () => setIsHidden(!isHidden);

  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={Avatar} />
      <View style={styles.titleContainer}>
        <Title title="Hoy" />
        <TouchableOpacity onPress={handleHiddenPress} activeOpacity={0.5}>
          <Text style={{ color: '#3478f6' }}>
            {isHidden ? 'Ver realizados' : 'Ocultar ralizados'}
          </Text>
        </TouchableOpacity>
      </View>
      <TodoList
        todosData={
          isHidden
            ? uncompletedTasks.filter((todo) => todo.isToday)
            : sortedTodos.filter((todo) => todo.isToday)
        }
      />
      <Title title="Mañana" mb={25} />
      <TodoList todosData={tasks.filter((todo) => !todo.isToday)} />
      <FloatingButton onPress={() => setIsModalOpen(!isModalOpen)} />
      <AddTodoModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
  floatingButton: {
    width: 44,
    height: 44,
    borderRadius: 25,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    bottom: 30,
    right: 10,
    position: 'absolute',
  },
});
