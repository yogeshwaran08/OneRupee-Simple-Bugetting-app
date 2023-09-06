import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScreenProps, dropDownMenuType, uploadDataType} from '../../types/types';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/Header';
import InputBox from '../../components/InputBox';
import Droupdown from '../../components/Droupdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Dropdown from '../../components/Droupdown';
import {defaultDropdownValue, incomeType} from '../../constants';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from '../../components/CustomButton';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useToast} from 'react-native-toast-notifications';
import {getAddress, getCategoryData, uploadData} from './utils';
import {useAuth} from '../AuthFlow/authContext';

type AddExpenseProps = ScreenProps<'AddExpense'>;

const AddExpense: React.FC<AddExpenseProps> = ({navigation}) => {
  const [typeValue, setTypeValue] = useState<'income' | 'expense' | null>(null);
  const [amount, setAmount] = useState<string>('0');
  const [description, setdescription] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>('');
  const [address, setAddress] = useState<dropDownMenuType[]>();
  const [categories, setCategories] = useState<dropDownMenuType[] | null>(null);
  const rotate = useSharedValue('0deg');
  const btnTranformY = useSharedValue(0);
  const [user, Initilizing] = useAuth();
  const toast = useToast();

  const tap = Gesture.Tap()
    .onBegin(() => {
      rotate.value = withSpring('-30');
      btnTranformY.value = withSpring(-3);
    })
    .onFinalize(() => {
      rotate.value = withSpring('0');
      btnTranformY.value = withSpring(0);
    });

  const btnAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateY: btnTranformY.value}],
    };
  });

  const handleSubmit = async () => {
    let msg = '';
    let msgType: 'success' | 'warning' = 'warning';
    if (
      typeValue !== null &&
      amount.trim() !== '0' &&
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
        amount: parseInt(amount),
        date: date,
        description: description,
        category: category,
        eventMonth: month,
        eventYear: year,
        //@ts-ignore
        type: typeValue,
        location: location,
      };
      if (user) await uploadData(user.uid, data);
      else {
        console.log('error occured');
        // navigation.dispatch(StackActions.replace('Login'));
      }
      setAmount('0');
      setdescription('');
      setTypeValue(null);
      setCategory(null);
      setLocation(null);
      msg = 'Data updated successfully!';
      msgType = 'success';
    } else if (amount === '0') {
      msg = 'Amount cannot be 0';
    } else {
      msg = 'Please Fill all fields';
    }

    toast.show(msg, {
      type: msgType,
      duration: 3000,
      placement: 'top',
    });
  };

  useEffect(() => {
    const data = getCategoryData(typeValue);
    if (typeValue === null) {
      setCategories(null);
    }
    if (data) {
      setCategories(data);
    }
  }, [typeValue]);

  useEffect(() => {
    getAddress(data => {
      setAddress(data);
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <LinearGradient
        style={styles.container}
        colors={['rgba(250,167,62, 0.2)', '#fff', 'rgba(250, 167, 62, 0.2)']}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}>
        <ScrollView>
          <KeyboardAvoidingView behavior="padding">
            {/* Header */}
            <Header scrnName="Add Accounts" />
            <View style={styles.innerContainer}>
              <Droupdown
                value={typeValue}
                setValue={setTypeValue}
                data={incomeType}
                placeholder="Select type"
                iconName={() => {
                  return (
                    <FontAwesome5
                      name="coins"
                      color={'gray'}
                      size={25}
                      style={{paddingHorizontal: 5}}
                    />
                  );
                }}
                containerStyle={{marginTop: 30}}
              />
              <InputBox
                text={amount.toString()}
                setText={text => {
                  setAmount(text);
                }}
                placeholder="Amount"
                secureTextEntry={false}
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
                type="numeric"
                containerStyle={{marginVertical: 15}}
              />
              {categories ? (
                <Droupdown
                  disable={false}
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
                  containerStyle={{marginBottom: 10}}
                />
              ) : (
                <Droupdown
                  disable={true}
                  value={category}
                  setValue={setCategory}
                  data={defaultDropdownValue}
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
                  containerStyle={{marginBottom: 10}}
                />
              )}
              {address ? (
                <Droupdown
                  disable={false}
                  value={location}
                  setValue={setLocation}
                  data={address}
                  placeholder="Select Location"
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
                  containerStyle={{marginTop: 5}}
                />
              ) : (
                <Droupdown
                  disable={true}
                  value={location}
                  setValue={setLocation}
                  data={defaultDropdownValue}
                  placeholder="Gathering location details"
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
                  containerStyle={{marginTop: 5}}
                />
              )}
              <InputBox
                text={description}
                setText={text => {
                  setdescription(text);
                }}
                placeholder="Description"
                multiline={true}
                height={80}
                type="text"
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
                containerStyle={{marginTop: 15}}
              />
              <GestureHandlerRootView>
                <GestureDetector gesture={tap}>
                  <Animated.View style={[btnAnimation]}>
                    <Pressable style={styles.AddBtn} onPress={handleSubmit}>
                      <Text style={styles.AddText}>Add Accounts</Text>
                      {/* @ts-ignore */}
                      <Animated.View style={{transform: [{rotate}]}}>
                        <Entypo
                          name={'arrow-with-circle-right'}
                          color={'white'}
                          size={30}
                        />
                      </Animated.View>
                    </Pressable>
                  </Animated.View>
                </GestureDetector>
              </GestureHandlerRootView>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    width: '90%',
    height: '100%',
    alignSelf: 'center',
  },
  AddBtn: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgb(242, 173, 12)',
    borderRadius: 20,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 30,
  },
  AddText: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    paddingRight: 10,
  },
});
