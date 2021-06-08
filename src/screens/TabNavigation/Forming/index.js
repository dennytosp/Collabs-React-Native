import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Pressable,
  ToastAndroid,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Splash from '../../../assets/svg/paypal.svg';
import COLORS from '../../../consts/color';
import styles from './stylesing';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'react-native-image-picker';

const Profile = ({navigation}) => {
  const [phonenumbers, setPhonenumbers] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [fullname, setFullname] = useState();
  const [avatar, setAvatar] = useState();
  const [imageServices, setImageServices] = useState(null);
  const [check, setCheck] = useState(false);
  const idToken = auth().currentUser.uid;

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
            <Text style={styles.headerText}>Items</Text>
          </View>
          <View
            style={{
              width: 20,
            }}
          />
        </View>
        <View style={styles.splash}>
          <Pressable onPress={() => ImageLibary()}>
            <Image
              // source={require('../../../assets/deweei/person.jpg')}
              // source={{
              //   uri: check ? imageServices : avatar,
              // }}
              style={{
                width: 120,
                height: 120,
                backgroundColor: '#090919',
                borderRadius: 20,
              }}
            />
          </Pressable>
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
            keyboardType="numeric"
            keyboardAppearance="light"
          />
          <TextInput
            style={styles.input}
            placeholder="Your username"
            // value={username}
            // onChangeText={text => setUsername(text)}
            placeholderTextColor="#ababab"
            keyboardAppearance="light"
          />
          <TextInput
            style={styles.input}
            placeholder="Your email"
            placeholderTextColor="#ababab"
            keyboardAppearance="light"
          />
          <TextInput
            style={styles.input}
            placeholder="Your full name"
            placeholderTextColor="#ababab"
            keyboardAppearance="light"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Onboard')
            }}>
            <Icon name="arrow-right" size={25} style={styles.iconButton} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;
