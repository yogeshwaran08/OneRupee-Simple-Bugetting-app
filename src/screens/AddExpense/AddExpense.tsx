import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';

import {
  colors,
  globalStyles,
  pieCategories,
  incomeType,
  defaultDropdownValue,
} from '../../constants';

import React, {useState, useEffect} from 'react';
import InputBox from '../../components/InputBox';
import Droupdown from '../../components/Droupdown';
import CustomButton from '../../components/CustomButton';

import {ScreenProps, dropDownMenuType, uploadDataType} from '../../types/types';
import {getAddress, getCategoryData, uploadData} from './utils';

type AddExpenseProps = ScreenProps<'AddExpense'>;

const AddExpense: React.FC<AddExpenseProps> = ({navigation}) => {
  const [typeValue, setTypeValue] = useState<'income' | 'expense' | null>(null);
  const [amount, setAmount] = useState(0);
  const [description, setdescription] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [showLog, setShowLog] = useState('');
  const [categories, setCategories] = useState<dropDownMenuType[] | null>(null);
  const [address, setAddress] = useState<dropDownMenuType[]>();
  const [location, setLocation] = useState<string | null>('');

  useEffect(() => {
    getAddress(data => {
      setAddress(data);
    });
  }, []);

  useEffect(() => {
    const data = getCategoryData(typeValue);
    if (typeValue === null) {
      setCategories(null);
    }
    if (data) {
      setCategories(data);
    }
  }, [typeValue]);

  const handleSubmit = async () => {
    if (
      typeValue !== null &&
      amount !== 0 &&
      description !== '' &&
      category !== null &&
      category !== 'NOTCHOOSED' &&
      location !== null
    ) {
      const date = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const timeStamp = new Date().getTime();

      const data: uploadDataType = {
        timeStamp: timeStamp,
        amount: amount,
        date: date,
        description: description,
        category: category,
        eventMonth: month,
        eventYear: year,
        //@ts-ignore
        type: typeValue,
        location: location,
      };
      await uploadData(data);
      setAmount(0);
      setdescription('');
      setTypeValue(null);
      setCategory(null);
      setLocation(null);
      setShowLog('Success...');
    } else if (amount == 0) {
      setShowLog('Amount cannot be empty');
    } else {
      setShowLog('Please Fill all fields');
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ScrollView
          style={{width: '100%'}}
          contentContainerStyle={{alignItems: 'center'}}>
          <Text style={[styles.headText, globalStyles.pageHeaderText]}>
            Add Accounts
          </Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputStyle}>
              <Droupdown
                value={typeValue}
                setValue={setTypeValue}
                data={incomeType}
                placeholder="Select type"
                iconName="coins"
              />
            </View>
            <KeyboardAvoidingView behavior={'height'} style={styles.inputStyle}>
              <InputBox
                placeholder="Amount"
                iconName="money"
                type="numeric"
                height={53}
                text={amount.toString()}
                setText={setAmount}
              />
            </KeyboardAvoidingView>
            <View style={styles.inputStyle}>
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
                  disable={true}
                  value={category}
                  setValue={setCategory}
                  data={defaultDropdownValue}
                  placeholder="Select Category"
                  iconName="people-arrows"
                />
              )}
            </View>
            <View style={styles.inputStyle}>
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
            <KeyboardAvoidingView
              behavior={'padding'}
              style={styles.inputStyle}>
              <InputBox
                placeholder="Description"
                iconName="newspaper-o"
                height={100}
                multiline={true}
                type="text"
                text={description}
                setText={setdescription}
              />
            </KeyboardAvoidingView>
            <View style={styles.errorMessageContainer}>
              <Text style={styles.statusMessage}>{showLog}</Text>
            </View>
            <CustomButton onPress={handleSubmit} text="Add Accounts" />
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  flexStyle: {
    flex: 1,
  },
  container: {
    backgroundColor: colors.appBackgroundColor,
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  headText: {
    paddingTop: 40,
  },
  inputContainer: {
    width: '90%',
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    paddingBottom: 20,
    width: '100%',
  },
  statusMessage: {
    color: 'white',
    paddingTop: 5,
    paddingBottom: 10,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
