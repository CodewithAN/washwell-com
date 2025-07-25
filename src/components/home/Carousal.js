import { FlatList, Image, StyleSheet, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { horizantGap, txtLg, txtMd, txtXl } from "../../utils/Constant";
import colors from "../../utils/Theme";
import { vw } from "../../utils/ScreenSize";
import RNText from "../ui/RNText";
import font from "../../utils/Fonts";

const Carousel = ({ CarouselData }) => {
  const sliderWidth = 90 * vw;
  const [activeIndex, setActiveIndex] = useState(0);

  const flatListRef = useRef();
  const scrollTimeout = useRef(null);

  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.mainContainer}>
        <View style={styles.txtContainer}>
          <RNText style={styles.title}>{item?.title || ""}</RNText>
          <RNText numberOfLines={2} style={styles.description}>
            {item?.description || ""}
          </RNText>
        </View>
        <Image
          key={index}
          source={{ uri: item.image }}
          style={{ width: sliderWidth, height: 200, borderRadius: 10 }}
        />
      </View>
    );
  };

  const renderDotIndicator = () => {
    return CarouselData.map((item, index) => (
      <View
        key={item.id}
        style={[
          styles.dot,
          activeIndex === index ? styles.activeDot : styles.inactiveDot,
        ]}
      />
    ));
  };

  const handleScroll = (event) => {
    event.persist();

    if (event.nativeEvent && event.nativeEvent.contentOffset) {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / sliderWidth);
        if (index !== activeIndex) {
          setActiveIndex(index);
        }
      }, 50);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (activeIndex + 1) % CarouselData.length;
      flatListRef.current.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setActiveIndex(nextIndex);
    }, 4500);

    return () => {
      clearInterval(interval);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [activeIndex]);

  const getItemLayout = (_, index) => ({
    length: sliderWidth,
    offset: sliderWidth * index,
    index,
  });

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        horizontal
        data={CarouselData}
        ref={flatListRef}
        getItemLayout={getItemLayout}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={handleScroll}
        renderItem={renderItem}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
      />
      {CarouselData.length > 0 && (
        <View style={styles.dotContainer}>{renderDotIndicator()}</View>
      )}
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselContainer: {
    position: "relative",
  },
  imgStyle: {
    width: "100%",
    objectFit: "contain",
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 10,
    marginHorizontal: horizantGap,
  },
  dot: {
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: colors.primary,
    height: 8,
    width: 8,
    borderRadius: 10,
  },
  inactiveDot: {
    backgroundColor: colors.lightGray,
    height: 8,
    width: 8,
    borderRadius: 10,
  },
  mainContainer: {
    position: "relative",
  },
  txtContainer: {
    position: "absolute",
    zIndex: 10,
    top: 20,
    left: 20,
    gap: 3,
  },
  title: {
    fontSize: txtXl,
    color: colors.primary,
    fontFamily: font.medium,
  },
  description: {
    fontSize: txtLg,
    color: "white",
    textTransform: "capitalize",
  },
});
