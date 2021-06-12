import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  BackHandler,
  ToastAndroid,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Splash from '../../assets/svg/paypal.svg';
import COLORS from '../../consts/color';
import auth from '@react-native-firebase/auth';
import styles from './styles/stylesLogin';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import database from '@react-native-firebase/database';

const Login = ({navigation}) => {
  // useEffect(() => {
  // }, [navigation.refresh()]);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '146149352813-gm1fc62sej1u76jf2fcnjqnod6pmjmgk.apps.googleusercontent.com',
    });
  });

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
    } else if (!validateEmail(email)) {
      ToastAndroid.show('Wrong email format!!', ToastAndroid.SHORT);
    } else if (password.length < 6) {
      ToastAndroid.show('Password is too short!', ToastAndroid.SHORT);
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(snapshot => {
          console.log(snapshot);
          ToastAndroid.show('Logged in successfully!', ToastAndroid.SHORT);
          navigation.navigate('Onboard');
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
  };

  const fbLogin = async () => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken

      const tokenObj = await AccessToken.getCurrentAccessToken();
      if (!tokenObj) {
        throw 'Something went wrong obtaining access token';
      }
      //
      const infoResponseCallback = async (error, success) => {
        if (error) {
          console.log('eeeeeeeeeee', error);
        } else {
          const facebookCredential = auth.FacebookAuthProvider.credential(
            tokenObj.accessToken,
          );
          if (tokenObj.uid) {
            await auth()
              .signInWithCredential(facebookCredential)
              .then(console.log('Successful facebook login!'));
            navigation.navigate('Onboard');
          } else {
            await auth()
              .signInWithCredential(facebookCredential)
              .then(() => {
                console.log(auth().currentUser);
                database()
                  .ref('/User/' + auth().currentUser.uid)
                  .update({
                    uid: auth().currentUser.uid,
                    fullname: auth().currentUser.displayName,
                    avatar: success.picture.data.url,
                    email: auth().currentUser.email,
                  })
                  .then(console.log('Successful facebook login!'));
                navigation.navigate('Onboard');
              });
          }
        }
      };
      const infoRequest = new GraphRequest(
        '/me',
        {
          accessToken: tokenObj.accessToken,
          parameters: {
            fields: {
              string:
                'email,name,first_name,middle_name,last_name,gender,address,picture.type(large)',
            },
          },
        },
        infoResponseCallback,
      );
      new GraphRequestManager().addRequest(infoRequest).start();
    } catch (err) {
      console.log('error', err);
    }
  };

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: false});

      // Get the users ID token
      const data = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken,
      );

      if (googleCredential.uid) {
        await auth()
          .signInWithCredential(googleCredential)
          .then(console.log('Successful google login!'));
        navigation.navigate('Onboard');
      }
      // Sign-in the user with the credential
      else {
        await auth()
          .signInWithCredential(googleCredential)
          .then(() => {
            database()
              .ref('/User/' + auth().currentUser.uid)
              .update({
                uid: auth().currentUser.uid,
                fullname: auth().currentUser.displayName,
                avatar: auth().currentUser.photoURL,
                email: auth().currentUser.email,
              })
              .then(console.log('Successful google login!'));
            navigation.navigate('Onboard');
          })

          .catch(error => {
            console.log('Something went wrong with sign up: ', error);
          });
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.error(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.error(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.error(error);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
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
            <Icon name="navigation" size={25} style={styles.iconButton} />
          </TouchableOpacity>
        </View>

        <View style={styles.viewRowSocial}>
          <View style={styles.viewCardSocial}>
            <Pressable onPress={() => googleLogin()} style={styles.btnGoogle}>
              <Image
                source={require('../../assets/icon/ic_google.png')}
                resizeMode="contain"
                style={{height: 22, width: 22}}
              />
            </Pressable>

            <Pressable
              style={styles.btnFacebook}
              onPress={() => {
                fbLogin();
              }}>
              <Image
                source={require('../../assets/icon/ic_facebook.png')}
                resizeMode="contain"
                style={{height: 22, width: 22}}
              />
            </Pressable>

            <View style={styles.btnTwitter}>
              <Image
                source={require('../../assets/icon/ic_twiter.png')}
                resizeMode="contain"
                style={{height: 22, width: 22}}
              />
            </View>
          </View>
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

export default Login;
