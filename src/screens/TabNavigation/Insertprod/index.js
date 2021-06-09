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

const Inserprod = ({navigation}) => {
  const [width, setWidth] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [star, setStar] = useState();
  const [rating, setRating] = useState();
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  // set Image
  const [imageProd, setImageProd] = useState();
  const [imageServices, setImageServices] = useState(null);
  const [check, setCheck] = useState(false);
  const idToken = auth().currentUser.uid;

  const addProd = (id, name, price, description, star, rating) => {
    return new Promise(function (resolve, reject) {
      let key;
      if (id != null) {
        key = id;
      } else {
        key = database().ref().push().key;
      }

      if (imageProd != null) {
        addImage(key, name, price, description, star, rating);
      } else {
        database()
          .ref('Product/' + key)
          .update({
            id: key,
            name: name,
            imageProd: '',
            price: price,
            uid: idToken,
            
            description: description,
            star: star,
            rating: rating,
          })
          .then(snapshot => {
            resolve(snapshot);
            ToastAndroid.show('Insert successful!', ToastAndroid.SHORT);
            navigation.navigate('HomeRental');
          })
          .catch(err => {
            reject(err);
          });
      }
    });
  };
  const addImage = async (key, name, price, description, star, rating) => {
    const uri = imageProd;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    // uploads file
    console.log('uri------' + uri);
    console.log('filename------' + filename);
    console.log('opuri--------' + uploadUri);
    const task = storage()
      .ref('Prod/' + filename)
      .putFile(uploadUri);
    setUploading(true);
    setTransferred(0);
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
      .ref('Prod/' + filename)
      .getDownloadURL();
    database()
      .ref('Product/' + key)
      .update({
        id: key,
        name: name,
        imageProd: url,
        price: price,
        uid: idToken,
        description: description,
        star: star,
        rating: rating,
      })
      .then(snapshot => {
        console.log(snapshot);
        ToastAndroid.show('Insert successful', ToastAndroid.SHORT);
        navigation.navigate('HomeRental');
      })
      .catch(err => {
        console.log(err);
      });
  };
  const ImageLibary = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.uri) {
        setImageProd(response.uri);
      }
    });
  };

  // const ImageCammera = () => {
  //   const options = {
  //     noData: true,
  //   };
  //   ImagePicker.launchCamera(options, (response) => {
  //     console.log('Response = ', response);
  //     if (response.uri) {
  //       setImage(response.uri);
  //     }
  //   });
  // };
  // const requestCameraPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //       {
  //         title: 'App Camera Permission',
  //         message: 'App needs access to your camera ',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       ImageCammera();
  //       console.log('Camera permission given');
  //     } else {
  //       console.log('Camera permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

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
            <Text style={styles.headerText}>Insert prod</Text>
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
              source={{
                uri: imageProd,
              }}
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
            placeholder="Your name product"
            placeholderTextColor="#ababab"
            onChangeText={text => setName(text)}
            keyboardAppearance="light"
          />
          <TextInput
            style={styles.input}
            placeholder="Your price product"
            onChangeText={text => setPrice(text)}
            placeholderTextColor="#ababab"
            keyboardType="numeric"
            keyboardAppearance="light"
          />
          <TextInput
            style={styles.input}
            placeholder="Your description"
            onChangeText={text => setDescription(text)}
            placeholderTextColor="#ababab"
            keyboardAppearance="light"
          />
          <TextInput
            style={styles.input}
            placeholder="Your star"
            placeholderTextColor="#ababab"
            keyboardType="numeric"
            onChangeText={text => setStar(text)}
            keyboardAppearance="light"
          />
          <TextInput
            style={styles.input}
            placeholder="Your rating"
            placeholderTextColor="#ababab"
            keyboardType="numeric"
            onChangeText={text => setRating(text)}
            keyboardAppearance="light"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              addProd(null, name, price, description, star, rating);
            }}>
            <Icon name="arrow-right" size={25} style={styles.iconButton} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Inserprod;
