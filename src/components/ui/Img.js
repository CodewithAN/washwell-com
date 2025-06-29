import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";

const Img = ({
  source,
  style,
  resizeMode = "contain",
  height = 100,
  width = 100,
  ...props
}) => {
  return (
    <View style={[styles.container, { height, width }, style]}>
      <Image
        style={styles.image}
        source={typeof source === "string" ? { uri: source } : source}
        contentFit={resizeMode}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default Img;
