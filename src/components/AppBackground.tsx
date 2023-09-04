import {View, Text, ViewStyle} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import BlurView from '@react-native-community/blur';

interface AppBackgroundInterface {
  children: JSX.Element;
  style?: ViewStyle;
}

const AppBackground: React.FC<AppBackgroundInterface> = ({children, style}) => {
  return (
    <LinearGradient
      colors={[
        'rgba(222, 29, 93,0.4)',
        'rgba(163, 212, 30,0.3)',
        'rgba(222, 29, 196, 0.4)',
      ]}
      locations={[0.1, 0.7, 1]}
      start={{x: 0, y: 1}}
      end={{x: 0.8, y: 0}}
      style={style}>
      {children}
    </LinearGradient>
  );
};

export default AppBackground;
