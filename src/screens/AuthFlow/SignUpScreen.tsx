import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {ScreenProps} from '../../types/types';
import {StackActions} from '@react-navigation/native';
import {signUpWithEmail} from './auth';

type SignUpScreenProps = ScreenProps<'SignUpScreen'>;

const SignUpScreen: React.FC<SignUpScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [cnfPassword, setCnfPassword] = useState<string>();

  const handleBtnClick = () => {
    if (email && password && cnfPassword && password === cnfPassword) {
      signUpWithEmail(email, password, successCallback, failedCallback);
    }
  };

  const successCallback = () => {
    console.log('Account created');
    navigation.dispatch(StackActions.replace('Home'));
  };

  const failedCallback = (e: any) => {
    console.log('error', e);
  };
  const handleLoginClick = () => {
    navigation.navigate('LoginScreen');
  };

  const handleEmailOnChange = (email: string) => {
    setEmail(email);
  };

  const handlePasswordOnChange = (passwd: string) => {
    setPassword(passwd);
  };

  const handleCnfPasswordOnChange = (cnfPasswd: string) => {
    setCnfPassword(cnfPasswd);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        <Text style={styles.text}>Sign up</Text>
        <View style={styles.dataContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            value={email}
            onChangeText={handleEmailOnChange}
          />
          <TextInput
            value={password}
            style={styles.textInput}
            placeholder="Password"
            onChangeText={handlePasswordOnChange}
          />
          <TextInput
            value={cnfPassword}
            style={styles.textInput}
            placeholder="Retype Password"
            onChangeText={handleCnfPasswordOnChange}
          />
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text>Already have a account?</Text>
            <Pressable style={{paddingLeft: 5}} onPress={handleLoginClick}>
              <Text style={{color: 'blue'}}>Click Here to Login</Text>
            </Pressable>
          </View>
        </View>
        <View>
          <Pressable style={styles.btnStyles} onPress={handleBtnClick}>
            <Text style={styles.btnTextStyle}>Sign up</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 40,
  },
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-between',
    alignItems: 'center',
    padding: 30,
  },
  btnStyles: {
    height: 50,
    width: 300,
    borderRadius: 30,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  btnTextStyle: {
    color: 'white',
    fontSize: 20,
  },
  textInput: {
    borderWidth: 2,
    width: 300,
    height: 50,
    marginBottom: 10,
    borderRadius: 10,
    paddingLeft: 10,
  },
});
