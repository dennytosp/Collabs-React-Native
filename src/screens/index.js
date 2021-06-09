// In App.js in a new project

import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
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
import InsertProdScreen from './TabNavigation/Insertprod';
import EditProdScreen from './TabNavigation/Editprod';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" headerMode="none">
        {/* Auth */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/* Navigation */}
        <Stack.Screen name="Navigation" component={NavigationScreens} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="Insertprod" component={InsertProdScreen} />
        <Stack.Screen name="Editprod" component={EditProdScreen} />

        {/* Rental */}
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
