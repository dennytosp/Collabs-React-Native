import {StyleSheet} from 'react-native';
import COLORS from '../../../consts/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    marginTop: 20,
  },
  headerWrapper: {
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    backgroundColor: COLORS.primary,
    height: 75,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 5,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
  },
  iconWhite: {
    color: '#fff',
  },
});

export default styles;
