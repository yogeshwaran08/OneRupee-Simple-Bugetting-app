import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {backgroundColor, globalStyles} from '../../constants';
import InputBox from '../../components/InputBox';
import CustomButton from '../../components/CustomButton';
import RNUpiPayment from 'react-native-pay-by-upi';
import {uploadDataType, dropDownMenuType} from '../../types/types';
import Droupdown from '../../components/Droupdown';
import {getAddress, getCategoryData, uploadData} from '../AddExpense/utils';
import {defaultDropdownValue} from '../../constants';
import {RootStackParamList} from '../../navigation/ScreenTypes';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {generateTransactionReference} from './utils';
import {useAuth} from '../AuthFlow/authContext';
import {useToast} from 'react-native-toast-notifications';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

type PaymentScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'PaymentDetailCollector'>;
  route: RouteProp<RootStackParamList, 'PaymentDetailCollector'>;
};

const PaymentDetailCollector: React.FC<PaymentScreenProps> = ({
  navigation,
  route,
}) => {
  const [amount, setAmount] = useState<string>('0');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState<dropDownMenuType[]>();
  const [location, setLocation] = useState<string | null>('');
  const [desc, setDesc] = useState<string>('');
  const [errorText, setErrorText] = useState<string | null>();
  const [categories, setCategories] = useState<dropDownMenuType[] | null>(null);
  const [user, Initilizing] = useAuth();
  const toast = useToast();
  const data = route.params;
  let payeeName = '';
  let payeeAddress = '';
  if (data.pn && data.pa) {
    payeeName = data.pn;
    payeeAddress = data.pa;
  }
  useEffect(() => {
    getAddress(data => {
      setAddress(data);
    });
  }, []);

  useEffect(() => {
    const data = getCategoryData('expense');
    if (data) setCategories(data);
  }, []);

  const transactionId = generateTransactionReference();
  console.log(transactionId);
  const handlePayment = (
    pa: string,
    payeeName: string,
    amount: string,
    desc: string,
    location: string,
    refID: string,
  ) => {
    try {
      RNUpiPayment.initializePayment(
        {
          vpa: pa,
          payeeName: payeeName,
          amount: amount,
          transactionRef: refID,
          transactionNote: desc,
        },
        async res => {
          toast.show('Success', {
            type: 'success',
            duration: 3000,
            placement: 'top',
          });
          const timeStamp = new Date().getTime();
          const date = new Date().getDate();
          const month = new Date().getMonth();
          const year = new Date().getFullYear();
          const data: uploadDataType = {
            timeStamp: timeStamp,
            amount: parseInt(amount),
            date: date,
            description: desc,
            category: category,
            eventMonth: month,
            eventYear: year,
            //@ts-ignore
            type: typeValue,
            location: location,
          };
          if (user) await uploadData(user.uid, data);
        },
        res => {
          toast.show('error occured', {
            type: 'warning',
            duration: 3000,
            placement: 'top',
          });
        },
      );
    } catch (e) {
      toast.show('Unknown error', {
        type: 'error',
        duration: 3000,
        placement: 'top',
      });
    }
  };
  const handleSubmit = () => {
    if (amount == '0' || amount === null || amount === undefined) {
      toast.show('Amount cannot be zero', {
        type: 'warning',
        duration: 3000,
        placement: 'top',
      });
    } else if (desc.trim() === '') {
      toast.show('Description cannot be empty', {
        type: 'warning',
        duration: 3000,
        placement: 'top',
      });
    } else if (location === null) {
      toast.show('Please select a valid location', {
        type: 'warning',
        duration: 3000,
        placement: 'top',
      });
    } else {
      handlePayment(
        payeeAddress,
        payeeName,
        amount,
        desc,
        location,
        transactionId,
      );
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <LinearGradient
        style={styles.parent}
        colors={['rgba(250,167,62, 0.2)', '#fff', 'rgba(250, 167, 62, 0.2)']}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}>
        <View style={styles.container}>
          <View style={styles.headerContianer}>
            <Text style={styles.pageHeaderText}>Paying to {payeeName}</Text>
            <Text style={styles.subHeader}>with address of {payeeAddress}</Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.input}>
              <InputBox
                placeholder="Amount to send"
                iconName={() => {
                  return (
                    <FontAwesome
                      name="money"
                      color={'gray'}
                      size={20}
                      style={{marginRight: 8}}
                    />
                  );
                }}
                multiline={false}
                setText={text => setAmount(text)}
                text={amount.toString()}
                type={'numeric'}
              />
            </View>
            <View style={styles.input}>
              {categories ? (
                <Droupdown
                  value={category}
                  setValue={setCategory}
                  data={categories}
                  placeholder="Select Category"
                  iconName={() => {
                    return (
                      <MaterialIcons
                        name="category"
                        color={'gray'}
                        size={25}
                        style={{paddingHorizontal: 5}}
                      />
                    );
                  }}
                />
              ) : (
                <Droupdown
                  value={category}
                  setValue={setCategory}
                  data={defaultDropdownValue}
                  placeholder="Something went wrong"
                  iconName={() => {
                    return (
                      <MaterialIcons
                        name="category"
                        color={'gray'}
                        size={25}
                        style={{paddingHorizontal: 5}}
                      />
                    );
                  }}
                />
              )}
            </View>
            <View style={styles.input}>
              <InputBox
                placeholder="Description"
                iconName={() => {
                  return (
                    <MaterialIcons
                      name="description"
                      size={20}
                      color={'gray'}
                      style={{marginVertical: 8}}
                    />
                  );
                }}
                multiline={true}
                setText={setDesc}
                text={desc}
                height={80}
                type={'text'}
              />
            </View>

            <View style={styles.input}>
              {address ? (
                <Droupdown
                  value={location}
                  setValue={setLocation}
                  data={address}
                  placeholder="Location"
                  iconName={() => {
                    return (
                      <Entypo
                        name="location-pin"
                        color={'gray'}
                        size={25}
                        style={{paddingHorizontal: 5}}
                      />
                    );
                  }}
                />
              ) : (
                <Droupdown
                  disable={true}
                  value={category}
                  setValue={setCategory}
                  data={defaultDropdownValue}
                  placeholder="Gathering Locations..."
                  iconName={() => {
                    return (
                      <Entypo
                        name="location-pin"
                        color={'gray'}
                        size={25}
                        style={{paddingHorizontal: 5}}
                      />
                    );
                  }}
                />
              )}
            </View>
            <Text style={styles.errorMessageStyle}>{errorText}</Text>
            <View style={styles.btnContainer}>
              <CustomButton onPress={handleSubmit} text="Pay Via UPI" />
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default PaymentDetailCollector;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    height: '100%',
    width: '90%',
  },
  subHeader: {
    fontFamily: 'Poppins-Regular',
    color: 'black',
    paddingTop: 10,
  },
  headerContianer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  parent: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '25%',
  },
  input: {
    paddingBottom: 20,
    width: '100%',
  },
  btnContainer: {
    width: '100%',
  },
  errorMessageStyle: {
    color: 'red',
    paddingBottom: 20,
  },
  pageHeaderText: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },
});
