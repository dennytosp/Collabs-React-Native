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
  ProgressBarAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Splash from '../../../assets/svg/paypal.svg';
import COLORS from '../../../consts/color';
import styles from './stylesing';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'react-native-image-picker';

const EditProd = ({navigation, route}) => {
  const {nameProd, priceProd, descProd, starProd, ratingProd, imgProd, idProd} =
    route.params;

  const [imageProd, setImageProd] = useState(imgProd);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  // set Image
  const [imageServices, setImageServices] = useState(null);
  const [check, setCheck] = useState(false);
  const idToken = auth().currentUser.uid;
  
  // change text update
  const [nameEdit, setNameEdit] = useState(nameProd);
  const [priceEdit, setPriceEdit] = useState(priceProd);
  const [descEdit, setDescEdit] = useState(descProd);
  const [starEdit, setStarEdit] = useState(starProd);
  const [rateEdit, setRateEdit] = useState(ratingProd);

  const editProd = (id, name, price, description, star, rating) => {
    return new Promise(function (resolve, reject) {
      if (
        nameEdit == null ||
        priceEdit == null ||
        descEdit == null ||
        starEdit == null ||
        rateEdit == null
      ) {
        ToastAndroid.show('Please do not leave it blank!', ToastAndroid.SHORT);
      } else if (
        nameEdit.charAt(0) == ' ' ||
        priceEdit.charAt(0) == ' ' ||
        descEdit.charAt(0) == ' ' ||
        starEdit.charAt(0) == ' ' ||
        rateEdit.charAt(0) == ' '
      ) {
        ToastAndroid.show('Can not start with blanks', ToastAndroid.SHORT);
      } else if (nameEdit.length < 6) {
        ToastAndroid.show('Product name is too short!', ToastAndroid.SHORT);
      } else if (priceEdit.length < 3) {
        ToastAndroid.show(
          'Product price must be more than 100!',
          ToastAndroid.SHORT,
        );
      } else if (descEdit.length < 6) {
        ToastAndroid.show('Description too short!', ToastAndroid.SHORT);
      } else {
        if (imageServices != null) {
          addProd(id, name, price, description, star, rating);
        } else {
          database()
            .ref('Product/' + id)
            .update({
              name: name,
              imageProd: imageProd,
              price: price,
              uid: idToken,
              description: description,
              star: star,
              rating: rating,
            })
            .then(snapshot => {
              resolve(snapshot);
              ToastAndroid.show('Edit product successful', ToastAndroid.SHORT);
              navigation.navigate('HomeRental');
            })
            .catch(err => {
              reject(err);
            });
        }
      }
    });
  };

  const addProd = async (key, name, price, description, star, rating) => {
    const uri = imageServices;
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
    if (url != null) {
      database()
        .ref('Product/' + key)
        .update({
          id: key,
          name: name,
          imageProd: url,
          price: price,
          description: description,
          uid: idToken,
          star: star,
          rating: rating,
        })
        .then(snapshot => {
          console.log(snapshot);
          ToastAndroid.show('Edit product successful', ToastAndroid.SHORT);
          navigation.navigate('HomeRental');
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      database()
        .ref('Product/' + key)
        .update({
          id: key,
          name: name,
          price: price,
          description: description,
          uid: idToken,
          star: star,
          rating: rating,
        })
        .then(snapshot => {
          console.log(snapshot);
          ToastAndroid.show('Edit product successful', ToastAndroid.SHORT);
          navigation.navigate('HomeRental');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  const ImageLibary = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.uri) {
        setCheck(true);
        setImageServices(response.uri);
      }
      if (response.didCancel) {
        setCheck(false);
      }
    });
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
            <Text style={styles.headerText}>Edit Prod</Text>
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
                uri: check ? imageServices : imageProd,
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
            placeholder="Enter product name"
            placeholderTextColor="#ababab"
            value={nameEdit}
            onChangeText={text => setNameEdit(text)}
            keyboardAppearance="light"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter product price"
            value={priceEdit}
            onChangeText={text => setPriceEdit(text)}
            placeholderTextColor="#ababab"
            keyboardType="numeric"
            keyboardAppearance="light"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter product description"
            value={descEdit}
            onChangeText={text => setDescEdit(text)}
            placeholderTextColor="#ababab"
            keyboardAppearance="light"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter the number of stars of the product"
            placeholderTextColor="#ababab"
            value={starEdit}
            keyboardType="numeric"
            onChangeText={text => setStarEdit(text)}
            keyboardAppearance="light"
          />
          <TextInput
            style={styles.input}
            value={rateEdit}
            placeholder="Enter product reviews"
            placeholderTextColor="#ababab"
            keyboardType="numeric"
            onChangeText={text => setRateEdit(text)}
            keyboardAppearance="light"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              editProd(idProd, nameEdit, priceEdit, descEdit, starEdit, rateEdit);
            }}>
            <Icon name="arrow-right" size={25} style={styles.iconButton} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EditProd;
