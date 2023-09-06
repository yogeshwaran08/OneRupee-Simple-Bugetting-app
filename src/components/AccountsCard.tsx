import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  description: string;
  title: string;
  amount: number;
  transactionType: 'income' | 'expense';
  location: string;
}

const AccountsCard: React.FC<Props> = ({
  description,
  title,
  amount,
  transactionType,
  location,
}) => {
  return (
    <LinearGradient
      colors={['#FF834C', '#FF834C']} // Define your gradient colors
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.container}>
      <View style={styles.left}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: 60,
            borderColor: 'gray',
            justifyContent: 'center',
          }}>
          <View style={styles.typeTitle}>
            <Octicons
              style={{paddingRight: 6}}
              name={'graph'}
              size={15}
              color={'white'}
            />
            <Text
              style={[
                styles.typeText,
                {
                  color: 'white',
                  fontFamily: 'Poppins-Bold',
                },
              ]}>
              {title}
            </Text>
          </View>
          <Text
            style={{color: 'white', fontFamily: 'Poppins-Regular'}}
            numberOfLines={1}>
            Description : {description}
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 13,
              fontFamily: 'Poppins-Regular',
            }}
            numberOfLines={1}>
            Location : {location}
          </Text>
        </View>
      </View>
      <View style={styles.right}>
        <Text style={[styles.amount, {color: 'red'}]}>
          {'-'}₹{amount}
        </Text>
      </View>
    </LinearGradient>
  );
};

export default AccountsCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#444',
    height: 100,
    borderRadius: 10,
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
  },
  left: {
    width: '70%',
    borderRightWidth: 2,
    borderColor: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  right: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  typeText: {
    fontSize: 16,
  },
  amount: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
});
