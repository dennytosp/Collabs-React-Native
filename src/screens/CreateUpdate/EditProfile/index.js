import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Pressable,
  ToastAndroid,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
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
  const usum = 'https://f37-zpg.zdn.vn/2042059238978378618/80a3438125ded18088cf.jpg'

  useEffect(() => {
    database()
      .ref('/User/' + idToken)
      .on('value', snapshot => {
        if (snapshot.val() != null) {
          setUsername(snapshot.val().username);
          setEmail(snapshot.val().email);
          setPhonenumbers(snapshot.val().phonenumbers);
          setFullname(snapshot.val().fullname);
          setAvatar(snapshot.val().avatar);
        }
      });
  }, [idToken]);

  const ImageLibary = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response) {
        // console.log('asset >>>>>>>>>>>>>>>>>>>>',response.assets[0].uri)
        setCheck(true);
        setImageServices(response.uri);
        
      }
      if(response.didCancel){
        setCheck(false);
      }
    });
  };

  const edit = (phonenumbers, username, email, fullname) => {
    return new Promise(function (resolve, reject) {
      if (imageServices != null) {
        insert(phonenumbers, username, email, fullname);
      } else {
        database()
          .ref('User/' + idToken)
          .update({
            uid: idToken,
            avatar: avatar,
            phonenumbers: phonenumbers,
            username: username,
            email: email,
            fullname: fullname,
          })
          .then(snapshot => {
            resolve(snapshot);
            ToastAndroid.show('Successful!', ToastAndroid.SHORT);
            navigation.goBack();
          })
          .catch(err => {
            reject(err);
          });
      }
    });
  };

  const insert = async (phonenumbers, username, email, fullname) => {
    const uri = imageServices;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    // uploads file
    console.log('uri------' + uri);
    console.log('filename------' + filename);
    console.log('opuri--------' + uploadUri);
    const task = storage()
      .ref('UserAvatar/' + filename)
      .putFile(uploadUri);
    // setUploading(true);
    // setTransferred(0);
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;
    } catch (e) {
      console.error(e);
    }

    const url = await storage()
      .ref('UserAvatar/' + filename)
      .getDownloadURL();
    if (url != null) {
      console.log('>>>>>>>>>>>>>>>>>>>>> url != null >>>>>>>>>>>>>>>>>>>>>');
      database()
        .ref('User/' + idToken)
        .update({
          uid: idToken,
          avatar: url,
          phonenumbers: phonenumbers,
          username: username,
          email: email,
          fullname: fullname,
        })
        .then(snapshot => {
          console.log(snapshot);
          ToastAndroid.show('Successful!', ToastAndroid.SHORT);
          navigation.goBack();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      database()
        .ref('User/' + idToken)
        .update({
          uid: idToken,
          // avatar: url,
          phonenumbers: phonenumbers,
          username: username,
          email: email,
          fullname: fullname,
        })
        .then(snapshot => {
          console.log(snapshot);
          ToastAndroid.show('Successful!', ToastAndroid.SHORT);
          navigation.goBack();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

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
            <Text style={styles.headerText}>My Profile</Text>
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
              source={{
                uri: check ? imageServices : avatar,
              }}
              style={{
                width: 80,
                height: 80,
                backgroundColor: '#fff',
                borderRadius: 100,
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
            placeholder="Your email"
            value={email}
            editable={false}
            onChangeText={text => setEmail(text)}
            placeholderTextColor="#ababab"
            keyboardType="email-address"
            keyboardAppearance="light"
          />
          <TextInput
            style={styles.input}
            placeholder="Your phone numbers"
            placeholderTextColor="#ababab"
            value={phonenumbers}
            onChangeText={text => setPhonenumbers(text)}
            keyboardType="numeric"
            // keyboardAppearance="light"
          />
          <TextInput
            style={styles.input}
            placeholder="Your username"
            value={username}
            onChangeText={text => setUsername(text)}
            placeholderTextColor="#ababab"
            keyboardAppearance="light"
          />
          <TextInput
            style={styles.input}
            placeholder="Your full name"
            value={fullname}
            onChangeText={text => setFullname(text)}
            placeholderTextColor="#ababab"
            keyboardAppearance="light"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              edit(phonenumbers, username, email, fullname);
            }}>
            <Icon name="arrow-right" size={25} style={styles.iconButton} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;
