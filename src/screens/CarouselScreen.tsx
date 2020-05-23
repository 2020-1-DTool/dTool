import React, { useState, useEffect } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";
import { Carousel } from "../containers";
import * as localStorage from "../services/localStorage";
import { Card } from "../services/types";

export interface ScreenProps {
  navigation: StackNavigationProp<any, any>;
  route?: { params: { patientName: string; activityName: string } };
}

const CarouselScreen: React.FC<ScreenProps> = ({ route }) => {
  const [data, setData] = useState([] as Card[]);
  const [role, setRole] = useState("");
  const patient = route?.params?.patientName;
  const activity = route?.params?.activityName;

  useEffect(() => {
    (async () => {
      const responseCard = await localStorage.getSession();
      setRole(responseCard?.role?.toString() || "");
      let strComplete = await localStorage.getCards();
      let complete: Card[];
      let dataCard: Card;

      dataCard = {
        patient: patient || "",
        activity: activity || "",
        role,
        time: "00:00:00",
      };

      if (strComplete !== null) {
        complete = JSON.parse(strComplete);
        let tam = complete.length;

        // Evitar que insira duas vezes a mesma execução, em sequência
        if (
          complete[tam - 1]?.patient !== patient ||
          complete[tam - 1]?.activity !== activity
        ) {
          complete.push(dataCard);
          console.warn("CarouselScreen.tsx Entrou if");
          await localStorage.addCard(dataCard);
        }
      } else {
        complete = [dataCard];
        console.warn("CarouselScreen.tsx Entrou if");
        await localStorage.addCard(dataCard);
      }
      setData(complete);
    })();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.body}>
        <Carousel data={data.reverse()} />
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
