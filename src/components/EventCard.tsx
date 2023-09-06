import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import {uploadDataType} from '../types/types';

interface eventProps {
  item: uploadDataType;
}

const EventCard: React.FC<eventProps> = ({item}) => {
  // const color = type === 'income' ? 'green' : 'red';
  const color = 'red';
  return (
    <LinearGradient
      colors={['#FF834C', '#FF834C']} // Define your gradient colors
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.cardContainer}>
      <View>
        <Fontisto name="money-symbol" size={40} color={color} />
      </View>

      <View style={styles.dataContainer}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.amount}>₹{item.amount}</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 5,
            width: '95%',
          }}>
          <Entypo name={'location-pin'} color={'white'} size={12} />
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
            }}
            numberOfLines={1}>
            {item.location}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#444',
    borderRadius: 10,
    height: 200,
    width: 150,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 20,
    marginRight: 15,
  },
  category: {
    color: 'white',
    fontSize: 13,
    paddingBottom: 5,
    fontFamily: 'Poppins-Regular',
  },
  amount: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 22,
  },
  dataContainer: {
    paddingLeft: 5,
  },
});
