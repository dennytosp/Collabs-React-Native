import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS from '../../../consts/color';
import Icon from 'react-native-vector-icons/Feather';
import styles from './styles';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const Verfile = ({navigation, item}) => {
  const [phonenumbers, setPhonenumbers] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [fullname, setFullname] = useState();
  const [avatar, setAvatar] = useState();
  const idToken = auth().currentUser.uid;

  const profile = async () => {
    database()
      .ref('User/' + idToken)
      .on('value', snapshot => {
        setAvatar(snapshot.val().avatar);
        setPhonenumbers(snapshot.val().phonenumbers);
        setUsername(snapshot.val().username);
        setEmail(snapshot.val().email);
        setFullname(snapshot.val().fullname);
      });
  };
  useEffect(() => {
    profile();
  }),
    [profile];

  function firstChar(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // const usum = 'https://f37-zpg.zdn.vn/1288233568244316295/749b877574298077d938.jpg'
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
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        translucent={true}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={24} color="#52575d" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="more-vertical" size={24} color="#52575d" />
          </TouchableOpacity>
        </View>

        <View style={{alignSelf: 'center'}}>
          <View style={styles.profileImage}>
            <Image
              // source={{uri: avatar != null ? avatar : usum}}
              source={{uri: avatar}}
              style={styles.image}
              resizeMode="center"
            />
          </View>
          <View style={styles.dm}>
            <TouchableOpacity onPress={() => SignOut()}>
              <Icon name="toggle-left" size={18} color="#DFD8C8" />
            </TouchableOpacity>
          </View>
          <View style={styles.active}></View>
          <View style={styles.add}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Icon
                name="edit-2"
                size={32}
                color="#DFD8C8"
                style={{marginTop: 6, marginLeft: 2}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <Text style={[styles.text, {fontWeight: '200', fontSize: 30}]}>
            {/* {jsUcfirst(username)} */}@{username}
          </Text>
          <Text style={[styles.text, {color: '#AEB5BC', fontSize: 16}]}>
            {fullname}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={styles.statusBox}>
            <Text style={[styles.text, {fontSize: 24}]}>195</Text>
            <Text style={[styles.text, styles.subText]}>Posts</Text>
          </View>
          <View
            style={[
              styles.statusBox,
              {borderColor: '#DFD8C8', borderLeftWidth: 1, borderRightWidth: 1},
            ]}>
            <Text style={[styles.text, {fontSize: 24}]}>1M</Text>
            <Text style={[styles.text, styles.subText]}>Followers</Text>
          </View>
          <View style={styles.statusBox}>
            <Text style={[styles.text, {fontSize: 24}]}>25</Text>
            <Text style={[styles.text, styles.subText]}>Following</Text>
          </View>
        </View>

        <View style={{marginTop: 32}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.mediaImageContainer}>
              <Image
                source={require('../../../assets/rental/house1.jpg')}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.mediaImageContainer}>
              <Image
                source={require('../../../assets/rental/house2.jpg')}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.mediaImageContainer}>
              <Image
                source={require('../../../assets/rental/house4.jpg')}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          </ScrollView>

          <View style={styles.mediaCount}>
            <Text
              style={[
                styles.text,
                {fontSize: 24, color: '#DFD8C8', fontWeight: '300'},
              ]}>
              03
            </Text>
            <Text
              style={[
                styles.text,
                {fontSize: 12, color: '#DFD8C8', textTransform: 'uppercase'},
              ]}>
              Media
            </Text>
          </View>
        </View>

        <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>

        <View style={{alignItems: 'center'}}>
          <View style={styles.recentItem}>
            <View style={styles.recentItemIndicator}></View>
            <View style={{width: 250}}>
              <Text
                style={[styles.text, {color: '#41444B', fontWeight: '300'}]}>
                Email: {email}
              </Text>
            </View>
          </View>

          <View style={styles.recentItem}>
            <View style={styles.recentItemIndicator}></View>
            <View style={{width: 250}}>
              <Text
                style={[styles.text, {color: '#41444B', fontWeight: '300'}]}>
                Phone: {phonenumbers}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Verfile;
