import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";

<<<<<<< HEAD
import { Carousel, CardDescription } from "../containers";

export interface ScreenProps {
  role?: string;
}
=======
import { StackNavigationProp } from "@react-navigation/stack";
import { Carousel } from "../containers";
>>>>>>> db2a19d757d6f9ca3da7b465817bb38dde14fb96

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
              patient: "Iniciais",
              title: "Medir pressão ",
              time: "00:15:37",
              role: "Enfermeiro",
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
