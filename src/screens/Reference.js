import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Header from '../components/global/Header';
import RNText from '../components/ui/RNText';
import colors, { externalStyles } from '../utils/Theme';
import { horizantGap, txtMd } from '../utils/Constant';
import Img from '../components/ui/Img';
import refer from "../../assets/reference/refer.svg";


const Reference = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.top}>
        <Header />
        <View style={styles.textContainer}>
          <RNText style={externalStyles.txtLg} color="primary" fontWeight="bold">
            Refer a Friend
          </RNText>
        </View>
      </View>

      <View style={{gap:5}}>
        <RNText style={externalStyles.txtXl} color="primary" fontWeight="bold" >Referral Code </RNText>
        <View>
            <RNText style={externalStyles.txtMd}>Refer a friend to us</RNText>
            <RNText style={externalStyles.txtMd}>For each friend you refer, you’ll both get 25 </RNText>
            <RNText style={externalStyles.txtMd}>AED to use on the order of your choice</RNText>

        </View>
      </View>

      <View style={styles.codeSec}>
        <View style={styles.codeText}>
        <RNText style={externalStyles.txtMd}>Your Code</RNText>
      </View>
       <View style={styles.codeBar}>
            <RNText style={[externalStyles.txtMd,{color:colors.white}]}  >BG16843C7</RNText>
        </View>
      </View>

      <View style={styles.Img}>
        <TouchableOpacity TouchableOpacity={0.7}>
            <Img source={refer} width={105} height={100}/>

        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity activeOpacity={0.7} >
           <RNText style={styles.link}>Share with Friends</RNText>
        </TouchableOpacity>
      </View>
      


      
      
    </View>
  )
}

export default Reference

const styles = StyleSheet.create({
    mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: horizantGap,
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
 codeSec: {
    alignItems: 'center',
    gap: 5, 
    marginTop:25,
  },
  
  codeBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary, 
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: 168, 
  },
  Img:{
    alignItems:"center",
    marginTop:25,
  },
  link:{
    textAlign:"center",
    textDecorationLine:"underline",
    fontSize:txtMd,
    marginTop:25,
  }

 
})