import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import Header from '../components/global/Header';
import RNText from '../components/ui/RNText';
import colors, { externalStyles } from '../utils/Theme';
import { horizantGap, txtXs } from '../utils/Constant';
import Img from '../components/ui/Img';
import person from '../../assets/menu/personal.png';
import details from "../../assets/icons/detail.svg";
import RNView from '../components/ui/RNView';
import Button from '../components/ui/Button';



const Details = () => {
  return (
    <View style={styles.mainContainer}>
        <View style={styles.top}>
        <Header />
        <View style={styles.textContainer}>
          <RNText style={externalStyles.txtLg} color="primary" fontWeight="bold">Personal Details</RNText>
        </View>
        </View>

        <View style={styles.images}>
            <Img source={person} width={46} height={46}/>
            <Img source={details} width={20} height={20}/>
        </View>

        <View style={styles.details}>
          <RNView style={styles.text} >
            <RNText style={externalStyles.txtXs}>First Name</RNText>
            <RNText style={externalStyles.txtMd} fontWeight='semiBold'>Shahid</RNText>
          </RNView>
          <RNView style={styles.text} >
            <RNText style={externalStyles.txtXs}>Last Name</RNText>
            <RNText style={externalStyles.txtMd} fontWeight='semiBold'>Abid</RNText>
          </RNView>
          <RNView style={styles.text} >
            <RNText style={externalStyles.txt}>Email Address</RNText>
            <RNText style={externalStyles.txtMd} fontWeight='semiBold'>shahidabid94@gmail.com</RNText>
          </RNView>
          <RNView style={styles.text} >
            <RNText style={externalStyles.txtXs}>Phone Number</RNText>
            <RNText style={externalStyles.txtMd} fontWeight='semiBold'>+971 8800850641</RNText>
          </RNView>
          <RNView style={styles.text} >
            <RNText style={[externalStyles.txtMd,styles.input]}>Change Password </RNText>
          </RNView>
          <TouchableOpacity TouchableOpacity={0.7}>
            <RNText style={styles.link}>Change Address</RNText>
          </TouchableOpacity>
          

        </View>

        <TouchableOpacity TouchableOpacity={0.7} >
        <Button title={"Confirm"} variant='gradient'style={styles.button} />
      </TouchableOpacity>

    </View>
  )
}

export default Details

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: horizantGap,
    paddingBottom:"10%",
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
  images:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",

  },
  details:{
    gap:5,
    flex:1,
    marginTop:10,
    

  },
  text:{
    gap:10,
    

  },
  input:{
    
   paddingVertical:11,
  },
  link:{
    textAlign:"right",
    color:colors.primary,
    textDecorationLine:"underline",
    textDecorationColor:colors.primary,
    fontSize:txtXs,
    fontWeight:'semiBold',
  },


  
})