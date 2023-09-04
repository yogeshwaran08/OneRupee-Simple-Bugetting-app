import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import {colors} from '../../constants';
import {useAuth} from './authContext';
import {setUpNewUser} from './utils';
import {ScreenProps} from '../../types/types';
import {StackActions} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

type LoginSuccessProps = ScreenProps<'LoginSucess'>;

const LoginSucess: React.FC<LoginSuccessProps> = ({navigation}) => {
  const [user, initilizing] = useAuth();
  useEffect(() => {
    if (!initilizing)
      if (user) {
        setUpNewUser(user.uid, user.email);
        setTimeout(
          () => navigation.dispatch(StackActions.replace('Main')),
          4000,
        );
      } else console.log('setting up user error', user);
  }, [initilizing]);

  return (
    <LinearGradient
      colors={['rgba(250,167,62, 0.2)', '#fff', 'rgba(250, 167, 62, 0.2)']}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.container}>
      <LottieView
        autoPlay
        loop
        style={styles.lottieAnimation}
        source={require('../../assets/Lottie-native/login_success_animation.json')}
      />
      <View style={styles.loadinContainer}>
        <Text style={styles.loadingText}>
          Setting up for first time use, Please wait....
        </Text>
      </View>
    </LinearGradient>
  );
};

export default LoginSucess;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  lottieAnimation: {
    height: '100%',
    width: '100%',
    flex: 1,
    position: 'absolute',
  },
  loadinContainer: {
    height: '30%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
  },
});
