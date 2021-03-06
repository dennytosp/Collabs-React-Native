import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../consts/color.js';
const {width} = Dimensions.get('screen');
import styles from './styles';
import Share from 'react-native-share';

const DetailsScreen = ({navigation, route}) => {
  const data = route.params;

  const myCustomShare = async () => {
    const shareOptions = {
      // subject: 'Category: ' + data.idType.nameCategory,
      message:
      'Product Name: ' + data.name + 
        '\n\nTotal Price: ' +
        data.price +
        '$' +
        '\n\nDescription: ' +
        data.description,
      // urls: [data.imageProd],
    };
    try {
      const ShareReponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareReponse));
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  const InteriorCard = ({interior}) => {
    return <Image source={{uri: data.imageProd}} style={styles.interiorImage} />;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Data image */}

        <View style={styles.backgroundImageContainer}>
          <ImageBackground
            style={styles.backgroundImage}
            source={{uri: data.imageProd}}>
            <View style={styles.header}>
              <View style={styles.headerBtn}>
                <TouchableOpacity>
                  <Icon
                    name="arrow-back-ios"
                    size={20}
                    onPress={navigation.goBack}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.headerBtn}>
                <TouchableOpacity>
                  <Icon name="favorite" size={20} color={COLORS.red} />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>

          {/* Virtual Tag View */}
          <View style={styles.virtualTag}>
            <Text style={{color: COLORS.white}}>Virtual tour</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          {/* Name and rating view container */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{data.name}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.ratingTag}>
                <Text style={{color: COLORS.white}}>{data.star}</Text>
              </View>
              <Text style={{fontSize: 13, marginLeft: 5}}>{data.rating} ratings</Text>
            </View>
          </View>

          {/* Location text */}
          <Text style={{fontSize: 16, color: COLORS.grey}}>
            {data.description}
          </Text>

          {/* Facilities container */}
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View style={styles.facility}>
              <Icon name="hotel" size={18} />
              <Text style={styles.facilityText}>2</Text>
            </View>
            <View style={styles.facility}>
              <Icon name="bathtub" size={18} />
              <Text style={styles.facilityText}>08</Text>
            </View>
            <View style={styles.facility}>
              <Icon name="aspect-ratio" size={18} />
              <Text style={styles.facilityText}>21mm area</Text>
            </View>
          </View>
          <Text style={{marginTop: 20, color: COLORS.grey}}>
            {/* {data.details} */}
            ?????ng c???p ph??i m???nh, b???c ph?? s??? gi???i h???n v???i c??ng ngh??? 5.0 tr?? tu???
            th??ng minh ?????nh v??? h??nh ???nh b?????c ch??n & nh???ng nguy hi???m r??nh r???p
          </Text>

          {/* Interior list */}
          <FlatList
            contentContainerStyle={{marginTop: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, key) => key.toString()}
            data={data.imageProd}
            renderItem={InteriorCard}
            // renderItem={({item}) => <InteriorCard interior={item} />}
          />

          {/* footer container */}
          <View style={styles.footer}>
            <View>
              <Text
                style={{color: COLORS.blue, fontWeight: 'bold', fontSize: 18}}>
                ${data.price}
              </Text>
              <Text
                style={{fontSize: 12, color: COLORS.grey, fontWeight: 'bold'}}>
                Total Price
              </Text>
            </View>
            <View style={styles.shareNowBtn}>
              <TouchableOpacity onPress={() => myCustomShare()}>
                <Text style={{color: COLORS.white}}>Share Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;
