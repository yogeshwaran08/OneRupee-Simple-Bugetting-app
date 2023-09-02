import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Profile from '../screens/AddExpense/AddExpense';
import PaymentInterface from '../screens/PaymentInterface';
import Feed from '../screens/Analysis/Analysis';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../constants';
import PaymentDetailCollector from '../screens/PaymentInterface/PaymentDetailCollector';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/ScreenTypes';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/AuthFlow/LoginScreen';
import SignUpScreen from '../screens/AuthFlow/SignUpScreen';
import ResetPassword from '../screens/AuthFlow/ResetPassword';
import LoginSucess from '../screens/AuthFlow/LoginSucess';
import {useAuth} from '../screens/AuthFlow/authContext';

const Tab = createBottomTabNavigator<RootStackParamList>();
const PaymentStack = createStackNavigator<RootStackParamList>();
const SplashScreenStack = createStackNavigator<RootStackParamList>();
const AuthFlowStack = createStackNavigator<RootStackParamList>();

const SplashScreenNavigater = () => (
  <SplashScreenStack.Navigator screenOptions={{headerShown: false}}>
    <SplashScreenStack.Screen name="SplashScreen" component={SplashScreen} />
    <SplashScreenStack.Screen name="AuthFlow" component={AuthFlowNaivgator} />
    <SplashScreenStack.Screen name="Main" component={TabbedNavigator} />
  </SplashScreenStack.Navigator>
);

const AuthFlowNaivgator = () => (
  <AuthFlowStack.Navigator
    initialRouteName="LoginScreen"
    screenOptions={{headerShown: false}}>
    <AuthFlowStack.Screen name="LoginScreen" component={LoginScreen} />
    <AuthFlowStack.Screen name="LoginSucess" component={LoginSucess} />
    <AuthFlowStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <AuthFlowStack.Screen name="ResetPassword" component={ResetPassword} />
    <AuthFlowStack.Screen name="Main" component={TabbedNavigator} />
  </AuthFlowStack.Navigator>
);

const PaymentStackNavigator = () => (
  <PaymentStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName={'PaymentInterface'}>
    <PaymentStack.Screen name="PaymentInterface" component={PaymentInterface} />
    <PaymentStack.Screen
      name="PaymentDetailCollector"
      component={PaymentDetailCollector}
    />
  </PaymentStack.Navigator>
);

const TabbedNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    backBehavior="none"
    screenOptions={{
      tabBarShowLabel: false,
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarActiveTintColor: colors.highlightColor,
      tabBarStyle: {
        backgroundColor: colors.appBackgroundColor,
        height: 60,
      },
    }}>
    <Tab.Screen
      name="Analysis"
      component={Feed}
      options={{
        tabBarIcon: ({color, size}) => (
          <Entypo name="line-graph" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({color, size}) => (
          <AntDesign name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="AddExpense"
      component={Profile}
      options={{
        tabBarIcon: ({color, size}) => (
          <AntDesign name="pluscircleo" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="PaymentInterfacenavigator"
      component={PaymentStackNavigator}
      options={{
        tabBarIcon: ({color, size}) => (
          <FontAwesome6 name="money-bill-transfer" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const user = useAuth();
  return (
    <NavigationContainer>
      <SplashScreenNavigater />
    </NavigationContainer>
  );
};

export default AppNavigator;
