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

type LoginScreenProps = ScreenProps<'LoginScreen'>;

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleGoogleAuth = () => {
    onGoogleButtonPress()
      .then(() => {
        console.log('Signed in with Google!');
        navigation.dispatch(StackActions.replace('Home'));
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
          navigation.dispatch(StackActions.replace('Home'));
        },
        fail => console.log('login failed', fail),
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
            <Text style={{color: 'blue'}}>Create a account</Text>
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
            <Text style={{color: 'blue'}}>Reset Your password here</Text>
          </Pressable>
        </View>
        <View style={styles.oauthContainer}>
          <Pressable onPress={handleGoogleAuth}>
            <AntDesign name="google" color="blue" size={30} />
          </Pressable>
          <Pressable>
            <AntDesign name="facebook-square" color="blue" size={30} />
          </Pressable>
          <Pressable>
            <AntDesign name="windows" color="blue" size={30} />
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

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
  textInput: {
    borderWidth: 2,
    width: 300,
    height: 50,
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
    backgroundColor: 'blue',
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
