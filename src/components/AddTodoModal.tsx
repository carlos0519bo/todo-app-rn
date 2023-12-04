import React, { useState } from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Switch,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTodoStore } from '../store/todoStore';
import { idGenerator } from '../utils/idGenerator';

type ModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddTodoModal = ({ isModalOpen, setIsModalOpen }: ModalProps) => {
  const { addTask } = useTodoStore();
  const [formTodo, setFormTodo] = useState({
    title: '',
    isToday: true,
    withAlert: false,
    hour: new Date(),
  });
  const [error, setError] = useState(false);
  const toggleSwitchisToday = () =>
    setFormTodo({ ...formTodo, isToday: !formTodo.isToday });

  const toggleSwitchWithAlert = () =>
    setFormTodo({ ...formTodo, withAlert: !formTodo.withAlert });
  const onCloseModal = () => {
    setIsModalOpen(false);
    setError(false);
    setFormTodo({
      title: '',
      isToday: true,
      hour: new Date(),
      withAlert: false,
    });
  };

  const saveTodo = () => {
    if (formTodo.title === '') {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2500);
      return;
    } else {
      setError(false);
      addTask({
        ...formTodo,
        id: idGenerator(),
        isCompleted: false,
      });
    }
    onCloseModal();
    setFormTodo({
      title: '',
      isToday: true,
      hour: new Date(),
      withAlert: false,
    });
  };


  return (
    <Modal visible={isModalOpen} transparent={true} animationType="fade">
      <View style={styles.container}>
        <View style={styles.modalStyle}>
          <View style={styles.modalHeader}>
            <Text style={styles.titleModal}>Agregar tarea</Text>
            <TouchableOpacity activeOpacity={0.6} onPress={onCloseModal}>
              <Text style={{ fontSize: 32, fontWeight: '800' }}>×</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.nameTask}>Nombre</Text>
            <TextInput
              style={[
                styles.textInput,
                { borderBottomColor: error ? 'red' : '#00000030' },
              ]}
              placeholder="Describe tu tarea"
              value={formTodo.title}
              onChangeText={(text) => setFormTodo({ ...formTodo, title: text })}
              autoCapitalize="sentences"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.nameTask}>Hora</Text>
            <DateTimePicker
              value={formTodo.hour}
              mode="time"
              is24Hour
              style={{ width: '80%' }}
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || formTodo.hour;
                setFormTodo({
                  ...formTodo,
                  hour: currentDate,
                });
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.nameTask}>Para hoy</Text>
            <Switch
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchisToday}
              value={formTodo.isToday}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={saveTodo}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 18,
              color: '#00000060',
              textAlign: 'center',
            }}
          >
            Si desactivas la opción "Para hoy", tu tarea pasará automáticamente
            para mañana.
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  modalStyle: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 30,
    width: '100%',
    height: '77%',
    alignSelf: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  closeButton: {
    width: 20,
  },
  titleModal: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginTop: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    borderBottomColor: '#00000030',
    borderBottomWidth: 1,
    width: '80%',
  },
  nameTask: {
    fontWeight: 'bold',
  },
  button: {
    height: 46,
    marginTop: 30,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
