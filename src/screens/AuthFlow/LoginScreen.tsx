import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {ScreenProps} from '../../types/types';
import {StackActions} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {loginWithEmail, onGoogleButtonPress} from './auth';
import {backgroundColor, themeColor} from '../../constants';
import {useAuth} from './authContext';
import {setUpNewUser} from './utils';

type LoginScreenProps = ScreenProps<'LoginScreen'>;

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [user, initilizing] = useAuth();
  console.log('user ', user);

  const handleGoogleAuth = () => {
    onGoogleButtonPress()
      .then(userInfo => {
        console.log('Signed in with Google!');
        if (!userInfo.additionalUserInfo?.isNewUser)
          navigation.dispatch(StackActions.replace('Main'));
        else {
          console.log('creating new user');
          navigation.dispatch(StackActions.replace('LoginSucess'));
        }
      })
      .catch(() => {
        console.log('Error authenting google');
      });
  };

  const handleLoginBtn = () => {
    if (email && password)
      loginWithEmail(
        email,
        password,
        () => {
          console.log('success');
          navigation.dispatch(StackActions.replace('Main'));
        },
        fail => console.log('login failed', fail), //error code should be found
      );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        <Text style={styles.text}>Login</Text>
        <View style={styles.dataContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            textContentType="emailAddress"
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
            placeholderTextColor={'gray'}
          />
          <TextInput
            style={styles.textInput}
            value={password}
            onChangeText={passwd => {
              setPassword(passwd);
            }}
            placeholder="Password"
            placeholderTextColor={'gray'}
          />
        </View>

        <View>
          <Pressable style={styles.btnStyles} onPress={handleLoginBtn}>
            <Text style={styles.btnTextStyle}>Log in</Text>
          </Pressable>
        </View>
        <View style={[styles.newAcc]}>
          <Text style={{paddingRight: 3, color: 'gray'}}>New to this app?</Text>
          <Pressable
            style={{paddingLeft: 3}}
            onPress={() => {
              navigation.navigate('SignUpScreen');
            }}>
            <Text style={{color: 'white'}}>Create a account</Text>
          </Pressable>
        </View>
        <View style={[styles.newAcc]}>
          <Text style={{paddingRight: 3, color: 'gray'}}>
            Trobble Loggin In?
          </Text>
          <Pressable
            style={{paddingLeft: 3}}
            onPress={() => {
              navigation.navigate('ResetPassword');
            }}>
            <Text style={{color: 'white'}}>Reset Your password here</Text>
          </Pressable>
        </View>
        <View style={styles.oauthContainer}>
          <Pressable onPress={handleGoogleAuth}>
            <AntDesign name="google" color="white" size={30} />
          </Pressable>
          <Pressable>
            <AntDesign name="facebook-square" color="white" size={30} />
          </Pressable>
          <Pressable>
            <AntDesign name="windows" color="white" size={30} />
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 40,
  },
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroundColor,
  },
  textInput: {
    borderWidth: 2,
    width: 300,
    height: 50,
    color: 'white',
    marginBottom: 10,
    borderRadius: 10,
    paddingLeft: 10,
  },
  dataContainer: {
    paddingVertical: 30,
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
  newAcc: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  oauthContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 300,
    paddingTop: 30,
  },
});
