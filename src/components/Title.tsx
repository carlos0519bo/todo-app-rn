import React from 'react';
import { Text, View } from 'react-native';

interface TitleProps {
  title: string;
  size?: number;
  mb?: number;
}
export const Title = ({ title, size, mb }: TitleProps) => {
  return (
    <Text
      style={{
        fontSize: size ? size : 34,
        fontWeight: 'bold',
        marginBottom: mb ? mb : 0,
      }}
    >
      {title}
    </Text>
  );
};

// title: {
//   fontSize: 34,
//   fontWeight: 'bold',
// },
