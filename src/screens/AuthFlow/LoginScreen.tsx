import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ScreenProps} from '../../types/types';
import LinearGradient from 'react-native-linear-gradient';
import InputBox from '../../components/InputBox';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {ToastProvider, useToast} from 'react-native-toast-notifications';
import {SuccessToast} from 'react-native-toast-message';
import {loginWithEmail, onGoogleButtonPress} from './auth';
import {StackActions} from '@react-navigation/native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

type LoginScreenProps = ScreenProps<'LoginScreen'>;

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const translateY = useSharedValue(-80);
  const opacity = useSharedValue(0);
  const rotate = useSharedValue('0deg');
  const btnTranformY = useSharedValue(0);
  const toast = useToast();

  const handleGoogleAuth = () => {
    onGoogleButtonPress()
      .then(userInfo => {
        console.log('Signed in with Google!');
        toast.show('Login Success! Welcome back!', {
          type: 'success',
          duration: 3000,
          placement: 'top',
        });
        if (!userInfo.additionalUserInfo?.isNewUser)
          navigation.dispatch(StackActions.replace('Main'));
        else {
          console.log('creating new user');
          navigation.dispatch(StackActions.replace('LoginSucess'));
        }
      })
      .catch(error => {
        console.log(error);
        let message = 'Error on logging in with google';
        toast.show(message, {
          type: 'danger',
          duration: 3000,
          placement: 'top',
        });
      });
  };

  const handleLoginBtn = () => {
    if (email && password)
      loginWithEmail(
        email,
        password,
        () => {
          toast.show('Login Success', {
            type: 'success',
            duration: 3000,
            placement: 'top',
          });
          navigation.dispatch(StackActions.replace('Main'));
        },
        fail => {
          console.log('login failed', fail);
          let message = '';
          if (fail.code === 'auth/invalid-email') {
            message = 'Please provide a valid Email';
          } else if (fail.code === 'auth/wrong-password') {
            message = 'Username/Password is Incorrect';
          } else if (fail.code === 'auth/user-not-found') {
            message = 'Cannot find the user with email provided';
          } else if (fail.code === 'auth/too-many-requests') {
            message = 'Too many request. Please try again after sometime';
          } else if (fail.code === 'auth/network-request-failed') {
            message = 'Network failed';
          } else {
            message = 'Error occured on signing in';
          }

          toast.show(message, {
            type: 'warning',
            duration: 3000,
            placement: 'top',
          });
        },
      );
    else if (!email) {
      toast.show('Email could not be empty', {
        type: 'warning',
        duration: 3000,
        placement: 'top',
      });
    } else if (!password) {
      toast.show("Password can't be empty", {
        type: 'warning',
        duration: 3000,
        placement: 'top',
      });
    }
  };

  const tap = Gesture.Tap()
    .onBegin(() => {
      rotate.value = withSpring('-30');
      btnTranformY.value = withSpring(-3);
    })
    .onFinalize(() => {
      rotate.value = withSpring('0');
      btnTranformY.value = withSpring(0);
    });

  useEffect(() => {
    translateY.value = withSpring(0);
    opacity.value = withTiming(1, {duration: 2000});
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      // transform: [{translateY: translateY.value}],
      opacity: opacity.value,
    };
  });

  const btnAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateY: btnTranformY.value}],
    };
  });

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/imgs/login-money-bg.jpg')}
        style={styles.imageBGStyles}
      />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <LinearGradient
          style={styles.loginContiner}
          colors={['rgba(250,167,62, 0.2)', '#fff', 'rgba(250, 167, 62, 0.2)']}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 1}}>
          <View style={styles.innerContainer}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Login to continue</Text>
              <Text style={styles.subheaderText}>
                Enter your username and password
              </Text>
            </View>
            <Animated.View style={animatedStyle}>
              <InputBox
                iconName={() => {
                  return (
                    <SimpleLineIcons name="user" color={'gray'} size={25} />
                  );
                }}
                placeholder="Email"
                multiline={false}
                text={email}
                setText={text => {
                  setEmail(text);
                }}
                type={'email'}
                containerStyle={{marginBottom: 10}}
              />
            </Animated.View>
            <Animated.View style={animatedStyle}>
              <InputBox
                iconName={() => {
                  return (
                    <SimpleLineIcons name="lock" color={'gray'} size={25} />
                  );
                }}
                placeholder="Password"
                secureTextEntry={true}
                multiline={false}
                text={password}
                setText={text => {
                  setPassword(text);
                }}
                type="text"
                containerStyle={{marginBottom: 1}}
              />
            </Animated.View>
            <Animated.View style={[styles.forgotPasswordStyle, animatedStyle]}>
              <Pressable
                onPress={() => {
                  navigation.navigate('ResetPassword');
                }}>
                <Text
                  style={{
                    color: 'rgb(242, 139, 12)',
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Forget Password?
                </Text>
              </Pressable>
            </Animated.View>
            <GestureHandlerRootView>
              <GestureDetector gesture={tap}>
                <Animated.View style={[btnAnimation, animatedStyle]}>
                  <Pressable style={styles.loginBTN} onPress={handleLoginBtn}>
                    <Text style={styles.loginText}>Login</Text>
                    {/* @ts-ignore */}
                    <Animated.View style={{transform: [{rotate}]}}>
                      <Entypo
                        name={'arrow-with-circle-right'}
                        color={'white'}
                        size={30}
                      />
                    </Animated.View>
                  </Pressable>
                </Animated.View>
              </GestureDetector>
            </GestureHandlerRootView>
            <Animated.View
              style={[styles.createNewAccountContainer, animatedStyle]}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Poppins-Regular',
                  color: 'black',
                }}>
                New to OneRupee?
              </Text>
              <Pressable
                onPress={() => {
                  navigation.navigate('SignUpScreen');
                }}>
                <Text style={styles.createNewAccountStyle}>
                  Create new Account
                </Text>
              </Pressable>
            </Animated.View>

            <Animated.View
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 20,
                },
                animatedStyle,
              ]}>
              <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
              <View>
                <Text
                  style={{
                    width: 50,
                    textAlign: 'center',
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                  }}>
                  OR
                </Text>
              </View>
              <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            </Animated.View>
            <Animated.View style={animatedStyle}>
              <Pressable style={styles.oauthBtn} onPress={handleGoogleAuth}>
                <Image
                  source={require('../../assets/imgs/google_logo.jpg')}
                  style={styles.imagestyle}
                />
                <Text style={styles.oauthText}>Continue with Google</Text>
              </Pressable>
            </Animated.View>
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  imageBGStyles: {
    position: 'absolute',
    flex: 1,
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  loginContiner: {
    height: '75%',
    width: '100%',
    backgroundColor: '#fff',
    borderTopRightRadius: 100,
    paddingTop: 40,
    alignItems: 'center',
  },
  header: {
    paddingBottom: 30,
  },
  headerText: {
    fontSize: 30,
    fontFamily: 'Playball-Regular',
    color: 'black',
  },
  subheaderText: {
    color: 'gray',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  innerContainer: {
    width: '90%',
  },
  forgotPasswordStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingTop: 10,
    paddingBottom: 10,
  },
  loginBTN: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgb(242, 173, 12)',
    borderRadius: 20,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    paddingRight: 10,
  },
  createNewAccountContainer: {
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  createNewAccountStyle: {
    color: 'rgb(242, 139, 12)',
    paddingLeft: 5,
    fontFamily: 'Poppins-Regular',
  },
  oauthBtn: {
    backgroundColor: 'rgb(188, 207, 193)',
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  oauthText: {
    paddingLeft: 10,
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  imagestyle: {
    height: 30,
    width: 30,
    borderRadius: 20,
  },
  statusText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  statusBar: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
});
