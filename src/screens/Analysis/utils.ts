import { getData } from "../Home/funcs";
import { uploadDataType } from "../../types/types";

export type seperatedDataType = {
    [key in "fancy" | "food" | "essentials" | "transport" | "entertainment" | "donation" | "investment" | "medical" | "insurance" | "savings" | "monthlyBills"]: uploadDataType;
};

export type ClusteredData = Record<string, uploadDataType[]>;

export const getSources = async () => {
    try{
        // const incomeData = await getData("/user1/income");
        const expenseData = await getData("/user1/expense");

        // const incomeValue :uploadDataType[] = Object.values(incomeData);
        const expenseValue :uploadDataType[] = Object.values(expenseData);
        const accounts :uploadDataType[] = [...expenseValue];

        accounts.sort((a:uploadDataType,b:uploadDataType) => b.timeStamp - a.timeStamp);
        console.log("accounts", accounts);
        return accounts;
    }
    catch (error){
        console.log("error occured ", error);
    }
}

export const clusterDataByCategory = (data: uploadDataType[]): ClusteredData => {
  const clusteredData: ClusteredData = {};

  data.forEach((item) => {
    if (!clusteredData[item.category]) {
      clusteredData[item.category] = [];
    }
    clusteredData[item.category].push(item);
  });

  return clusteredData;
};

export const getTotalAmount = (data : uploadDataType[]) => {
    let totalAmount : number = 0;
    data.forEach((item) => {
        totalAmount += parseInt(item.amount.toString());
    })
    return totalAmount;
}

export type pieChartDataType = {
    value : number,
    color : string
}

const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  

export const getPieChartData = (clusteredData : ClusteredData) => {
    // const clusteredData = clusterDataByCategory(data);

    let chartData : pieChartDataType[] = [];

    for (const key in clusteredData){
        const val = clusteredData[key];
        const totAmt = getTotalAmount(val);
        // const color = pieCategories[key].color;
        const color = generateRandomColor();
        console.log("category : ",key,"color : ",color);
        chartData.push({value : totAmt, color : color});
    }

    return chartData;
}