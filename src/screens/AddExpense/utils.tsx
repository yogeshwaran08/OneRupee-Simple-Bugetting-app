import {dropDownMenuType, uploadDataType} from '../../types/types';
import {firebase} from '@react-native-firebase/database';
import {dbUrl} from '../../constants';
import {getData, setData} from '../Home/funcs';
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';
import {GOOGLE_MAP_API_KEY} from '../../config/secreatsAPI';
import {pieCategories, incomeCategories} from '../../constants';

Geocoder.init(GOOGLE_MAP_API_KEY);

export const getCurrentLocation = async () => {
  try {
    const location = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 6000,
    });
    console.log('location ', location);
    return location;
  } catch {
    console.log('error');
  }
};

export const getCategoryData = (type: 'income' | 'expense' | null) => {
  if (type === null) {
    return null;
  } else if (type === 'income') {
    const extractCategories: dropDownMenuType[] = Object.values(
      incomeCategories,
    ).map(({name, codename}) => ({
      name,
      codename,
    }));

    return extractCategories;
  } else if ('expense') {
    const extractCategories: dropDownMenuType[] = Object.values(
      pieCategories,
    ).map(({name, codename}) => ({
      name,
      codename,
    }));
    return extractCategories;
  }
};

export const getAddress = async (
  callback: (data: dropDownMenuType[]) => void,
) => {
  const location = await getCurrentLocation();
  if (location?.latitude && location.longitude) {
    const lat = location.latitude;
    const long = location.longitude;
    const addr: dropDownMenuType[] = [];
    Geocoder.from(lat, long)
      .then(addressLocation => {
        addressLocation['results'].forEach(items => {
          console.log('addr : ', items.formatted_address);
          // const lbl = ;
          // console.log(lbl);
          addr.push({
            name: items.formatted_address,
            codename: items.formatted_address,
          });
          callback(addr);
        });
      })
      .catch(error => {
        console.log('error occured on fethcing address ', error);
      });
  }
};

export const checkLastTransac = async (uid: string) => {
  const date = new Date().getDate().toString();
  const month = (new Date().getMonth() + 1).toString();
  const year = new Date().getFullYear().toString();
  const lastTransactionDate = await getData(`/${uid}/LastTransactionDate`);

  const tempDateArr = lastTransactionDate.split('/');

  if (
    tempDateArr[0] !== date ||
    tempDateArr[1] !== month ||
    tempDateArr[2] !== year
  ) {
    await setData(`/${uid}/LastTransactionDate`, `${date}/${month}/${year}`);
    await setData(`/${uid}/noExpensesToday`, 0);
    await setData(`/${uid}/noIncomeToday`, 0);
  }
};

export const uploadData = async (uid: string, data: uploadDataType) => {
  const db = firebase.app().database(dbUrl);
  db.ref(`/${uid}/${data.type}`).push(data);
  await checkLastTransac(uid);

  if (data.type === 'income') {
    console.log('inside the income');
    try {
      const totalIncome: number = parseInt(data.amount.toString());
      const currentIncome: number = await getData(`/${uid}/totalIncome`);
      setData(`/${uid}/totalIncome`, totalIncome + currentIncome);
      const transactionCount: number = await getData(`/${uid}/noIncomeToday`);
      setData(`/${uid}/noIncomeToday`, transactionCount + 1);
    } catch (e) {
      console.log('error occured', e);
    }
  } else if (data.type === 'expense') {
    console.log('inside the expense');
    try {
      const totalExpense: number = parseInt(data.amount.toString());
      const currentExpense: number = await getData(`/${uid}/totalExpense`);
      setData(`/${uid}/totalExpense`, totalExpense + currentExpense);
      const transactionCount: number = await getData(`/${uid}/noExpensesToday`);
      setData(`/${uid}/noExpensesToday`, transactionCount + 1);
    } catch (e) {
      console.log('error occured on adding expense', e);
    }
  } else {
    console.log(
      'error occured the given data does not have income nor expense',
    );
  }
};
