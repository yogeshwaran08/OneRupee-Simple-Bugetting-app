import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {ScreenProps} from '../../types/types';
import {backgroundColor, themeColor} from '../../constants';
import {StackActions} from '@react-navigation/native';
import {useAuth} from '../AuthFlow/authContext';

type SplashScreenProps = ScreenProps<'SplashScreen'>;

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const [user, initializing] = useAuth();
  useEffect(() => {
    setTimeout(() => {
      if (!initializing) {
        if (user === null)
          navigation.dispatch(StackActions.replace('AuthFlow'));
        else {
          navigation.dispatch(StackActions.replace('Main'));
        }
      }
    }, 3000);
  }, [initializing]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/imgs/splashScreen.jpg')}
          style={styles.image}
        />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: '30%',
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'center',
    height: '70%',
  },
});

{
  /* <View style={styles.container}>
      <Pressable
        style={styles.btn}
        onPress={() => {
          navigation.dispatch(StackActions.replace('Main'));
        }}>
        <Text style={{color: 'white', fontSize: 20}}>navigate</Text>
      </Pressable>
    </View> */
}
