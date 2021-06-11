import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import COLORS from '../../../consts/color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
const {width} = Dimensions.get('screen');
import database from '@react-native-firebase/database';
import styles from './styles';

const HomeRetal = ({navigation}) => {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [fullName, setFullname] = useState();
  const [avatar, setAvatar] = useState();
  const [uiDing, setUiding] = useState();
  const idToken = auth().currentUser.uid;
  const usum =
    'https://f37-zpg.zdn.vn/2042059238978378618/80a3438125ded18088cf.jpg';

  const loadInformation = async () => {
    database()
      .ref('User/' + idToken)
      .on('value', snapshot => {
        setAvatar(snapshot.val().avatar);
        setUiding(snapshot.val().uid);
        setEmail(snapshot.val().email);
        setUsername(snapshot.val().username);
        setFullname(snapshot.val().fullname);
      });
  };
  // useEffect(() => {
  //   loadInformation();
  // }, [loadInformation]);

  useEffect(() => {
    let isCancelled = false;
    const runAsync = async () => {
      try {
        if (!isCancelled) {
          loadInformation()
        }
      } catch (e) {
        if (!isCancelled) {
          throw e;
        }
      }
    };

    runAsync();

    return () => {
      isCancelled = true;
    };
  }, [loadInformation]);

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

  // useEffect(() => {
  //   loadData();
  // }, []);

  useEffect(() => {
    let isCancelled = false;
    const runAsync = async () => {
      try {
        if (!isCancelled) {
          loadData()
        }
      } catch (e) {
        if (!isCancelled) {
          throw e;
        }
      }
    };

    runAsync();

    return () => {
      isCancelled = true;
    };
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
          {email == 'denny.tosp@gmail.com' || email == 'deweei@gmail.com' ? (
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
          ) : null}
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
              {email == 'denny.tosp@gmail.com' ||
              email == 'deweei@gmail.com' ? (
                <View style={styles.facility}>
                  <TouchableOpacity style={{}} onPress={() => delProd(item.id)}>
                    <Feather name="delete" size={16} color={'#000'} />
                  </TouchableOpacity>
                </View>
              ) : null}
              <View style={styles.facility}>
                <Icon name="bathtub" size={18} />
                <Text style={styles.facilityText}>8</Text>
              </View>
              <View style={styles.facility}>
                <Icon name="aspect-ratio" size={18} />
                <Text style={styles.facilityText}>21s</Text>
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
          <Text style={{color: COLORS.grey}}>@{username}</Text>
          <Text style={{color: COLORS.dark, fontSize: 20, fontWeight: 'bold'}}>
            {fullName}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            style={styles.profileImage}
            source={{uri: avatar != null ? avatar : usum}}
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
      {email == 'denny.tosp@gmail.com' || email == 'deweei@gmail.com' ? (
        <TouchableOpacity
          onPress={() => navigation.navigate('Insertprod')}
          activeOpacity={0.8}
          style={styles.btnAdding}>
          <Feather name="navigation" size={26} color={'#fff'} />
        </TouchableOpacity>
      ) : null}
      {/* <TouchableOpacity
        onPress={() => SignOut()}
        activeOpacity={0.8}
        style={styles.btnLogout}>
        <Feather name="toggle-left" size={16} color={'#fff'} />
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default HomeRetal;
