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
import {backgroundColor, themeColor} from '../../constants';
import InputBox from '../../components/InputBox';
import {setUpNewUser} from './utils';
import {useAuth} from './authContext';

type SignUpScreenProps = ScreenProps<'SignUpScreen'>;

const SignUpScreen: React.FC<SignUpScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [cnfPassword, setCnfPassword] = useState<string>();
  const [errorState, setErrorState] = useState<string>();

  const handleBtnClick = () => {
    if (email && password && cnfPassword && password === cnfPassword) {
      signUpWithEmail(email, password, successCallback, failedCallback);
    }
  };

  const successCallback = () => {
    console.log('Account created');
    navigation.navigate('LoginSucess');
  };

  const failedCallback = (e: any) => {
    console.log('error', e.code);
    if (e.code === 'auth/email-already-in-use') {
      setErrorState('Email Already in use');
    }
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
          <View style={{paddingVertical: 10}}>
            <InputBox
              text={email}
              placeholder="Email"
              type="email"
              iconName="user"
              setText={handleEmailOnChange}
            />
          </View>
          <View style={{paddingVertical: 10}}>
            <InputBox
              text={password}
              placeholder="Password"
              type="text"
              iconName="user"
              setText={handlePasswordOnChange}
            />
          </View>
          <View style={{paddingVertical: 10}}>
            <InputBox
              iconName="user"
              type="text"
              text={cnfPassword}
              placeholder="Retype Password"
              setText={handleCnfPasswordOnChange}
            />
          </View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={{color: 'white'}}>Already have a account?</Text>
            <Pressable style={{paddingLeft: 5}} onPress={handleLoginClick}>
              <Text style={{color: themeColor}}>Click Here to Login</Text>
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
    color: 'white',
    fontSize: 40,
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: backgroundColor,
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
    backgroundColor: themeColor,
  },
  btnTextStyle: {
    color: 'white',
    fontSize: 20,
  },
  textInput: {
    borderColor: 'white',
    width: 300,
    height: 50,
    borderRadius: 10,
  },
});
