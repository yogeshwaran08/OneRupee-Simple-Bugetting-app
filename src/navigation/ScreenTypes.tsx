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
  LoginSucess: undefined;
  AuthFlow: undefined;
  SplashScreenNaivgator: undefined;

  //navigators
  PaymentInterfacenavigator: undefined;
  SplashScreenNavigater: undefined;
  TabbedNavigator: undefined;
};
