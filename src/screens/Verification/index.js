import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 20,
  },

}); 

const Verification = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" translucent={true} />
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity 
          onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-left" size={24}/>
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={styles.headerText}>Verification Code</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Verification;
