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

type AnalysisProp = ScreenProps<'Analysis'>;

const Analysis: React.FC<AnalysisProp> = ({navigation}) => {
  const [cardEvents, setCardEvents] = useState<uploadDataType[]>();
  const [pieChartData, setPieChartdata] = useState<pieChartDataType[]>();
  const [refreshState, setRefreshStat] = useState<boolean>();
  const [showPopArray, setShowPopArray] = useState<boolean[]>([]);

  const handleChange = () => {
    setRefreshStat(!refreshState);
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const sources = await getSources();
        console.log('sources', sources);
        if (sources) {
          const clusterData = clusterDataByCategory(sources);
          const piData = getPieChartData(clusterData);
          console.log('pi data', piData);
          setPieChartdata(piData);
        }
        setCardEvents(sources);
      } catch (e) {
        console.log(e);
        throw e;
      }
    };
    fetchdata();
  }, [refreshState]);

  useEffect(() => {
    if (cardEvents) {
      setShowPopArray(cardEvents.map(() => false));
    }
  }, [cardEvents]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Analysis</Text>
      </View>
      <View>
        {pieChartData ? (
          <PieChartComponent data={pieChartData} />
        ) : (
          <Text style={{color: 'white'}}>Loading....</Text>
        )}
      </View>
      <View style={styles.cardParent}>
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
              <Text style={{color: themeColor, fontSize: 15, paddingRight: 5}}>
                Refresh
              </Text>
              <MaterialCommunityIcons
                name="restore"
                color={themeColor}
                size={20}
              />
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
      </View>
      {/* <NavBar colors={['#fff', '#fff', themeColor]} /> */}
    </SafeAreaView>
  );
};

export default Analysis;

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
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
    alignItems: 'center',
    backgroundColor: '#202020',
    marginTop: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // marginBottom: 60,
    // marginBottom: '15%',
  },
  cardHeader: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
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
