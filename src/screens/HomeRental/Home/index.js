import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../../../consts/color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
const {width} = Dimensions.get('screen');
import database from '@react-native-firebase/database';

import data1 from '../../../consts/data';
import styles from './styles';

const HomeRetal = ({navigation}) => {
  const [avatar, setAvatar] = useState();
  const idToken = auth().currentUser.uid;
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

  const loadAvatar = async () => {
    database()
      .ref('User/' + idToken)
      .on('value', snapshot => {
        setAvatar(snapshot.val().avatar);
      });
  };
  useEffect(() => {
    loadAvatar();
  });

  const [data, setData] = useState([]);
  const loadData = () => {
    database()
      .ref('Product/')
      .orderByChild('id')
      .on('value', snapshot => {
        if (snapshot.val() != null) {
          setData(Object.values(snapshot.val()));
        } else {
          setData(null);
        }
      });
  };
  useEffect(() => {
    loadData();
  }, []);

  const delProd = async id => {
    await database()
      .ref('/Product/' + id)
      .remove();
    ToastAndroid.show('Delete successful', ToastAndroid.SHORT);
  };

  const optionsList = [
    {title: 'Take it home', img: require('../../../assets/shoes/shoes6.jpg')},
    {
      title: 'Take it everywhere',
      img: require('../../../assets/shoes/shoes8.jpg'),
    },
  ];
  const categoryList = ['Popular', 'Recommended', 'Nearest'];

  const ListCategories = () => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    return (
      <View style={styles.categoryListContainer}>
        {categoryList.map((category, index) => (
          <Pressable
            key={index}
            onPress={() => setSelectedCategoryIndex(index)}>
            <Text
              style={[
                styles.categoryListText,
                index == selectedCategoryIndex && styles.activeCategoryListText,
              ]}>
              {category}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  };

  const ListOptions = () => {
    return (
      <View style={styles.optionListsContainer}>
        {optionsList.map((option, index) => (
          <View style={styles.optionsCard} key={index}>
            {/* Shoes image */}
            <Image source={option.img} style={styles.optionsCardImage} />

            {/* Option title */}
            <Text style={{marginTop: 10, fontSize: 17, fontWeight: 'bold'}}>
              {option.title}
            </Text>
          </View>
        ))}
      </View>
    );
  };
  const Card = ({item}) => {
    return (
      <Pressable
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Details', item)}>
        <View style={styles.card}>
          {/* Shoes image */}
          <Image
            source={{
              uri: item.imageProd,
            }}
            style={styles.cardImage}
          />

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Editprod', {
                nameProd: item.name,
                priceProd: item.price,
                descProd: item.description,
                starProd: item.star,
                ratingProd: item.rating,
                imgProd: item.imageProd,
                idProd: item.id,
              })
            }
            activeOpacity={0.8}
            style={styles.btnEditing}>
            <Feather name="edit-2" size={20} color={'#fafafa'} />
          </TouchableOpacity>

          <View style={{marginTop: 10}}>
            {/* Title and price container */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {item.name}
              </Text>
              <Text
                style={{fontWeight: 'bold', color: COLORS.blue, fontSize: 16}}>
                ${item.price}
              </Text>
            </View>

            {/* Location text */}

            <Text style={{color: COLORS.grey, fontSize: 14, marginTop: 5}}>
              {item.description}
            </Text>

            {/* Facilities container */}
            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <View style={styles.facility}>
                <TouchableOpacity style={{}} onPress={() => delProd(item.id)}>
                  <Feather name="delete" size={16} color={'#000'} />
                </TouchableOpacity>
              </View>
              <View style={styles.facility}>
                <Icon name="bathtub" size={18} />
                <Text style={styles.facilityText}>2</Text>
              </View>
              <View style={styles.facility}>
                <Icon name="aspect-ratio" size={18} />
                <Text style={styles.facilityText}>100m</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  // const renderItem = ({item}) => (
  //   <Card item={item}/>
  //   )

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      {/* Customise status bar */}
      <StatusBar
        translucent={false}
        backgroundColor={COLORS.white}
        barStyle="dark-content"
      />
      {/* Header container */}
      <View style={styles.header}>
        <View>
          <Text style={{color: COLORS.grey}}>Location</Text>
          <Text style={{color: COLORS.dark, fontSize: 20, fontWeight: 'bold'}}>
            Vietnam
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Verfile')}>
          <Image
            style={styles.profileImage}
            source={{uri: avatar}}
          />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Input and sort button container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <View style={styles.searchInputContainer}>
            <Icon name="search" color={COLORS.grey} size={25} />
            <TextInput placeholder="Search name, description, price" />
          </View>

          <View style={styles.sortBtn}>
            <Icon name="tune" color={COLORS.white} size={25} />
          </View>
        </View>

        {/* Render list options */}
        <ListOptions />

        {/* Render categories */}
        <ListCategories />

        {/* Render Card */}
        <FlatList
          snapToInterval={width - 20}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
          horizontal
          data={data}
          renderItem={Card}
          keyExtractor={item => item.id}
          // renderItem={({item}) => <Card item={item} />}
        />
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('Insertprod')}
        activeOpacity={0.8}
        style={styles.btnAdding}>
        <Feather name="navigation" size={26} color={'#fff'} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => SignOut()}
        activeOpacity={0.8}
        style={styles.btnLogout}>
        <Feather name="toggle-left" size={16} color={'#fff'} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeRetal;
