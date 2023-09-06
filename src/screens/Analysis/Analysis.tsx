import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {backgroundColor, themeColor} from '../../constants';
import PieChartComponent from '../../components/PieChartComponent';
import AccountsCard from '../../components/AccountsCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {capitalize} from '../../utils/generalUtils';
import {
  getSources,
  clusterDataByCategory,
  getPieChartData,
  pieChartDataType,
} from './utils';
import {ScreenProps, uploadDataType} from '../../types/types';
import PopMessageBox from '../../components/PopupBox';
import {StackActions, useIsFocused} from '@react-navigation/native';
import {useAuth} from '../AuthFlow/authContext';
import Header from '../../components/Header';
import LinearGradient from 'react-native-linear-gradient';

type AnalysisProp = ScreenProps<'Analysis'>;

const Analysis: React.FC<AnalysisProp> = ({navigation}) => {
  const isFocused = useIsFocused();
  const [cardEvents, setCardEvents] = useState<uploadDataType[]>();
  const [pieChartData, setPieChartdata] = useState<
    pieChartDataType[] | null | undefined
  >(undefined);
  const [refreshState, setRefreshStat] = useState<boolean>();
  const [showPopArray, setShowPopArray] = useState<boolean[]>([]);
  const [user, initilizing] = useAuth();

  const handleChange = () => {
    setRefreshStat(!refreshState);
  };

  useEffect(() => {
    const fetchdata = async () => {
      if (user) {
        try {
          const sources = await getSources(user?.uid);
          console.log('sources', sources);
          if (sources) {
            const clusterData = clusterDataByCategory(sources);
            const piData = getPieChartData(clusterData);
            // console.log('pi data', piData);
            setPieChartdata(piData);
          } else {
            setPieChartdata(null);
          }
          setCardEvents(sources);
        } catch (e) {
          console.log(e);
          throw e;
        }
      } else {
        console.log('error in user');
        navigation.dispatch(StackActions.replace(''));
      }
    };
    fetchdata();
  }, [refreshState, isFocused, initilizing]);

  useEffect(() => {
    if (cardEvents) {
      setShowPopArray(cardEvents.map(() => false));
    }
  }, [cardEvents]);

  return (
    <LinearGradient
      style={styles.container}
      colors={['rgba(250,167,62, 0.2)', '#fff', 'rgba(250, 167, 62, 0.2)']}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
      <Header scrnName="Analysis" />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '35%',
          // backgroundColor: 'black',
        }}>
        {pieChartData === null ? (
          <Text style={{color: 'black'}}>No data</Text>
        ) : pieChartData === undefined ? (
          <Text style={{color: 'white'}}>Loading...</Text>
        ) : (
          <PieChartComponent data={pieChartData} />
        )}
      </View>

      <LinearGradient
        style={styles.cardParent}
        colors={['rgba(250,167,62, 0.5)', 'rgba(250,167,62, 0.5)']}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}>
        <View style={styles.cardContainer}>
          <View style={styles.srcHeader}>
            <Text style={styles.cardHeader}>Sources</Text>
            <Pressable
              onPress={handleChange}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 15,
                  paddingRight: 5,
                  fontFamily: 'Poppins-Regular',
                }}>
                Refresh
              </Text>
              <MaterialCommunityIcons name="restore" color={'gray'} size={20} />
            </Pressable>
          </View>
          <ScrollView style={styles.scrollableContainer}>
            {cardEvents?.map((event, index) => (
              <Pressable
                style={styles.cardItem}
                key={index}
                onPress={() => {
                  const updatedShowPopArray = [...showPopArray];
                  updatedShowPopArray[index] = true;
                  setShowPopArray(updatedShowPopArray);
                }}>
                <AccountsCard
                  title={capitalize(event.category)}
                  amount={event.amount}
                  description={event.description}
                  transactionType={event.type}
                  location={event.location}
                />
                <PopMessageBox
                  isVisible={showPopArray[index]}
                  onClose={() => {
                    const updatedShowPopArray = [...showPopArray];
                    updatedShowPopArray[index] = false;
                    setShowPopArray(updatedShowPopArray);
                  }}
                  data={cardEvents[index]}
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </LinearGradient>
    </LinearGradient>
  );
};

export default Analysis;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerContainer: {
    height: '13%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardParent: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    backgroundColor: 'white',
    // marginTop: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '100%',
    // marginBottom: 60,
    // marginBottom: '15%',
  },
  cardHeader: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  srcHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContainer: {
    width: '90%',
    paddingTop: 20,
  },
  cardItem: {
    paddingBottom: 10,
  },
  scrollableContainer: {
    paddingTop: 20,
    marginBottom: '8%',
  },
});
