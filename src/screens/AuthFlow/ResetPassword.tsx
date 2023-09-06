import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {useToast} from 'react-native-toast-notifications';
import {resetPassword} from './auth';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

type LoginScreenProps = ScreenProps<'SignUpScreen'>;

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState<string>();
  const [emailState, setEmailState] = useState(true);
  const translateY = useSharedValue(-80);
  const opacity = useSharedValue(0);
  const rotate = useSharedValue('0deg');
  const btnTranformY = useSharedValue(0);
  const toast = useToast();

  const handleResetBtn = () => {
    if (emailState === true && email) {
      setEmailState(false);
      resetPassword(email);
      toast.show('Email sent to your registered mail address', {
        type: 'success',
        duration: 3000,
        placement: 'top',
      });
      navigation.navigate('LoginScreen');
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
    opacity.value = withTiming(1, {duration: 1000});
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
              <Text style={styles.headerText}>Reset your password</Text>
              <Text style={styles.subheaderText}>
                Forgot your password no problem reset it here
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Animated.View style={animatedStyle}>
                <InputBox
                  editable={emailState}
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
                  type="email"
                  containerStyle={{marginBottom: 10}}
                />
              </Animated.View>
            </View>

            <GestureHandlerRootView>
              <GestureDetector gesture={tap}>
                <Animated.View style={[btnAnimation, animatedStyle]}>
                  <Pressable style={styles.loginBTN} onPress={handleResetBtn}>
                    <Text style={styles.loginText}>Sign Up</Text>
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
                Trying to login?
              </Text>
              <Pressable
                onPress={() => {
                  navigation.navigate('LoginScreen');
                }}>
                <Text style={styles.createNewAccountStyle}>Login here</Text>
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
  inputContainer: {
    paddingBottom: 20,
  },
});
