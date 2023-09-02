import { firebase } from "@react-native-firebase/database";
import { dbUrl } from "../../constants";
import { uploadDataType } from "../../types/types";

const db = firebase.app().database(dbUrl);

interface temp {
  [key: string] : uploadDataType
}


export const getData = async (path : string) => {
    const ref = db.ref(path);
    return ref.once("value")
      .then(snapshot => {
        return snapshot.val();
      })
      .catch(error => {
        console.error("An error occurred:", error);
      });
  };

export const getRealTimeData = (path:string, callback : (data: any) => void) => {
  return new Promise((resolve, reject) => {
    const ref = db.ref(path)
    ref.on("value", snapshot => {
    const data = snapshot.val()
    callback(data);
    resolve("success")
  })
  })
}


  export const getLimitingData = async (path : string, numberOfData: number) => {
    const ref = db.ref(path).limitToFirst(numberOfData);
    return ref.once("value")
      .then(snapshot => {
        return snapshot.val();
      })
      .catch(error => {
        console.error("An error occurred:", error);
      });
  };

export const setData = async(path : string, data : any) => {
    const ref = await db.ref(path).set(data)
    .then(success => {return true})
    .catch(error => {
        console.log("Error Occured on setting data" , error);
        return false;
    });
}

export const pushData = (path : string, data : any) => {
    const ref = db.ref(path).push();
    ref.set(data)
    .then(success => {return ref.key})
    .catch(error => {
        console.log("error Occured in pushing data",error);
        return false;
    });
}

export const getTodayDataa = async (uid : string,type: 'income' | 'expense'): Promise<number> => {
  const path = (type === "expense") ? `/${uid}/noExpensesToday` : `/${uid}/noIncomeToday`;
  let amount = 0;
  const noOfTransaction = await getData(path);
  // await getRealTimeData(path, async noOfTransaction => {
    if (noOfTransaction != 0)
    {
        const todayData: temp = await getLimitingData(`/${uid}/${type}`, noOfTransaction);
        const values = Object.values(todayData);
        const sortedData = values.sort((a, b) => b.timeStamp - a.timeStamp);
        sortedData.forEach((item) => {
          amount += parseInt(item.amount.toString(), 10); // Parse as base 10
        });
        // console.log("Total amount:", amount);
      }
      else{
        console.log("Amount is 0 setting 0 for ",path)
      }
    // });

  return amount;
}

export const getRecentSortedData= async (uid : string, setFunc : (data : any) => void) => {
  const noOfEvents = 10;
  // await getRealTimeData(`/${uid}/noExpensesToday`, async noOfTransaction => {
    const recentData: temp = await getLimitingData(`/${uid}/expense`, noOfEvents);
    if(recentData !== null)
    {
      const values = Object.values(recentData);
      const sortedData = values.sort((a, b) => b.timeStamp - a.timeStamp);
      setFunc(sortedData);
    }
    else {
      setFunc(null);
    } 
// });
}