import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
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

const DetailsScreen = ({navigation, route}) => {
  const data = route.params;

  const InteriorCard = ({interior}) => {
    return <Image source={interior} style={styles.interiorImage} />;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Data image */}

        <View style={styles.backgroundImageContainer}>
          <ImageBackground style={styles.backgroundImage} source={data.image}>
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
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{data.title}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.ratingTag}>
                <Text style={{color: COLORS.white}}>4.8</Text>
              </View>
              <Text style={{fontSize: 13, marginLeft: 5}}>155 ratings</Text>
            </View>
          </View>

          {/* Location text */}
          <Text style={{fontSize: 16, color: COLORS.grey}}>
            {data.location}
          </Text>

          {/* Facilities container */}
          <View style={{flexDirection: 'row', marginTop: 20}}>
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
              <Text style={styles.facilityText}>100m area</Text>
            </View>
          </View>
          <Text style={{marginTop: 20, color: COLORS.grey}}>
            {data.details}
          </Text>

          {/* Interior list */}
          <FlatList
            contentContainerStyle={{marginTop: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, key) => key.toString()}
            data={data.interiors}
            renderItem={({item}) => <InteriorCard interior={item} />}
          />

          {/* footer container */}
          <View style={styles.footer}>
            <View>
              <Text
                style={{color: COLORS.blue, fontWeight: 'bold', fontSize: 18}}>
                $1,500
              </Text>
              <Text
                style={{fontSize: 12, color: COLORS.grey, fontWeight: 'bold'}}>
                Total Price
              </Text>
            </View>
            <View style={styles.bookNowBtn}>
              <TouchableOpacity>
                <Text style={{color: COLORS.white}}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;
