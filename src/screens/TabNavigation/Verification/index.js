import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import COLORS from '../../../consts/color';
import auth from '@react-native-firebase/auth';
import styles from './stylesing';

const Verification = ({navigation}) => {
  const SignOut = async () => {
    await auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login');
        ToastAndroid.show('User signed out!', ToastAndroid.SHORT);
        auth().currentUser.reload();
        // navigation.refresh();

      });
  };
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.primary}
        barStyle="dark-content"
        translucent={true}
      />
      <SafeAreaView style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => SignOut()}>
            <Icon name="chevron-left" size={24} style={styles.iconWhite} />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={styles.headerText}>Verification Code</Text>
          </View>
          <View style={{width: 10}}></View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Verification;
