// In App.js in a new project

import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VerificationScreen from './TabNavigation/Verification';
import ProfileScreen from './TabNavigation/Profile';
import NavigationScreens from '../navigations';
import DetailsScreen from './HomeRental/Details';
import HomeScreen from './HomeRental/Home';
import OnboardScreen from './HomeRental/Onboard';
import SplashScreen from './HomeRental/Splash';
import VerfileScreen from './HomeRental/Verfile';
import LoginScreen from './auth/Login';
import RegisterScreen from './auth/Register';
import ForgotPasswordScreen from './auth/forgotPassword';
import InsertProdScreen from './TabNavigation/Insertprod';
import EditProdScreen from './TabNavigation/Editprod';
import OnboardingScreen from './HomeRental/Onboarding';

const Stack = createStackNavigator();

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;
  useEffect(() => {
    AsyncStorage.getItem('Onboardingfirst').then(value => {
      if (value == null) {
        AsyncStorage.setItem('Onboardingfirst', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch == true) {
    routeName = 'Onboarding';
  } else {
    routeName = 'Splash';
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={routeName} headerMode="none">
        {/* Auth */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />

        {/* Navigation */}
        <Stack.Screen name="Navigation" component={NavigationScreens} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="Insertprod" component={InsertProdScreen} />
        <Stack.Screen name="Editprod" component={EditProdScreen} />

        {/* Rental */}
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Onboard" component={OnboardScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="HomeRental" component={HomeScreen} />

        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Verfile" component={VerfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
