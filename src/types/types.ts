import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../navigation/ScreenTypes';


export interface piChartCategoriesType {
    [key : string] : {color : string, name : string, codename : string}
}

export interface categoryComponentType { 
    name : string,
    codename : string
}

export interface defaultStylesType  {
    [key : string] : {[key : string] : string | number}
}

export interface defaultColorsType {
    [key : string] : string
}

export interface dropDownMenuType {
    name : string,
    codename : string,
}


export type ScreenProps<RouteName extends keyof RootStackParamList> = {
    navigation: StackNavigationProp<RootStackParamList, RouteName>;
};

export interface uploadDataType {
    timeStamp: number,
    amount: number,
    date: number,
    description: string,
    category: string,
    eventMonth: number,
    eventYear: number,
    type : 'income' | 'expense',
    location : string
  } 