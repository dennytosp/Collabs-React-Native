import React, { useEffect } from 'react';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import COLORS from '../../../consts/color';
import styles from './styles';

const Onboard = ({navigation}) => {
  useEffect(() => {
    return () =>
    BackHandler.removeEventListener('Login', () => true);
  },  [])
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar translucent backgroundColor={COLORS.tranparent} />

      {/* Onboarding Image */}
      <Image
        source={require('../../../assets/shoes/shoes8.jpg')}
        style={styles.image}
      />

      {/* Indicator container */}
      <View style={styles.indicatorContainer}>
        <View style={styles.indicator} />
        <View style={styles.indicator} />
        <View style={[styles.indicator, styles.indicatorActive]} />
      </View>

      {/* Title and text container */}
      <View style={{paddingHorizontal: 20, paddingTop: 20}}>
        {/* Title container */}
        <View>
          <Text style={styles.title}>Find your</Text>
          <Text style={styles.title}>quality shoes</Text>
        </View>

        {/* Text container */}
        <View style={{marginTop: 10}}>
          <Text style={styles.textStyle}>
            Schedule visits in just a few clicks
          </Text>
          <Text style={styles.textStyle}>visit in just a few clicks</Text>
        </View>
      </View>

      {/* Button container */}
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: 40,
        }}>
        {/* button */}
        <Pressable onPress={() => navigation.navigate('HomeRental')}>
          <View style={styles.btn}>
            <Text style={{color: 'white'}}>Get Started</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Onboard;
