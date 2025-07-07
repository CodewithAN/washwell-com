import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import colors, { externalStyles } from '../utils/Theme';
import { horizantGap, primarBorderRadius } from '../utils/Constant';
import Img from '../components/ui/Img';
import person from '../../assets/menu/personal.png';
import bell from '../../assets/wallet/bell.png';
import eye from '../../assets/wallet/eye.svg';
import border from '../../assets/wallet/border.svg';
import ellipse from '../../assets/wallet/ellipse.svg';
import note from '../../assets/wallet/note.svg';
import RNText from '../components/ui/RNText';
import RNView from '../components/ui/RNView';
import Button from '../components/ui/Button';

const Wallet = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <View style={styles.top}>
          <View style={styles.topLeft}>
            <Img source={person} width={24} height={24} />
            <RNText style={[externalStyles.txtXl, { color: colors.white }]} fontWeight="bold">
              Hello, Shahid
            </RNText>
          </View>
          <View style={styles.notificationWrapper}>
            <Img source={bell} style={styles.notificationIcon} />
            <View style={styles.notificationDot} />
          </View>
        </View>

        <View style={styles.bottom}>
          <View>
            <RNText style={[externalStyles.txtMd, { color: colors.white }]} fontWeight="400">
              Total Balance
            </RNText>
            <View style={styles.bottomRow}>
              <RNText style={[externalStyles.txtXl, { color: colors.white }]} fontWeight="500">
                14,255.13 AED
              </RNText>
              <Img source={eye} width={22} height={22} />
            </View>
          </View>
          <View style={styles.line} />
        </View>
      </View>

      <View style={styles.card}>
        <RNView style={{ gap: 10 ,width:"48%" }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:"space-between" }}>
            <View>
              <Img source={border} width={62} height={39} style={styles.imgBorder} />
              <Img source={note} width={46} height={28} style={styles.imgNote} />
            </View>
            <View style={{gap:2}}>
              <Img source={ellipse} width={6} height={6} />
              <Img source={ellipse} width={6} height={6} />
              <Img source={ellipse} width={6} height={6} />
            </View>
          </View>
          <View>
            <RNText>Total Earned</RNText>
            <RNText style={externalStyles.txtMd} fontWeight="semiBold">3,275 AED</RNText>
          </View>
        </RNView>
        <RNView style={{ gap: 15, width:"48%" }}>
          <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:"space-between"}}>
            <View>
              <Img source={border} width={62} height={39} style={styles.imgBorder} />
              <Img source={note} width={46} height={28} style={styles.imgNote} />
            </View>
            <View style={{gap:2}}>
              <Img source={ellipse} width={6} height={6} />
              <Img source={ellipse} width={6} height={6} />
              <Img source={ellipse} width={6} height={6} />
            </View>
          </View>
          <View>
            <RNText>Total Spent</RNText>
            <RNText style={externalStyles.txtMd} fontWeight="semiBold">3,275 AED</RNText>
          </View>
        </RNView>
      </View>
      <View style={styles.orderButton} >
            <TouchableOpacity activeOpacity={0.7}>
              <Button title={'Place Order'} variant="gradient" />
            </TouchableOpacity>
      </View>

      
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    gap: 20,
    backgroundColor:colors.background,
    paddingBottom:"15%",
    
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: horizantGap,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingVertical: 20,
    gap: 40,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  notificationIcon: {
    width: 18,
    height: 19,
  },
  notificationWrapper: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bottom: {
    gap: 15,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: colors.white,
  },
  imgBorder: {
    position: 'relative',
  },
  imgNote: {
    position: 'absolute',
    top: 6,
    left: 7,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
   
    paddingHorizontal: horizantGap,
  },
  orderButton: {
   
    paddingHorizontal:horizantGap,
    marginTop:"auto",
  },
});