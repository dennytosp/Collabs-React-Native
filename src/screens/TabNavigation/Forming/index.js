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
import styles from './stylesing';

const Forming = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.primary}
        barStyle="dark-content"
        translucent={true}
      />
      <SafeAreaView style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}></TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={styles.headerText}>Foriming</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Forming;
