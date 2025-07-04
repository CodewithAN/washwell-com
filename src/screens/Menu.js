import { StyleSheet, View } from 'react-native';
import PersonalIcon from '../../assets/menu/details.svg';
import OrdersIcon from '../../assets/menu/orders.svg';
import AddressIcon from '../../assets/menu/address.svg';
import CardsIcon from '../../assets/menu/cards.svg';
import WalletIcon from '../../assets/menu/wallet.svg';
import ReferIcon from '../../assets/menu/refer.svg';
import LanguageIcon from '../../assets/menu/globe.svg';
import SupportIcon from '../../assets/menu/chat.svg';
import LogoutIcon from '../../assets/menu/signout.svg';
import person from '../../assets/menu/person.svg';
import arrow from '../../assets/menu/arrow.svg';

import RNText from '../components/ui/RNText';
import Img from '../components/ui/Img';
import Header from '../components/global/Header';
import colors, { externalStyles } from '../utils/Theme';
import { horizantGap } from '../utils/Constant';
import RNView from '../components/ui/RNView';

const Menu = () => {
  const menuItems = [
    { title: 'Personal Details', icon: PersonalIcon, screen: 'PersonalDetails' },
    { title: 'My Orders', icon: OrdersIcon, screen: 'MyOrders' },
    { title: 'Addresses', icon: AddressIcon, screen: 'Addresses' },
    { title: 'My Cards', icon: CardsIcon, screen: 'MyCards' },
    { title: 'Wallet', icon: WalletIcon, screen: 'Wallet' },
    { title: 'Refer a Friend', icon: ReferIcon, screen: 'ReferFriend' },
    { title: 'Choose Language', icon: LanguageIcon, screen: 'Language' },
    { title: 'Support Center', icon: SupportIcon, screen: 'Support' },
    { title: 'Sign Out', icon: LogoutIcon, screen: 'Logout' },
  ];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.top}>
        <Header />
        <View style={styles.textContainer}>
          <RNText style={externalStyles.txtLg} color="primary" fontWeight="bold">Menu</RNText>
        </View>
      </View>

      <View style={styles.header}>
        <Img source={person} style={styles.profileImage} />
        <View style={styles.userInfo}>
          <RNText style={externalStyles.txtLg} color="primary">Shahid Abid</RNText>
          <RNText style={externalStyles.txtXs}>+971 8000850641</RNText>
        </View>
      </View>

      <View style={styles.menuList}>
        {menuItems.map((item, index) => (
          <RNView key={index} style={styles.menuItem}>
            <View style={styles.menuContent}>
              <Img source={item.icon} width={25} height={25} color={colors.primary} />
              <RNText style={styles.menuText}>{item.title}</RNText>
            </View>
            <Img source={arrow} style={styles.arrowIcon} />
          </RNView>
        ))}
      </View>
    </View>
  );
};

export default Menu;

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
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:10,

  },
  profileImage: {
    width: 50,
    height: 50,
    
  },
  userInfo: {
    justifyContent: 'center',
  },
  menuList: {
    gap: 10,

  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
   
 
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuText: {
    marginLeft: 20,
    fontSize: 13,
    fontWeight: "semiBold",
    color: colors.primary,
    textAlign: 'left',
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: colors.primary,
  },
});
