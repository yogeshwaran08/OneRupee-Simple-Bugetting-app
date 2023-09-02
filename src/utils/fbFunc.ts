import { firebase } from "@react-native-firebase/database";
import { dbUrl } from "../constants";

const db = firebase.app().database(dbUrl)


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

export const setData = async(path : string, data : any) => {
    const ref = await db.ref(path).set(data)
    .then(success => {return true})
    .catch(error => {
        console.log("Error Occured on setting data" , error);
        return false;
    });
}

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

