import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";
import { ButtonPrimary } from "../components";
import { Carousel } from "../containers";

export interface ScreenProps {
  navigation: StackNavigationProp<any, any>;
}

const CarouselScreen: React.FC<ScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.body}>
        <Carousel />
        <ButtonPrimary
          title="Teste"
          onPress={() => {
            return navigation.navigate("EmptyScreen");
          }} // remover modificação futuramente, apenas para testes
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
