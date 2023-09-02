import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import {colors} from '../../constants';
import {useAuth} from './authContext';
import {setUpNewUser} from './utils';
import {ScreenProps} from '../../types/types';
import {StackActions} from '@react-navigation/native';

type LoginSuccessProps = ScreenProps<'LoginSucess'>;

const LoginSucess: React.FC<LoginSuccessProps> = ({navigation}) => {
  const [user, initilizing] = useAuth();
  useEffect(() => {
    if (user) {
      setUpNewUser(user.uid, user.email);
      navigation.dispatch(StackActions.replace('Main'));
    } else console.log('setting up user error', user);
  }, [initilizing]);

  return (
    <View>
      <Text style={{color: 'black', fontSize: 40}}>LoginSucess</Text>
      <Pressable
        onPress={() => {
          navigation.navigate('Main');
        }}>
        <Text style={{fontSize: 20, color: 'black'}}>Go to home</Text>
      </Pressable>
    </View>
  );
};

export default LoginSucess;

const styles = StyleSheet.create({});
