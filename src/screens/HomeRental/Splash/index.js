import React, {useState, useEffect} from 'react';
import {View, Text, StatusBar} from 'react-native';
import COLORS from '../../../consts/color';
import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';

const SplashScreens = ({navigation}) => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <View style={{flex: 1, backgroundColor: COLORS.bonus}}>
        <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.bonus}
        />
      <LottieView
        source={require('../../../assets/lottie/faboom.json')}
        autoPlay
        loop={false}
        speed={1}
        onAnimationFinish={() => {
          user ? navigation.replace('Onboard') : navigation.replace('Login');
        }}
      />
    </View>
  );
};

export default SplashScreens;
