import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {backgroundColor, dbUrl, themeColor} from '../../constants';
import CircularProgressBar from '../../components/CircleProgressBar';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EventCard from '../../components/EventCard';
import {firebase} from '@react-native-firebase/database';
import {getRealTimeData, getRecentSortedData, getTodayData} from './funcs';
import {ScreenProps, uploadDataType} from '../../types/types';
import {checkLastTransac} from '../AddExpense/utils';
import {capitalize} from '../../utils/generalUtils';
import PopMessageBox from '../../components/PopupBox';

type HomeScreenProps = ScreenProps<'Home'>;

const Home: React.FC<HomeScreenProps> = ({navigation}) => {
  const db = firebase.app().database(dbUrl);
  const [totalIncome, setTotalIncome] = useState<number | null>(null);
  const [totalExpense, setTotalExpense] = useState<number | null>(null);
  const [todayExpense, setTodayExpense] = useState(0);
  const [todayIncome, setTodayIncome] = useState(0);
  const [events, setEvents] = useState<uploadDataType[] | void>();
  const [showPopArray, setShowPopArray] = useState<boolean[]>([]);
  const tintColor: string = themeColor;

  useEffect(() => {
    checkLastTransac();
    getRecentSortedData(setEvents);
    const fnc = async () => {
      let income = 0;
      await getRealTimeData('/user1/totalIncome', data => {
        income = data;
        setTotalIncome(data);
      });
      await getRealTimeData('/user1/totalExpense', data => {
        const availableAmount = parseInt(income.toString()) - data;
        setTotalExpense(availableAmount);
      });

      await getTodayData('expense', setTodayExpense);

      await getTodayData('income', setTodayIncome);
    };

    fnc();
  }, []);

  useEffect(() => {
    if (events) {
      setShowPopArray(events.map(() => false));
    }
  }, [events]);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.header}>One Rupee</Text>
          <View style={{paddingTop: 50, paddingBottom: 10}}>
            {totalIncome && totalExpense ? (
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
                <Text style={{color: 'white', fontSize: 14}}>
                  Loading cards...
                </Text>
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
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
});

export default Home;
