import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Form from '../screens/Forming';
import Verification from '../screens/Verification';
import Profile from '../screens/Profile';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Form"
      tabBarOptions={{
        activeTintColor: '#5566ee',
        style: {
          elevation: 0,
          // paddingVertical: 5,
          backgroundColor: "#fff",
          borderTopWidth: 0,
        },
        labelStyle: {
          fontSize: 10,
          margin: 0,
          padding: 0,
        }

        // showLabel: false,
      }}>
      <Tab.Screen
        name="Form"
        component={Form}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Verification"
        component={Verification}
        options={{
          tabBarLabel: 'Verification',
          tabBarIcon: ({color, size}) => (
            <Icon name="message-circle" color={color} size={size} />
          ),
          // tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon name="moon" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default MyTabs;
