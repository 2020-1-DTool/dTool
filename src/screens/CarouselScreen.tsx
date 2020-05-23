import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";

import { Carousel, CardDescricao } from "../containers";

export interface ScreenProps {
  role?: string;
}

const CarouselScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <View style={styles.body}>
        <Carousel />
        <CardDescricao
          data={[
            {
              id: 1,
              patient: "Iniciais",
              title: "Medir pressão ",
              time: "00:15:37",
              role: "enfermeiro",
            },
          ]}
        />
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
