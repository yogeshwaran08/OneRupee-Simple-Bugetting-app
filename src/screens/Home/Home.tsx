import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  backgroundColor,
  dbUrl,
  incomeCategories,
  themeColor,
} from '../../constants';
import CircularProgressBar from '../../components/CircleProgressBar';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EventCard from '../../components/EventCard';
import {
  getData,
  getRealTimeData,
  getRecentSortedData,
  getTodayDataa,
} from './funcs';
import {ScreenProps, uploadDataType} from '../../types/types';
import {checkLastTransac} from '../AddExpense/utils';
import {capitalize} from '../../utils/generalUtils';
import PopMessageBox from '../../components/PopupBox';
import {useAuth} from '../AuthFlow/authContext';
import {useIsFocused} from '@react-navigation/native';
// import {SafeAreaView} from 'react-native-safe-area-context';

type HomeScreenProps = ScreenProps<'Home'>;

const Home: React.FC<HomeScreenProps> = ({navigation}) => {
  const [user, initializing] = useAuth();
  console.log('home user ', initializing);
  const isFocused = useIsFocused();
  const [totalIncome, setTotalIncome] = useState<number>();
  const [totalExpense, setTotalExpense] = useState<number>();
  const [todayExpense, setTodayExpense] = useState<number>();
  const [todayIncome, setTodayIncome] = useState<number>();
  const [events, setEvents] = useState<uploadDataType[] | null | undefined>(
    undefined,
  );
  const [showPopArray, setShowPopArray] = useState<boolean[]>([]);
  const tintColor: string = themeColor;

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

  useEffect(() => {
    if (events) {
      setShowPopArray(events.map(() => false));
    }
  }, [events]);

  // useEffect(() => {
  //   if (isFocused) console.log('focus chagend');
  // }, [isFocused]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.header}>One Rupee</Text>
          <View style={{paddingTop: 50, paddingBottom: 10}}>
            {totalIncome !== undefined && totalExpense !== undefined ? (
              <CircularProgressBar
                totalRupee={parseInt(totalIncome.toString())}
                expendedRupee={parseInt(totalExpense.toString())}
                tintColor={tintColor}
              />
            ) : (
              <Text>Loading.....</Text>
            )}
          </View>
        </View>

        <View
          style={{display: 'flex', alignItems: 'center', paddingBottom: 20}}>
          <View style={styles.greetingStyle}>
            <View style={styles.greetingContainer}>
              <View style={styles.dataIconDisplay}>
                <SimpleLineIcons name="wallet" size={30} color={'#fff'} />
              </View>
              <Text style={styles.greetingText}>
                ₹ {todayExpense} spent {'\n'}today
              </Text>
            </View>

            <View style={styles.greetingContainer}>
              <View style={styles.dataIconDisplay}>
                <FontAwesome5 name="money-bill" size={30} color={'#fff'} />
              </View>
              <Text style={styles.greetingText}>
                ₹ {todayIncome} gained {'\n'} today
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.eventSection}>
          <View style={styles.eventContainer}>
            <View style={styles.eventLabelContainer}>
              <Text style={styles.eventLabel}>Events</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Analysis')}>
                {/* <TouchableOpacity onPress={() => setShowPop(true)}> */}
                <Text style={[styles.eventLabel, styles.linkLabel]}>
                  View all {'>'}
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal style={styles.scrollStyle}>
              {events ? (
                events.map((event, index) => (
                  <Pressable
                    style={{paddingRight: 10}}
                    key={index}
                    onPress={() => {
                      const updatedShowPopArray = [...showPopArray];
                      updatedShowPopArray[index] = true;
                      setShowPopArray(updatedShowPopArray);
                    }}>
                    <EventCard
                      type={event.type}
                      category={capitalize(event.category)}
                      amount={event.amount}
                      location={event.location}
                    />
                    <PopMessageBox
                      isVisible={showPopArray[index]}
                      onClose={() => {
                        const updatedShowPopArray = [...showPopArray];
                        updatedShowPopArray[index] = false;
                        setShowPopArray(updatedShowPopArray);
                      }}
                      data={events[index]}
                    />
                  </Pressable>
                ))
              ) : (
                <View style={styles.dataNotFound}>
                  <Text style={styles.dataNotFoundText}>No data Found</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    height: '100%',
    width: '100%',
  },
  header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
  },
  headingContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 25,
  },

  dataIconDisplay: {
    height: 56,
    width: 56,
    borderRadius: 10,
    backgroundColor: '#2B2929',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '85%',
    paddingTop: 20,
  },
  greetingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingText: {
    color: '#fff',
    paddingLeft: 10,
    fontSize: 15,
  },
  eventSection: {
    backgroundColor: '#202020',
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 10,
  },
  eventContainer: {
    height: '100%',
    width: '90%',
  },
  eventLabelContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  eventLabel: {
    fontSize: 20,
    color: '#fff',
  },
  linkLabel: {
    color: '#FD8D26',
  },
  scrollStyle: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 15,
  },
  dataNotFound: {
    height: '40%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataNotFoundText: {
    color: 'gray',
    fontSize: 20,
  },
});

export default Home;
