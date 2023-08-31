import { StyleSheet } from "react-native";
import { piChartCategoriesType, defaultStylesType, defaultColorsType, dropDownMenuType} from "./types/types";

export const backgroundColor = "#151316";
export const font = "#fff";
export const secondaFontColor = "#C6C6C6";
export const headerFontSize = 22;
export const themeColor = "#FD8D26";
export const dbUrl = "https://onerupee-b2eec-default-rtdb.asia-southeast1.firebasedatabase.app/";


export const colors : defaultColorsType = {
    appBackgroundColor : "#151316",
    primaryForeground : "#fff",
    secondaryForeground : "#A3A3A3",
    highlightColor : "#FD8D26",
    lossColor : "#FF0000",
    gainColor : "#008000",
    cardBackground : "#444",
    inputFieldColor : "rgba(126, 124, 124, 0.56)",
    iconColor : "#fff",
    placeholder : "gray",
}

export const globalStyles : defaultStylesType  = StyleSheet.create({
    pageHeaderText : {
        color: colors.primaryForeground,
        fontSize: 22,
        fontWeight: 'bold',
    },

    subHeading : {
        color: colors.primaryForeground,
        fontSize: 20,
        fontWeight: 'bold',
    }
})

export const pieCategories : piChartCategoriesType  = {
    essentials : {color : "#16ba0d", name : "Essentials", codename : "essentials"},
    fancy : {color : "#32a881", name : "Fancy", codename : "fancy"},
    food : {color : "#e0a510", name : "Food", codename : "food"},
    transport : {color : "#10e0af", name : "Transport", codename : "transport"},
    entertainment : {color : "#ace010", name : "Entertainment", codename : "entertainment"},
    donation : {color :  "#104be0", name : "Donation / Charity", codename : "donation"},
    investment: {color : "#6a10e0", name : "Investments", codename : "investment"},
    medical : {color : "#e0104b", name : "Medical expenses", codename : "medical"},
    insurance : {color : "#7f4fc2", name : "Insurace", codename : "insurance"},
    savings : {color : "#2194c2", name : "Saving", codename : "savings"},
    monthlyBills : {color : "#21c28f", name : "Mothly Bills", codename : "monthlyBills"}
}

export const incomeCategories : piChartCategoriesType ={
    salary : {color : "#16ba0d" , name:"Salary", codename:'salary'},
    bonus : {color : "#32a881", name:"Bonus", codename : "bonus"},
    partTimeWork : {color : "#e0104b", name: "Part Time Work", codename: "partTimeWork"},
    others : {color : "#21c28f", name : 'Others', codename:'others'}
}

export const incomeType : dropDownMenuType[] = [
    {name : "Income", codename : "income"},
    {name : "Expense", codename : "expense"}
]

export const defaultDropdownValue : dropDownMenuType[] = [
    {name : "No Data", codename : "no data"}
]