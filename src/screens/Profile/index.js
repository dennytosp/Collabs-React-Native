import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    marginTop: 20,
  },
  headerWrapper: {
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    backgroundColor: '#5566ee',
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
  iconWhite:{
    color: '#fff',
  },

}); 

const Verification = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#5566ee" barStyle="dark-content" translucent={true} />
      <SafeAreaView style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity 
          onPress={() => navigation.goBack()}
          >
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={styles.headerText}>My Profile</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Verification;
