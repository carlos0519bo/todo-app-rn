import React from 'react';
import { FlatList, } from 'react-native';
import { TodoItem } from './TodoItem';
import { Todo } from '../types';

interface Props {
  todosData: Todo[];
}

export const TodoList = ({ todosData }: Props) => {
  return (
    <FlatList
      data={todosData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <TodoItem item={item} />}
    />
  );
};
