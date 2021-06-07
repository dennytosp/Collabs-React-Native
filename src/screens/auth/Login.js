import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Splash from '../../assets/svg/paypal.svg';
import COLORS from '../../consts/color';
import auth from '@react-native-firebase/auth';
import styles from './styles/stylesLogin';

const Login = ({navigation}) => {
  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  function validateEmail(email) {
    const wrongFormat =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return wrongFormat.test(String(email).toLowerCase());
  }
  const SignIn = (email, password) => {
    if (email == null || password == null) {
      ToastAndroid.show('Please do not leave it blank!', ToastAndroid.SHORT);
    } else {
      if (!validateEmail(email)) {
        ToastAndroid.show('Wrong email format!!', ToastAndroid.SHORT);
      } else if (password.length < 6) {
        ToastAndroid.show('Password is too short!', ToastAndroid.SHORT);
      } else {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(snapshot => {
            console.log(snapshot);
            ToastAndroid.show('Sign in successful!', ToastAndroid.SHORT);
            navigation.navigate('Navigation');
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              ToastAndroid.show(
                'That email address is already in use!',
                ToastAndroid.SHORT,
              );
            }

            if (error.code === 'auth/invalid-email') {
              ToastAndroid.show(
                'That email address is invalid!',
                ToastAndroid.SHORT,
              );
            }

            console.error(error);
          });
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
            <TouchableOpacity onPress={() => BackHandler.exitApp()}>
              <Icon name="chevron-left" size={24} style={styles.iconWhite} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={styles.headerText}>Login</Text>
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
            onChangeText={text => setEmail(text)}
            keyboardAppearance="light"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Your password"
            onChangeText={text => setPassword(text)}
            placeholderTextColor="#ababab"
            secureTextEntry={true}
            // keyboardType="numeric"
            keyboardAppearance="light"
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.description}>
              If you don't have an account, please register here to use our
              service
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              SignIn(email, password);
            }}>
            <Icon name="arrow-right" size={25} style={styles.iconButton} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
