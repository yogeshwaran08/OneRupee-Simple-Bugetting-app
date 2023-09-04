import React, {useState, useRef, useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {StyleSheet, View, Image, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import AppBackground from '../../components/AppBackground';
import {useAuth} from '../AuthFlow/authContext';
import {ScreenProps} from '../../types/types';
import {StackActions} from '@react-navigation/native';

type SplashScreenProps = ScreenProps<'SplashScreen'>;

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const splashRef = useRef<LottieView>(null);
  const loadingRef = useRef<View>(null);
  const opacity = useSharedValue(0);
  const traslateY = useSharedValue(-150);
  const [user, initilizing] = useAuth();

  useEffect(() => {
    // ui code
    splashRef.current?.play(0, 21);
    opacity.value = withTiming(1, {duration: 1500});
    traslateY.value = withSpring(60, {duration: 3000, stiffness: 200});
  }, []);

  useEffect(() => {
    //driver code
    setTimeout(() => {
      if (!initilizing)
        if (user !== null) {
          console.log('navigating main');
          navigation.dispatch(StackActions.replace('Main'));
        } else {
          console.log('navigating AuthFlow');
          navigation.dispatch(StackActions.replace('AuthFlow'));
        }
    }, 2000);
  }, [initilizing]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{translateY: traslateY.value}],
    };
  });
  return (
    <AppBackground>
      <View style={styles.container}>
        <LottieView
          ref={splashRef}
          style={styles.lottieStyles}
          loop={false}
          onAnimationFinish={() => {
            if (loadingRef.current)
              loadingRef.current.setNativeProps({style: {display: 'unset'}});
            console.log('finished');
          }}
          source={require('../../assets/Lottie-native/splash_screen_loading.json')}
        />
        <Animated.Image
          source={require('../../assets/imgs/splashScreen.jpg')}
          style={[styles.imgStyle, animatedStyle]}
          resizeMode="center"
        />
        <View style={styles.loadingBarStyle} ref={loadingRef}>
          <LottieView
            // ref={loadingRef}
            style={styles.loadingLottiestyle}
            loop={true}
            autoPlay
            onAnimationLoop={() => {
              console.log('finished');
            }}
            source={require('../../assets/Lottie-native/loading.json')}
          />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    </AppBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    display: 'flex',
  },
  imgStyle: {
    width: '70%',
    height: '80%',
  },
  lottieStyles: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: -1,
  },
  loadingBarStyle: {
    display: 'none',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'black',
    fontSize: 14,
  },
  loadingLottiestyle: {
    height: 70,
    width: 90,
  },
});
