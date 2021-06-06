import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Splash from '../../assets/svg/icon.svg';
import Dropdown from '../../components/Dropdown';
import COLORS from '../../consts/color';

const Form = ({navigation}) => {
  const [text, onChangeText] = useState('Useless Text');
  const [number, onChangeNumber] = useState(null);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primary}
        translucent={true}
      />

      <SafeAreaView style={styles.headerWrapper}>
        <View style={styles.header}>
          <View>
            <TouchableOpacity>
              <Icon name="chevron-left" size={24} style={styles.iconWhite} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={styles.headerText}>Send Code</Text>
          </View>
          <View
            style={{
              width: 20,
            }}
          />
        </View>
        {/* <View style={styles.splash}>
            
        </View> */}
      </SafeAreaView>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>Personal Information</Text>
        </View>
        {/* <Dropdown/> */}
        <View>
          <TextInput
            style={styles.input}
            placeholder="Your phone numbers"
            placeholderTextColor="#ababab"
            onChangeNumber={onChangeNumber}
            keyboardType="numeric"
            // keyboardAppearance="light"
          />
          <TextInput
            style={styles.input}
            placeholder="Your full name"
            onChangeText={onChangeText}
            placeholderTextColor="#ababab"
            // keyboardType="numeric"
            keyboardAppearance="light"
          />
          <TextInput
            style={styles.input}
            placeholder="Your password"
            onChangeText={onChangeText}
            placeholderTextColor="#ababab"
            secureTextEntry={true}
            // keyboardType="numeric"
            keyboardAppearance="light"
          />
        </View>
        <View>
          <Text style={styles.description}>
            We will send you a verification code to your phone numbers
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Onboard')}>
            <Icon name="arrow-right" size={25} style={styles.iconButton} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    marginTop: 20,
  },
  headerWrapper: {
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: 200,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  iconWhite: {
    color: '#FFF',
  },
  headerText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
  },
  splash: {
    paddingTop: 60,
    paddingBottom: 160,
    alignItems: 'center',
  },
  content: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 20,
    marginTop: -60,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#2d2d2d',
    paddingVertical: 20,
  },
  input: {
    // fontWeight: 'bold',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 2,
    fontSize: 16,
    marginBottom: 20,
    paddingVertical: 20,
  },
  description: {
    color: '#989898',
    textAlign: 'center',
    fontSize: 18,
    padding: 20,
    fontWeight: '400',
  },
  buttonWrapper: {
    alignItems: 'center',
    marginVertical: 30,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4355ee',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  iconButton: {
    color: '#fff',
  },
});
export default Form;
