import React, {useState, useRef} from 'react';
import {View, TextInput, StyleSheet, TextInputProps} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../constants';

interface Props extends TextInputProps {
  placeholder: string;
  iconName: string;
  height?: number;
  multiline?: boolean;
  type:
    | 'text'
    | 'none'
    | 'decimal'
    | 'numeric'
    | 'tel'
    | 'search'
    | 'email'
    | 'url';
  // text: string | number;
  // setText: React.Dispatch<React.SetStateAction<string | number>>;
  text: string | undefined;
  setText: any;
}

const InputBox: React.FC<Props> = ({
  placeholder,
  iconName,
  height = 50,
  multiline = false,
  setText,
  text,
  type,
  ...rest
}) => {
  return (
    <View style={styles.inputContainer}>
      <Icon
        name={iconName}
        size={20}
        color={colors.iconColor}
        style={styles.icon}
      />
      <TextInput
        style={[styles.input, {height: height}]}
        onChangeText={setText}
        value={text}
        inputMode={type}
        multiline={multiline}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputFieldColor, // Glass effect with transparency
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    color: colors.primaryForeground,
    fontSize: 18,
    marginLeft: 8,
  },
  icon: {
    marginRight: 8,
  },
});

export default InputBox;
