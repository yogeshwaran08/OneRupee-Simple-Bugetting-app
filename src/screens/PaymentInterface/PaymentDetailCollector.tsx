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

type PaymentScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'PaymentDetailCollector'>;
  route: RouteProp<RootStackParamList, 'PaymentDetailCollector'>;
};

const PaymentDetailCollector: React.FC<PaymentScreenProps> = ({
  navigation,
  route,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState<dropDownMenuType[]>();
  const [location, setLocation] = useState<string | null>('');
  const [desc, setDesc] = useState<string>('');
  const [errorText, setErrorText] = useState<string | null>();
  const [categories, setCategories] = useState<dropDownMenuType[] | null>(null);
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
          console.log('success', res);
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
          await uploadData(data);
        },
        res => {
          console.log('failed', res);
        },
      );
    } catch (e) {
      console.log('error ', e);
    }
  };
  const handleSubmit = () => {
    console.log('asdasd');
    if (amount == 0) {
      setErrorText('Amount Cannot be 0');
    } else if (desc.trim() === '') {
      setErrorText('Description cannot be empty');
    } else if (location === null) {
      setErrorText('Please select a location');
    } else {
      setErrorText('Processing');
      handlePayment(
        payeeAddress,
        payeeName,
        amount.toString(),
        desc,
        location,
        transactionId,
      );
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.parent}>
        <View style={styles.container}>
          <View style={styles.headerContianer}>
            <Text style={globalStyles.pageHeaderText}>
              Paying to {payeeName}
            </Text>
            <Text style={styles.subHeader}>with address of {payeeAddress}</Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.input}>
              <InputBox
                placeholder="Amount to send"
                iconName="money"
                multiline={false}
                setText={setAmount}
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
                  iconName="people-arrows"
                />
              ) : (
                <Droupdown
                  value={category}
                  setValue={setCategory}
                  data={defaultDropdownValue}
                  placeholder="Something went wrong"
                  iconName="people-arrows"
                />
              )}
            </View>
            <View style={styles.input}>
              <InputBox
                placeholder="Description"
                iconName="newspaper-o"
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
                  iconName="search-location"
                />
              ) : (
                <Droupdown
                  disable={true}
                  value={category}
                  setValue={setCategory}
                  data={defaultDropdownValue}
                  placeholder="Gathering Locations..."
                  iconName="search-location"
                />
              )}
            </View>
            <Text style={styles.errorMessageStyle}>{errorText}</Text>
            <View style={styles.btnContainer}>
              <CustomButton onPress={handleSubmit} text="Pay Via UPI" />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PaymentDetailCollector;

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    height: '100%',
    width: '90%',
  },
  subHeader: {
    color: 'white',
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
    backgroundColor: backgroundColor,
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
});
