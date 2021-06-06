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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    marginTop: 20,
  },
  headerWrapper: {
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    backgroundColor: COLORS.primary,
    height: 75,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 5,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
  },
  iconWhite: {
    color: '#fff',
  },
});

const Verification = ({navigation}) => {
  const SignOut = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login');
        ToastAndroid.show('User signed out!', ToastAndroid.SHORT);
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
          <View
          style={{width: 10,}}
          >

          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Verification;
