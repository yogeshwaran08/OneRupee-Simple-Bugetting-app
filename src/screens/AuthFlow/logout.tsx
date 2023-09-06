import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/Header';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useAuth} from './authContext';
import {DataTable} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {logOut} from './auth';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {ScreenProps} from '../../types/types';

type LogoutScreenProps = ScreenProps<'LogoutScreen'>;

const LogoutScreen: React.FC<LogoutScreenProps> = ({navigation}) => {
  const [user, initializing] = useAuth();
  const handleLogout = () => {
    logOut();
    navigation.dispatch(StackActions.replace('AuthFlow'));
  };
  return (
    <LinearGradient
      style={styles.container}
      colors={['rgba(250,167,62, 0.2)', '#fff', 'rgba(250, 167, 62, 0.2)']}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
      <Header scrnName="Profile" />
      <View style={styles.profilePic}>
        <FontAwesome5 name="user-circle" size={150} color="black" />
      </View>
      <Pressable style={styles.logoutBtn} onPress={handleLogout}>
        <View style={styles.innerBtn}>
          <MaterialIcons
            name="cancel"
            color={'red'}
            size={25}
            style={{paddingHorizontal: 5}}
          />
          <Text style={styles.btnText}>Log out</Text>
        </View>
      </Pressable>
    </LinearGradient>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  profilePic: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%',
  },
  TextStyle: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
  },
  logoutBtn: {
    backgroundColor: 'rgb(242, 173, 12)',
    height: 50,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'red',
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    paddingHorizontal: 10,
  },
  innerBtn: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
