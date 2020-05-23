import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";
import { Carousel } from "../containers";

export interface ScreenProps {
  navigation: StackNavigationProp<any, any>;
}

const CarouselScreen: React.FC<ScreenProps> = () => {
  return (
    <SafeAreaView>
      <View style={styles.body}>
        <Carousel />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    minHeight: Dimensions.get("window").height,
  },
});

export default CarouselScreen;
