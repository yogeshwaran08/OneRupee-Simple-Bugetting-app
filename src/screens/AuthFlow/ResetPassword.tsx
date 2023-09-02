import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Pressable,
  Keyboard,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {ScreenProps} from '../../types/types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {resetPassword} from './auth';
import {backgroundColor} from '../../constants';
import CustomButton from '../../components/CustomButton';

type ResetPasswordProps = ScreenProps<'ResetPassword'>;

const ResetPassword: React.FC<ResetPasswordProps> = ({navigation}) => {
  const [email, setEmail] = useState<string>();
  const [btnText, setBtnText] = useState('Reset Password');
  const [emailState, setEmailState] = useState(true);

  const handleResetBtn = () => {
    if (emailState === true && email) {
      setEmailState(false);
      setBtnText('OTP sent');
      resetPassword(email);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        <Text style={styles.text}>Reset password</Text>
        <View style={styles.dataContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
            editable={emailState}
            placeholderTextColor={'gray'}
          />
        </View>

        <View>
          {/* <Pressable style={styles.btnStyles} onPress={handleResetBtn}>
            <Text style={styles.btnTextStyle}>{btnText}</Text>
          </Pressable> */}
          <CustomButton text={btnText} onPress={handleResetBtn} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 40,
  },
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroundColor,
  },
  textInput: {
    borderWidth: 2,
    width: 300,
    height: 50,
    marginBottom: 10,
    borderRadius: 10,
    paddingLeft: 10,
  },
  dataContainer: {
    paddingVertical: 30,
  },
  btnStyles: {
    height: 50,
    width: 300,
    borderRadius: 30,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  btnTextStyle: {
    color: 'white',
    fontSize: 20,
  },
  newAcc: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  oauthContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 300,
    paddingTop: 30,
  },
});
