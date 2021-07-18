import { StyleSheet } from 'react-native';
import COLORS from '../../../consts/color';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    marginTop: 25,
  },
  headerWrapper: {
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  iconWhite: {
    color: '#FFF',
  },
  headerText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
  },
  splash: {
    paddingTop: 60,
    paddingBottom: 120,
    alignItems: 'center',
  },
  content: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 20,
    marginTop: -60,
    marginBottom: 60,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#2d2d2d',
    paddingVertical: 20,
  },
  input: {
    // fontWeight: 'bold',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 2,
    fontSize: 16,
    marginBottom: 20,
    paddingVertical: 20,
  },
  description: {
    color: '#989898',
    textAlign: 'center',
    fontSize: 17.5,
    padding: 18,
    fontWeight: '400',
  },
  buttonWrapper: {
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.bonus,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  iconButton: {
    color: '#fff',
  },

  viewRowSocial: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  viewCardSocial: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },

  btnGoogle: {
    alignSelf: 'center',
    width: 70,
    height: 70,
    shadowColor: '#000',
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 5,
    borderRadius: 70 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  btnFacebook: {
    width: 70,
    marginLeft: 16,
    marginRight: 16,
    height: 70,
    borderRadius: 70 / 2,
    shadowColor: '#000',
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 5,
    borderRadius: 70 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  btnTwitter: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    shadowColor: '#000',
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 5,
    borderRadius: 70 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default styles;
