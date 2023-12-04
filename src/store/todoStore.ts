import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Todo } from '../types';

interface TasksStore {
  tasks: Todo[];
  addTask: (task: Todo) => void;
  completeTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
}

const initialState: TasksStore = {
  tasks: [],
  addTask: (task) => {},
  completeTask: (taskId) => {},
  deleteTask: (taskId) => {},
};

export const useTodoStore = create(
  persist<TasksStore>(
    (set) => ({
      ...initialState,

      addTask: (task) => {
        set((state) => ({
          tasks: [...state.tasks, task],
        }));
      },

      completeTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, isCompleted: !task.isCompleted }
              : task
          ),
        }));
      },

      changeDayTask: () => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.isToday
              ? { ...task, isToday: false }
              : { ...task, isToday: true }
          ),
        }));
      },

      deleteTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        }));
      },
    }),
    {
      name: 'tasks-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
