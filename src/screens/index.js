// In App.js in a new project

import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import FormScreen from './TabNavigation/Forming';
import VerificationScreen from './TabNavigation/Verification';
import ProfileScreen from './TabNavigation/Profile';
import NavigationScreens from '../navigations';
import DetailsScreen from './HomeRental/Details';
import HomeScreen from './HomeRental/Home';
import OnboardScreen from './HomeRental/Onboard';
import LoginScreen from './auth/Login';
import RegisterScreen from './auth/Register';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register" headerMode="none">
        {/* Auth */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/* Navigation */}
        <Stack.Screen name="Navigation" component={NavigationScreens} />
        <Stack.Screen name="Form" component={FormScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        {/* Rental */}
        <Stack.Screen name="Onboard" component={OnboardScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="HomeRetal" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
