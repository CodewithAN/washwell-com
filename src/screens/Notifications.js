import { StyleSheet, Text, View } from 'react-native';
import RNText from '../components/ui/RNText';
import Header from '../components/global/Header';
import Img from '../components/ui/Img';
import colors, { externalStyles } from '../utils/Theme';
import { horizantGap, txtLg, txtMd, txtSm } from '../utils/Constant';
import notification from '../../assets/icons/Notification.svg';
import checkmark from '../../assets/icons/checkmark.svg';
import message from '../../assets/icons/message.svg';
import coupons from '../../assets/icons/coupons.svg';

const Notifications = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.top}>
        <Header />
        <View style={styles.textContainer}>
          <RNText style={externalStyles.txtXl} color="primary" fontWeight="bold">
            Notifications
          </RNText>
        </View>
      </View>

      <View>
        <Img source={notification} style={styles.homeImage} resizeMode="contain" />
      </View>

      
        <RNText fontWeight="semiBold" style={[externalStyles.txtMd,styles.header]}>
        Today
        </RNText>
      <View style={styles.notificationItem}>
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <Img source={checkmark} style={styles.icon} />
          </View>
          <RNText fontWeight='semiBold' style={styles.notificationText}>Shahid, your laundry is done!</RNText>
        </View>
        <RNText  color="primary" style={styles.timestampText}>Just Now</RNText>
      </View>
      <View style={styles.notificationItem}>
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <Img source={coupons} style={styles.icon} />
          </View>
          <RNText style={styles.notificationText}>50% off your next laundry</RNText>
        </View>
        <RNText style={styles.timestampText}>3:00 PM</RNText>
      </View>
      <View style={styles.notificationItem}>
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <Img source={coupons} style={styles.icon} />
          </View>
          <RNText style={styles.notificationText}>Check out brand new offers</RNText>
        </View>
        <RNText style={styles.timestampText}>11:00 AM</RNText>
      </View>
      

   

      <RNText fontWeight="semiBold" style={[externalStyles.txtMd,styles.header]}>
        06 Oct 2023
      </RNText>
      <View style={styles.notificationItem}>
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <Img source={checkmark} style={styles.icon} />
          </View>
          <RNText  style={styles.notificationText}>Shahid, your laundry is done!</RNText>
        </View>
        <RNText style={styles.timestampText}>11:47 PM</RNText>
      </View>
      <View style={styles.notificationItem}>
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <Img source={coupons} style={styles.icon} />
          </View>
          <RNText style={styles.notificationText}>Weekly discount</RNText>
        </View>
        <RNText style={styles.timestampText}>9:08 PM</RNText>
      </View>
      <View style={styles.notificationItem}>
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <Img source={message} style={styles.icon} />
          </View>
          <RNText style={styles.notificationText}>Washing machine is available</RNText>
        </View>
        <RNText style={styles.timestampText}>9:00 PM</RNText>
      </View>
      <View style={styles.notificationItem}>
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <Img source={message} style={styles.icon} />
          </View>
          <RNText style={styles.notificationText}>Dryers are available now!</RNText>
        </View>
        <RNText style={styles.timestampText}>6:45 PM</RNText>
      </View>
      <View style={styles.notificationItem}>
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <Img source={coupons} style={styles.icon} />
          </View>
          <RNText style={styles.notificationText}>A free laundry coupon, yay!</RNText>
        </View>
        <RNText style={styles.timestampText}>8:52 AM</RNText>
      </View>
      <View style={styles.notificationItem}>
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <Img source={coupons} style={styles.icon} />
          </View>
          <RNText style={styles.notificationText}>Check the coupons available</RNText>
        </View>
        <RNText style={styles.timestampText}>8:50 AM</RNText>
      </View>
      <View style={styles.notificationItem}>
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <Img source={message} style={styles.icon} />
          </View>
          <RNText style={styles.notificationText}>Dryers are available now!</RNText>
        </View>
        <RNText style={styles.timestampText}>6:45 PM</RNText>
      </View>
      <View style={styles.notificationItem}>
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <Img source={checkmark} style={styles.icon} />
          </View>
          <RNText style={styles.notificationText}>Shahid, your laundry is done!</RNText>
        </View>
        
        <RNText style={styles.timestampText}>2:00 PM</RNText>
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background, 
    paddingHorizontal: horizantGap,
    gap: 15, 
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeImage: {
    width: '100%',
    height: 60,
  },
  header:{
    marginVertical:10,

  },
  
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"space-between",
     
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink:1,
  
    gap: 15, 
  },
  iconContainer: {
    width: 30,
    height: 30,
    backgroundColor: colors.white, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5, 
  },
  icon: {
    width: 24,
    height: 24,
    
  },
  notificationText: {
    fontSize:txtMd,
    flexShrink:1,
  },
  timestampText: {
    fontSize:txtSm,
    marginRight:10,
  },
});