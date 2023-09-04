import React, {useState, useRef} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
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
  text: string | undefined;
  setText: (a: string) => void;
  containerStyle?: ViewStyle;
  secureTextEntry?: boolean;
}

const InputBox: React.FC<Props> = ({
  placeholder,
  iconName,
  height = 50,
  multiline = false,
  setText,
  text,
  type,
  containerStyle,
  ...rest
}) => {
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <Icon name={iconName} size={20} color={'gray'} style={styles.icon} />
      <TextInput
        style={[styles.input, {height: height}]}
        onChangeText={text => setText(text)}
        value={text}
        inputMode={type}
        multiline={multiline}
        placeholder={placeholder}
        secureTextEntry={true}
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
    paddingVertical: 3,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    color: 'black',
    fontSize: 15,
  },
  icon: {
    marginRight: 8,
  },
});

export default InputBox;
