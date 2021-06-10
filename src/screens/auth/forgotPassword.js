import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Splash from '../../assets/svg/paypal.svg';
import COLORS from '../../consts/color';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import styles from './styles/stylesForgotPassword';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState();
  function validateEmail(email) {
    const wrongFormat =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return wrongFormat.test(String(email).toLowerCase());
  }
  const Forgot = email => {
    if (email == null) {
      ToastAndroid.show('Please do not leave it blank!', ToastAndroid.SHORT);
    } else {
      if (!validateEmail(email)) {
        ToastAndroid.show('Wrong email format!', ToastAndroid.SHORT);
      }else{
        auth().sendPasswordResetEmail(email).then(() => console.log('Sending'))
        .catch(err => console.log(err));
        ToastAndroid.show('Hệ thống đã gởi đường dẫn đặt lại mật khẩu, vui lòng kiểm tra email!', ToastAndroid.LONG);
        
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primary}
        translucent={true}
      />

      <SafeAreaView style={styles.headerWrapper}>
        <View style={styles.header}>
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={24} style={styles.iconWhite} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={styles.headerText}>Forgot Password</Text>
          </View>
          <View
            style={{
              width: 20,
            }}
          />
        </View>
        <View style={styles.splash}>
          <Splash width={80} height={80} />
        </View>
      </SafeAreaView>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>Personal Information</Text>
        </View>
        {/* <Dropdown/> */}
        <View>
          <TextInput
            style={styles.input}
            placeholder="Your email"
            placeholderTextColor="#ababab"
            // keyboardType="numeric"
            keyboardType="email-address"
            keyboardAppearance="light"
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.description}>
              If you forgot your password, you can enter your email to confirm{' '}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Forgot(email);
            }}>
            <Icon name="arrow-right" size={25} style={styles.iconButton} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;
