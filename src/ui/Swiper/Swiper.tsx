import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import SwiperNav from "./SwiperNav/SwiperNav";
import SwiperSlide from "./SwiperSlide/SwiperSlide";
import { styles } from "./Swiper.styles";
import { useSwiper } from "./useSwiper";
import type { SwiperProps } from "./types";

const Swiper = gestureHandlerRootHOC<SwiperProps>(
  ({
    media,
    onClose,
    isNavigation = true,
    containerProps = {},
    slideProps = {},
    ...logicProps
  }) => {
    const { scrollViewRef, currentIndex, handleMomentumScrollEnd } =
      useSwiper(logicProps);

    return (
      <View style={styles.container}>
        <SwiperNav
          current={currentIndex}
          max={media.length}
          onClose={onClose}
          isNavigation={isNavigation}
        />
        <ScrollView
          {...containerProps}
          ref={scrollViewRef}
          horizontal={true}
          scrollEventThrottle={1}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleMomentumScrollEnd}>
          {media.map((item, index) => (
            <Pressable
              {...slideProps}
              key={item.id}
              style={styles.slide}>
              <SwiperSlide
                isActiveSlide={index === currentIndex}
                {...item}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>
    );
  },
);

export default React.memo(Swiper);
