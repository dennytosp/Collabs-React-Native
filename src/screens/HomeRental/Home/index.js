import React from 'react';
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
const {width} = Dimensions.get('screen');
import data from '../../../consts/data';
import styles from './styles';

const HomeRetal = ({navigation}) => {
  const optionsList = [
    {title: 'Buy a Home', img: require('../../../assets/rental/house1.jpg')},
    {title: 'Rent a Home', img: require('../../../assets/rental/house2.jpg')},
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
            {/* House image */}
            <Image source={option.img} style={styles.optionsCardImage} />

            {/* Option title */}
            <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
              {option.title}
            </Text>
          </View>
        ))}
      </View>
    );
  };
  const Card = ({house}) => {
    return (
      <Pressable
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Details', house)}>
        <View style={styles.card}>
          {/* House image */}
          <Image source={house.image} style={styles.cardImage} />
          <View style={{marginTop: 10}}>
            {/* Title and price container */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {house.title}
              </Text>
              <Text
                style={{fontWeight: 'bold', color: COLORS.blue, fontSize: 16}}>
                $1,500
              </Text>
            </View>

            {/* Location text */}

            <Text style={{color: COLORS.grey, fontSize: 14, marginTop: 5}}>
              {house.location}
            </Text>

            {/* Facilities container */}
            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <View style={styles.facility}>
                <Icon name="hotel" size={18} />
                <Text style={styles.facilityText}>2</Text>
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
            source={require('../../../assets/deweei/person.jpg')}
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
            <TextInput placeholder="Search address, city, location" />
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
          renderItem={({item}) => <Card house={item} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeRetal;
