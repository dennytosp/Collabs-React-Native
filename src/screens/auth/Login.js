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
import COLORS from '../../consts/color';
import auth from '@react-native-firebase/auth';


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
        {/* <View style={styles.splash}>
            
        </View> */}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    marginTop: 20,
  },
  headerWrapper: {
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: 200,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  iconWhite: {
    color: '#FFF',
  },
  headerText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
  },
  splash: {
    paddingTop: 60,
    paddingBottom: 160,
    alignItems: 'center',
  },
  content: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 20,
    marginTop: -60,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#2d2d2d',
    paddingVertical: 20,
  },
  input: {
    // fontWeight: 'bold',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 2,
    fontSize: 16,
    marginBottom: 20,
    paddingVertical: 20,
  },
  description: {
    color: '#989898',
    textAlign: 'center',
    fontSize: 18,
    padding: 20,
    fontWeight: '400',
  },
  buttonWrapper: {
    alignItems: 'center',
    marginVertical: 30,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4355ee',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  iconButton: {
    color: '#fff',
  },
});
export default Login;
