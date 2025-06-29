import { ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "../utils/Theme";
import Header from "../components/global/Header";
import Button from "../components/ui/Button";
import { horizantGap } from "../utils/Constant";

const SignUp = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Header title="Choose location" />
        <View
          style={{
            position: "absolute",
            bottom: 25,
            width: "100%",
          }}
        >
          <Button style={{ margin: "auto" }} title={"hello"} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: horizantGap,
  },
});
