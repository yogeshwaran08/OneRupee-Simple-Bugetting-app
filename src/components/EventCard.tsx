import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';

interface Props {
  type: 'income' | 'expense';
  category: string;
  amount: number;
  location: string;
}

const EventCard: React.FC<Props> = ({type, category, amount, location}) => {
  // const color = type === 'income' ? 'green' : 'red';
  const color = 'red';
  return (
    <View style={styles.cardContainer}>
      <View>
        <Fontisto name="money-symbol" size={40} color={color} />
      </View>

      <View style={styles.dataContainer}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.amount}>₹{amount}</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 5,
            width: '95%',
          }}>
          <Entypo name={'location-pin'} color={'white'} size={12} />
          <Text style={{color: 'white', fontSize: 12}} numberOfLines={1}>
            {location}
          </Text>
        </View>
      </View>
    </View>
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
  },
  category: {
    color: '#C6C6C6',
    fontSize: 13,
    paddingBottom: 5,
  },
  amount: {
    color: 'white',
    fontWeight: '600',
    fontSize: 22,
  },
  dataContainer: {
    paddingLeft: 5,
  },
});
