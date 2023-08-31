import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState, useRef} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {backgroundColor, globalStyles, themeColor} from '../../constants';
import {RNCamera} from 'react-native-camera';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/ScreenTypes';

// iconname - for which
// flash-off - flash off
// flashlight - tourch
// flash - flash ligh on
// flash-auto - auto
// restore - rescan
// upi://pay?pa=yogeshwaran08083@okaxis&pn=Yogeshwaran&aid=uGICAgIC_3MbgTQ

type PaymentScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'PaymentInterface'>;
};

export type UPIPaymentDataType = {
  pa: string | null;
  pn: string | null;
};

const PaymentInterface: React.FC<PaymentScreenProps> = ({navigation}) => {
  const [upiData, setUpiData] = useState<UPIPaymentDataType>({
    pa: null,
    pn: null,
  });
  const [flashModeIndex, setFlashModeIndex] = useState<number>(1);
  const [iconProperty, setIconProperty] = useState(['flash-auto', 'Auto']);
  const [errorText, setErrorText] = useState('');

  const flashModes = [
    RNCamera.Constants.FlashMode.off,
    RNCamera.Constants.FlashMode.auto,
    RNCamera.Constants.FlashMode.torch,
  ];

  const flashIcons = ['flash-off', 'flash-auto', 'flashlight'];
  const flashText = ['Off', 'Auto', 'On'];

  const parseQueryString = (queryString: string) => {
    const params: Record<string, string> = {};
    const queryStartIndex = queryString.indexOf('?');
    const queryParams =
      queryStartIndex !== -1 ? queryString.slice(queryStartIndex) : '';

    if (queryParams) {
      queryParams
        .slice(1) // Remove the leading '?'
        .split('&') // Split into key-value pairs
        .forEach((pair: string) => {
          const [key, value] = pair.split('=');
          params[key] = decodeURIComponent(value);
        });
    }

    return params;
  };

  const isValidUpiUrl = (url: string) => {
    const upiUrlPattern = /^upi:\/\/pay\?.+/i;
    return upiUrlPattern.test(url);
  };

  const handleFlash = () => {
    const index = (flashModeIndex + 1) % 3;
    setFlashModeIndex(index);
    setIconProperty([flashIcons[index], flashText[index]]);
  };

  const handleScan = (event: any) => {
    if (event.data) {
      console.log(isValidUpiUrl(event.data));
      if (isValidUpiUrl(event.data)) {
        const urlData = parseQueryString(event.data);
        const data: UPIPaymentDataType = {pa: urlData.pa, pn: urlData.pn};
        navigation.navigate('PaymentDetailCollector', data);
      } else {
        setErrorText('Not Valid. Please try again');
      }
    }
  };

  const flashMode = flashModes[flashModeIndex];
  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <Text style={globalStyles.pageHeaderText}>Scan to pay</Text>
      </View>
      <View style={styles.actionBar}>
        <Pressable onPress={handleFlash} style={styles.pressableStyle}>
          <MaterialCommunityIcons
            name={iconProperty[0]}
            color={themeColor}
            size={30}
          />
          <Text style={styles.iconText}>{iconProperty[1]}</Text>
        </Pressable>
      </View>
      <QRCodeScanner
        onRead={handleScan}
        showMarker={true}
        markerStyle={{borderColor: '#FFF', borderRadius: 10}}
        cameraStyle={styles.cameraStyle}
        flashMode={flashMode}
        reactivate={true}
        cameraContainerStyle={styles.cameraContainer}
        // containerStyle={styles.containerStyle}
      />
      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

export default PaymentInterface;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: backgroundColor,
    alignItems: 'center',
  },
  headerStyle: {
    paddingTop: 30,
    paddingBottom: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBar: {
    paddingTop: 10,
    display: 'flex',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraStyle: {
    height: 400,
    width: 300,
    padding: 0,
    margin: 0,
  },
  cameraContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  pressableStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: 'white',
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
