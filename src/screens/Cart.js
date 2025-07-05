import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import RNText from '../components/ui/RNText';
import Header from '../components/global/Header';
import colors, { externalStyles } from '../utils/Theme';
import {
  horizantGap,
  primarBorderRadius,
  primaryHeight,
  txtXs
} from '../utils/Constant';
import Img from '../components/ui/Img';
import RNView from '../components/ui/RNView';

import choose from "../../assets/icons/choosesearch.svg";
import dryClean from "../../assets/icons/dry.svg";
import onlyPress from "../../assets/icons/Iron.svg";
import washFold from "../../assets/icons/Laundry.svg";
import carpets from "../../assets/icons/Yoga mat.svg";

import coat from "../../assets/cart/coat.svg";
import jeans from "../../assets/cart/jeans.svg";
import shirt from "../../assets/cart/shirt.svg";
import ellipse from "../../assets/cart/ellipse.svg";
import Button from '../components/ui/Button';


const Cart = () => {
  return (
    <View style={styles.mainContainer}>
      {/* Header */}
      <View style={styles.top}>
        <Header />
        <View style={styles.textContainer}>
          <RNText style={externalStyles.txtLg} color="primary" fontWeight="bold">
            Cart
          </RNText>
        </View>
      </View>

      {/* Service Tabs */}
      <View style={styles.outerContainer}>
        <View style={[styles.innerContainer, styles.selectedTab]}>
          <Img source={dryClean} width={38} height={40} />
          <View style={styles.text}>
            <RNText color="white">Clean&</RNText>
            <RNText color="white">Press</RNText>
          </View>
        </View>

        <View style={styles.innerContainer}>
          <Img source={onlyPress} width={38} height={40} />
          <View style={styles.text}>
            <RNText>Only</RNText>
            <RNText>Press</RNText>
          </View>
        </View>

        <View style={styles.innerContainer}>
          <Img source={washFold} width={38} height={40} />
          <View style={styles.text}>
            <RNText>Wash</RNText>
            <RNText>&Fold</RNText>
          </View>
        </View>

        <View style={styles.innerContainer}>
          <Img source={carpets} width={38} height={40} />
          <View style={styles.text}>
            <RNText>Carpet&</RNText>
            <RNText>Curtains</RNText>
          </View>
        </View>
      </View>

      {/* Search Bar */}
      <RNView style={styles.searchBar}>
        <Img source={choose} width={16} height={16} />
        <RNText color='primary' style={externalStyles.txtMd}>Search here</RNText>
      </RNView>

      {/* T-shirt Card  */}
      <RNView style={styles.cardWrapper}>
        {/* Floating Image */}
        <View style={styles.imageContainer}>
          <Img source={ellipse} style={styles.outer} />
          <Img source={shirt} style={styles.inner} />
        </View>

        {/* Card */}
        <View style={styles.cardContainer}>
          <View style={styles.cardLeft}>
            <RNText style={externalStyles.txtLg} fontWeight='semiBold'>T-Shirt</RNText>
          </View>
          <View style={styles.cardRight}>
            <RNText style={externalStyles.txtMd}>25 AED</RNText>
          </View>
        </View>
      </RNView>

       {/* Jeans Card  */}
      <RNView style={styles.cardWrapper}>
        {/* Floating Image */}
        <View style={styles.imageContainer}>
          <Img source={ellipse} style={styles.outer} />
          <Img source={jeans} style={styles.inner} />
        </View>

        {/* Card */}
        <View style={styles.cardContainer}>
          <View style={styles.cardLeft}>
            <RNText style={externalStyles.txtLg} fontWeight='semiBold'>Jeans</RNText>
          </View>
          <View style={styles.cardRight}>
            <RNText style={externalStyles.txtMd}>25 AED</RNText>
          </View>
        </View>
      </RNView>

       {/* Coat Card  */}
      <RNView style={styles.cardWrapper}>
        {/* Floating Image */}
        <View style={styles.imageContainer}>
          <Img source={ellipse} style={styles.outer} />
          <Img source={coat} style={styles.inner} />
        </View>

        {/* Card */}
        <View style={styles.cardContainer}>
          <View style={styles.cardLeft}>
            <RNText style={externalStyles.txtLg} fontWeight='semiBold'>Coat</RNText>
          </View>
          <View style={styles.cardRight}>
            <RNText style={externalStyles.txtMd}>75 AED</RNText>
          </View>
        </View>
      </RNView>


      <View style={styles.contentWrapper}>
        {/* Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity activeOpacity={0.7}>
            <Button title={"Place Order"} variant='gradient' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: horizantGap,
    paddingBottom: "10%",
    gap: 20,
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
  outerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
    backgroundColor: colors.white,
    borderRadius: primarBorderRadius,
  },
  innerContainer: {
    gap: 5,
    width: "22%",
    fontSize: txtXs,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: primarBorderRadius,
  },
  selectedTab: {
    backgroundColor: colors.primary,
    height: 100,
  },
  text: {
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: primaryHeight,
    gap: 10,
    marginTop: 10,
  },
  cardWrapper: {
    position: 'relative',
    marginTop: 35, 
  },
  imageContainer: {
    position: 'absolute',
    top: -34.5,
    left: 20,
    width: 69,
    height: 69,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  outer: {
    width: 69,
    height: 69,
  },
  inner: {
    position: "absolute",
    width: 46,
    height: 40,
    top: 12,
    left: 12,
    //transform: [{ translateX: -23 }, { translateY: -20 }],
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderRadius: primarBorderRadius,
    paddingVertical: 10,
    paddingLeft: 90, 
    paddingRight: 10,
  },
  cardLeft: {
    justifyContent: "center",
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
 
});