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
import Splash from '../../../assets/svg/paypal.svg';
import Dropdown from '../../../components/Dropdown';
import COLORS from '../../../consts/color';
import styles from './stylesing';

const Form = ({navigation}) => {
  const [phonenumbers, setPhonenumbers] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={24} style={styles.iconWhite} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={styles.headerText}>Insert Items</Text>
          </View>
          <View
            style={{
              width: 20,
            }}
          />
        </View>
        <View style={styles.splash}>
          <Splash width={80} height={80} />
        </View>
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
            // onChangeText={text => setPhonenumbers(text)}
            keyboardType="numeric"
            // keyboardAppearance="light"
          />
          <TextInput
            style={styles.input}
            placeholder="Your full name"
            // onChangeText={text => setUsername(text)}
            placeholderTextColor="#ababab"
            keyboardAppearance="light"
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.description}>
              We will send you a verification code to your phone numbers
            </Text>
          </TouchableOpacity>
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

export default Form;
