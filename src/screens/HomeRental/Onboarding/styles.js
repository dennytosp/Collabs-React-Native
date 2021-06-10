import {StyleSheet} from 'react-native';
import colors from '../../../consts/color';

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  image: {
    marginVertical: 60,
  },
  title: {
    fontSize: 24,
    color: colors.black,
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
    marginHorizontal: 60,
  },
  text: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
    fontFamily: 'OpenSans-SemiBold',
    marginHorizontal: 60,
    marginTop: 20,
  },
  dotStyle: {
    backgroundColor: colors.blueOnboardFaded,
  },
  activeDotStyle: {
    backgroundColor: colors.blueOnboard,
  },
  rightTextWrapper: {
    width: 40,
    height: 40,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  rightText: {
    color: colors.blueOnboard,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
  },
  leftTextWrapper: {
    width: 40,
    height: 40,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  leftText: {
    color: colors.blueOnboard,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
  },
  doneButtonWrapper: {
    flex: 1,
    paddingLeft: 35,
    paddingRight: 40,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: -0,
  },
  doneButtonText: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    textAlign: 'center',
    color: colors.white,
  },
});

export default styles;
