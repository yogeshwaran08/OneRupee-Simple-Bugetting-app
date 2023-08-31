import {Pressable, StyleSheet, Text, GestureResponderEvent} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../constants';

interface Props {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  text: string;
}
const CustomButton: React.FC<Props> = ({onPress, text}) => {
  return (
    <Pressable style={styles.container}>
      <Text style={styles.textStyles} onPress={onPress}>
        {text}
      </Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  textStyles: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  container: {
    height: 50,
    backgroundColor: colors.highlightColor,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});
