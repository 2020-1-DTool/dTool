import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";
import { Carousel, CardDescription } from "../containers";
import {
  ButtonPrimary,
  ButtonSecundary,
  ButtonExecutions,
} from "../components";

export interface ScreenProps {
  navigation: StackNavigationProp<any, any>;
}

const CarouselScreen: React.FC<ScreenProps> = () => {
  return (
    <SafeAreaView>
      <View style={styles.body}>
        <Carousel />

        <CardDescription
          data={[
            {
              id: 1,
              patient: "Teste",
              title: "Medir pressão ",
              time: "00:15:37",
              role: "Enfermeiro",
            },
          ]}
        />

        <ButtonExecutions
          onPress={() => "nothingyet"}
          action="start"
          text="INICIAR"
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
