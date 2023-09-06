import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

interface HeaderInterface {
  scrnName: string;
}

const Header: React.FC<HeaderInterface> = ({scrnName}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{scrnName}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center', // Use 'space-between' to push the elements to opposite ends
    alignItems: 'center',
    height: 70,
    maxHeight: 120,
    width: '100%',
    backgroundColor: 'rgba(250,167,62, 0.6)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
  },
  header: {
    color: 'black',
    fontSize: 30,
    fontFamily: 'Playball-Regular',
  },
  profileBtn: {
    height: 50,
    width: 90,
    backgroundColor: 'rgba(145, 120, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});
