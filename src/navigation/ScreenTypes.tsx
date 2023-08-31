// import {UPIPaymentDataType} from '../PaymentInterface';
import {UPIPaymentDataType} from '../screens/PaymentInterface';

export type RootStackParamList = {
  Home: undefined;
  Analysis: undefined;
  AddExpense: undefined;
  PaymentDetailCollector: UPIPaymentDataType;
  PaymentInterface: undefined;
  SplashScreen: undefined;
  Main: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
  ResetPassword: undefined;

  //navigators
  PaymentInterfacenavigator: undefined;
  SplashScreenNavigater: undefined;
  TabbedNavigator: undefined;
};
