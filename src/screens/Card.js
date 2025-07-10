import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Header from "../components/global/Header";
import RNText from "../components/ui/RNText";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap, primarBorderRadius } from "../utils/Constant";
import credit from "../../assets/card/credit.svg";
import master from "../../assets/card/master.svg";
import Img from "../components/ui/Img";
import RNView from "../components/ui/RNView";
import tick from "../../assets/icons/tick.svg";
import visa from "../../assets/order/visa.svg";
import ellipse from "../../assets/order/ellipse.png";
import Button from "../components/ui/Button";
import RNTextInput from "../components/ui/RNTextInput";

const Card = () => {
  return (
    <>
      <Header space title="Add Card" />
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.card}>
            <View style={styles.upper}>
              <RNText
                style={[
                  externalStyles.txtXl,
                  { color: colors.white, textAlign: "right" },
                ]}
                fontWeight="medium"
              >
                VISA
              </RNText>
            </View>

            <View style={styles.bottom}>
              <View style={styles.numbers}>
                <RNText
                  style={[externalStyles.txtXl, { color: colors.white }]}
                  fontWeight="medium"
                >
                  4716
                </RNText>
                <RNText
                  style={[externalStyles.txtXl, { color: colors.white }]}
                  fontWeight="medium"
                >
                  9627
                </RNText>
                <RNText
                  style={[externalStyles.txtXl, { color: colors.white }]}
                  fontWeight="medium"
                >
                  1635
                </RNText>
                <RNText
                  style={[externalStyles.txtXl, { color: colors.white }]}
                  fontWeight="medium"
                >
                  8074
                </RNText>
              </View>

              <View style={styles.text}>
                <View>
                  <RNText style={{ color: colors.white }}>
                    Card Holder Name
                  </RNText>
                  <RNText style={{ color: colors.white }}>Shahid Abid</RNText>
                </View>
                <View>
                  <RNText style={{ color: colors.white }}>Expiry Date</RNText>
                  <RNText style={{ color: colors.white }}>05/29</RNText>
                </View>
                <View>
                  <Img
                    source={credit}
                    width={53}
                    height={53}
                    style={{ marginBottom: 20 }}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={{ gap: 5 }}>
            <RNTextInput
              placeholder={"Shahid Abid"}
              label={"Card Holder Name"}
            />
            <RNTextInput
              placeholder={"4015 STYN 1586 BQTD"}
              label={"Card Number"}
            />

            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <View style={styles.labelInput}>
                <RNTextInput placeholder={"5/29"} label={"Expiry Date"} />
              </View>
              <View style={styles.labelInput}>
                <RNTextInput placeholder={"068"} label={"CYY"} />
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View style={styles.tickBox}>
              <Img source={tick} width={14} height={14} style={styles.tick} />
            </View>
            <RNText style={externalStyles.txtMd} fontWeight="medium">
              Save Card
            </RNText>
          </View>

          <View style={{ gap: 5 }}>
            <View>
              <RNText style={externalStyles.txtMd} fontWeight="medium">
                Saved Cards
              </RNText>
              <RNText style={externalStyles.txtXs}>
                List of all credit cards you saved
              </RNText>
            </View>

            <View>
              <RNView style={styles.visa}>
                <View style={styles.leftSide}>
                  <View style={styles.imgContainer}>
                    <Img
                      source={visa}
                      width={32}
                      height={10}
                      style={styles.imgVisa}
                    />
                  </View>
                  <View>
                    <RNText style={externalStyles.txtMd} fontWeight="medium">
                      VISA xxxx 8047
                    </RNText>
                    <RNText>Expires on 05/29</RNText>
                  </View>
                </View>

                <View style={styles.rightSide}>
                  <Img source={ellipse} width={6} height={6} />
                  <Img source={ellipse} width={6} height={6} />
                  <Img source={ellipse} width={6} height={6} />
                </View>
              </RNView>
            </View>

            <View>
              <RNView style={styles.visa}>
                <View style={styles.leftSide}>
                  <View style={styles.imgContainer}>
                    <Img
                      source={master}
                      width={26}
                      height={17}
                      style={styles.imgMaster}
                    />
                  </View>
                  <View>
                    <RNText style={externalStyles.txtMd} fontWeight="medium">
                      Mastercard xxxx 9878
                    </RNText>
                    <RNText>Expires on 26/32</RNText>
                  </View>
                </View>

                <View style={styles.rightSide}>
                  <Img source={ellipse} width={6} height={6} />
                  <Img source={ellipse} width={6} height={6} />
                  <Img source={ellipse} width={6} height={6} />
                </View>
              </RNView>
            </View>
          </View>

          <View style={{ marginTop: 40, marginBottom: 30 }}>
            <TouchableOpacity activeOpacity={0.7}>
              <Button title={"Confirm Order"} variant="gradient" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Card;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: horizantGap,
    gap: 20,
    paddingTop: 10,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: colors.primary,
    borderRadius: primarBorderRadius,
    padding: 18,
    gap: 60,
  },
  numbers: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },
  text: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottom: {
    gap: 5,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  tickBox: {
    backgroundColor: colors.primary,
    borderRadius: primarBorderRadius,
    width: 25,
    height: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tick: {},
  imgContainer: {
    width: 42,
    height: 29,
    backgroundColor: colors.primary,
    borderRadius: primarBorderRadius,
  },
  imgVisa: {
    position: "absolute",
    top: 10,
    left: 4,
  },
  imgMaster: {
    position: "absolute",
    top: 5,
    left: 8,
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  visa: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rightSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  labelInput: {
    flex: 1,
  },
});
