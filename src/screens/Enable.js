import { StyleSheet, Text, View } from 'react-native';
import RNText from '../components/ui/RNText';
import colors, { externalStyles } from '../utils/Theme';
import { horizantGap } from '../utils/Constant';
import enable from '../../assets/images/global/enable.svg';
import Img from '../components/ui/Img';
import Button from '../components/ui/Button';

const Enable = () => {
  return (
    <View style={styles.mainContainer}>
      <RNText fontWeight="bold" color="primary" style={[externalStyles.txtLg, styles.heading]}>
        Enable Location
      </RNText>
      <View style={styles.inputContainer}>
        <RNText style={styles.text}>
          Haier Wash collects location data to show
        </RNText>
        <RNText style={styles.text}>
          you nearest Haier Wash zones. Allow Haier
        </RNText>
        <RNText style={styles.text}>
          Wash to access this device’s location.
        </RNText>
      </View>
      <Img source={enable} width={372.87} height={329.71} style={styles.image} />
      <Button title="Turn on location" variant="gradient" style={styles.button} />
    </View>
  );
};

export default Enable;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background, 
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: horizantGap,
    paddingVertical: "15%",
    
  },
  heading: {
    marginTop: '10%',
    textAlign: 'center',
  },
  inputContainer: {
    marginTop:15,
    alignItems: 'center',
    gap: 3,
  },
  text: {
    textAlign: 'center',
    
  },
  image: {
    marginVertical: 'auto',
    marginHorizontal:"auto",
  },
  button: {
    
    width: '100%',
    alignSelf: 'center',
  },
});