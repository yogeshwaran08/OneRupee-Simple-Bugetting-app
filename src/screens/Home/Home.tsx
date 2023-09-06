import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScreenProps, uploadDataType} from '../../types/types';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/Header';
import CircularProgressBar from '../../components/CircleProgressBar';
import Analysis from '../Analysis/Analysis';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import EventCard from '../../components/EventCard';
import {FlatList} from 'react-native-gesture-handler';
import {checkLastTransac} from '../AddExpense/utils';
import {getData, getRecentSortedData, getTodayDataa} from './funcs';
import {useAuth} from '../AuthFlow/authContext';
import {useIsFocused} from '@react-navigation/native';

type HomeScreenProps = ScreenProps<'Home'>;

const Home: React.FC<HomeScreenProps> = ({navigation}) => {
  const [totalIncome, setTotalIncome] = useState<number>();
  const [totalExpense, setTotalExpense] = useState<number>();
  const [todayExpense, setTodayExpense] = useState<number>();
  const [todayIncome, setTodayIncome] = useState<number>();
  const [events, setEvents] = useState<uploadDataType[] | null | undefined>(
    undefined,
  );

  const [user, initializing] = useAuth();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fnc = async () => {
      if (user) {
        checkLastTransac(user.uid);
        getRecentSortedData(user.uid, data => setEvents(data));

        const income = await getData(`/${user.uid}/totalIncome`);
        setTotalIncome(income);

        const expense = await getData(`/${user.uid}/totalExpense`);
        const availableAmount = parseInt(income.toString()) - expense;
        setTotalExpense(availableAmount);

        const tincome = await getTodayDataa(user.uid, 'income');
        setTodayIncome(tincome);

        const texpense = await getTodayDataa(user.uid, 'expense');
        setTodayExpense(texpense);
      } else {
        console.log('User Logged out');
      }
    };

    fnc();
  }, [isFocused, user]);

  const renderItem = ({item}: {item: uploadDataType}) => (
    <EventCard item={item} />
  );
  return (
    <LinearGradient
      style={styles.container}
      colors={['rgba(250,167,62, 0.2)', '#fff', 'rgba(250, 167, 62, 0.2)']}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
      {/* Header */}
      <Header scrnName="Home" />
      <View style={{width: '90%'}}>
        {/* Circular Progress bar */}
        <View style={styles.circularBarContainer}>
          {totalIncome !== undefined &&
          totalIncome !== null &&
          totalExpense !== undefined &&
          totalExpense !== null ? (
            <CircularProgressBar
              totalRupee={totalIncome}
              expendedRupee={totalExpense}
              tintColor="blue"
            />
          ) : (
            <Text>Loading</Text>
          )}
        </View>
        <View style={styles.statusContainer}>
          <View>
            <LinearGradient
              colors={['#FF5733', '#FFC300']} // Define your gradient colors
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.stausBox}>
              <FontAwesome6
                name="money-check-dollar"
                color={'white'}
                size={20}
              />
              <Text style={styles.statusText} numberOfLines={2}>
                ₹{todayExpense} spent today
              </Text>
            </LinearGradient>
          </View>
          <View>
            <LinearGradient
              colors={['#FF5733', '#FFC300']} // Define your gradient colors
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.stausBox}>
              <FontAwesome6
                name="money-check-dollar"
                color={'white'}
                size={20}
              />
              <Text style={styles.statusText} numberOfLines={2}>
                ₹{todayIncome} gained today
              </Text>
            </LinearGradient>
          </View>
        </View>
      </View>
      <View style={styles.eventsContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.eventsHeader}>Events</Text>
          <View style={styles.cardContainer}>
            <FlatList data={events} renderItem={renderItem} horizontal={true} />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  circularBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  statusContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  stausBox: {
    height: 86,
    width: 150,
    borderRadius: 30,
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    paddingLeft: 3,
  },
  eventsContainer: {
    backgroundColor: 'rgba(250,167,62, 0.5)',
    height: '100%',
    width: '100%',
    borderRadius: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  eventsHeader: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  innerContainer: {
    width: '90%',
    height: '100%',
  },
  cardContainer: {
    height: '35%',
    justifyContent: 'center',
    width: '100%',
  },
});
