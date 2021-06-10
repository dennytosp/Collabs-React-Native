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
  ScrollView,
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
  
  const usum =
    'data:image/png;base64,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';

  const addProd = (id, name, price, description, star, rating) => {
    return new Promise(function (resolve, reject) {
      let key;
      if (id != null) {
        key = id;
      } else {
        key = database().ref().push().key;
      }

      if (
        name == null ||
        price == null ||
        description == null ||
        star == null ||
        rating == null
      ) {
        ToastAndroid.show('Please do not leave it blank!', ToastAndroid.SHORT);
      } else if (
        name.charAt(0) == ' ' ||
        price.charAt(0) == ' ' ||
        description.charAt(0) == ' ' ||
        star.charAt(0) == ' ' ||
        rating.charAt(0) == ' '
      ) {
        ToastAndroid.show('Can not start with blanks', ToastAndroid.SHORT);
      } else if (name.length < 6) {
        ToastAndroid.show('Product name is too short!', ToastAndroid.SHORT);
      } else if (price.length < 3) {
        ToastAndroid.show(
          'Product price must be more than 100!',
          ToastAndroid.SHORT,
        );
      } else if (description.length < 6) {
        ToastAndroid.show('Description too short!', ToastAndroid.SHORT);
      } else {
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
            <ScrollView showsVerticalScrollIndicator={false}>

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
                uri: imageProd != null ? imageProd : usum,
              }}
              style={{
                width: 120,
                height: 120,
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
            placeholder="Enter product name"
            placeholderTextColor="#ababab"
            onChangeText={text => setName(text)}
            keyboardAppearance="light"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter product price"
            onChangeText={text => setPrice(text)}
            placeholderTextColor="#ababab"
            keyboardType="numeric"
            keyboardAppearance="light"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter product description"
            onChangeText={text => setDescription(text)}
            placeholderTextColor="#ababab"
            keyboardAppearance="light"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter the number of stars of the product"
            placeholderTextColor="#ababab"
            keyboardType="numeric"
            onChangeText={text => setStar(text)}
            keyboardAppearance="light"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter product reviews"
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
            <Icon name="plus" size={25} style={styles.iconButton} />
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

export default Inserprod;
