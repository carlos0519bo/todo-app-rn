import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface FloatingButtonProps {
  onPress?: () => void;
}
export const FloatingButton = ({ onPress }: FloatingButtonProps) => {
  return (
    <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 34,
    color: '#fff',
  },
});
