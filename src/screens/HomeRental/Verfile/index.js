import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS from '../../../consts/color';
import Icon from 'react-native-vector-icons/Feather';
import styles from './styles';

const Verfile = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={24} color="#52575d" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="more-vertical" size={24} color="#52575d" />
          </TouchableOpacity>
        </View>

        <View style={{alignSelf: 'center'}}>
          <View style={styles.profileImage}>
            <Image
              source={require('../../../assets/deweei/person.jpg')}
              style={styles.image}
              resizeMode="center"></Image>
          </View>
          <View style={styles.dm}>
            <TouchableOpacity>
              <Icon name="message-circle" size={18} color="#DFD8C8" />
            </TouchableOpacity>
          </View>
          <View style={styles.active}></View>
          <View style={styles.add}>
            <TouchableOpacity onPress={() => navigation.navigate('Navigation')}>
              <Icon
                name="edit-2"
                size={32}
                color="#DFD8C8"
                style={{marginTop: 6, marginLeft: 2}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <Text style={[styles.text, {fontWeight: '200', fontSize: 36}]}>
            Wzon
          </Text>
          <Text style={[styles.text, {color: '#AEB5BC', fontSize: 14}]}>
            Mobile Developer
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={styles.statusBox}>
            <Text style={[styles.text, {fontSize: 24}]}>195</Text>
            <Text style={[styles.text, styles.subText]}>Posts</Text>
          </View>
          <View
            style={[
              styles.statusBox,
              {borderColor: '#DFD8C8', borderLeftWidth: 1, borderRightWidth: 1},
            ]}>
            <Text style={[styles.text, {fontSize: 24}]}>1M</Text>
            <Text style={[styles.text, styles.subText]}>Followers</Text>
          </View>
          <View style={styles.statusBox}>
            <Text style={[styles.text, {fontSize: 24}]}>25</Text>
            <Text style={[styles.text, styles.subText]}>Following</Text>
          </View>
        </View>

        <View style={{marginTop: 32}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.mediaImageContainer}>
              <Image
                source={require('../../../assets/rental/house1.jpg')}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.mediaImageContainer}>
              <Image
                source={require('../../../assets/rental/house2.jpg')}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.mediaImageContainer}>
              <Image
                source={require('../../../assets/rental/house4.jpg')}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          </ScrollView>

          <View style={styles.mediaCount}>
            <Text
              style={[
                styles.text,
                {fontSize: 24, color: '#DFD8C8', fontWeight: '300'},
              ]}>
              70
            </Text>
            <Text
              style={[
                styles.text,
                {fontSize: 12, color: '#DFD8C8', textTransform: 'uppercase'},
              ]}>
              Media
            </Text>
          </View>
        </View>

        <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>

        <View style={{alignItems: 'center'}}>
          <View style={styles.recentItem}>
            <View style={styles.recentItemIndicator}></View>
            <View style={{width: 250}}>
              <Text
                style={[styles.text, {color: '#41444B', fontWeight: '300'}]}>
                Rainy days {''}
                <Text style={{fontWeight: '400'}}>
                  by Deweei {''}
                  <Text style={{fontWeight: '400'}}>Wzonist</Text>
                </Text>
              </Text>
            </View>
          </View>

          <View style={styles.recentItem}>
            <View style={styles.recentItemIndicator}></View>
            <View style={{width: 250}}>
              <Text
                style={[styles.text, {color: '#41444B', fontWeight: '300'}]}>
                Loving you {''}
                <Text style={{fontWeight: '400'}}>by Dinh Phong</Text>
              </Text>
            </View>
          </View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Verfile;
