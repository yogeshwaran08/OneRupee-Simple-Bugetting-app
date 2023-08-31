import {firebase} from '@react-native-firebase/database';
import { dbUrl } from '../constants';

export const getData = () => {
    //get data
}

export const getTotalIncome = () => {
    //get income
}

export const getTotalExpense= () => {
    // get expense
}

export const getRecentEvents = () => {
    //get recent events
}

export const getExpenses = () => {
    //get expenses
}

export const pushData = (path : string, data : string) => {
    const db = firebase
    .app()
    .database(dbUrl);
    const ref = db.ref(path).push(data);
    return ref.key;
}

//handle user input
const setUserInput = () => {
    
}
