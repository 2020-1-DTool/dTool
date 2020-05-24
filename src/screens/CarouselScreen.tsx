import React, { useState, useEffect } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";
import { Carousel, CardDescription } from "../containers";
import * as localStorage from "../services/localStorage";
import { Card } from "../services/types";

export interface ScreenProps {
  navigation: StackNavigationProp<any, any>;
  route?: { params: { patientId: string; activityName: string } };
}

const CarouselScreen: React.FC<ScreenProps> = ({ route }) => {
  const [data, setData] = useState([] as Card[]);
  const [selectedCard, setSelectedCard] = useState(data[0] as Card);
  const activity = route?.params?.activityName;
  const patientId = route?.params?.patientId;

  useEffect(() => {
    (async () => {
      const sessionCardResponse = await localStorage.getSession();
      const preferencesCardResponse = await localStorage.getPreferences();
      const currentRole =
        sessionCardResponse?.role?.toString() ||
        preferencesCardResponse?.role?.toString();

      // Só exibe tecnologia se ela não for a padrão/salva como default
      const currentTech = sessionCardResponse?.technology?.toString();

      let strComplete = await localStorage.getCards();
      let complete: Card[];
      let dataCard: Card;
      let patient: any;

      if (patientId) patient = await localStorage.getPatient(patientId);

      dataCard = {
        patient: patient || "",
        activity: activity || "",
        role: currentRole || "",
        technology: currentTech || "",
        time: "00:00:00",
      };

      if (strComplete !== null) {
        complete = strComplete;
        const { length } = complete;

        // Evitar que insira duas vezes a mesma execução, em sequência
        if (
          (complete[length - 1]?.patient !== patient ||
            complete[length - 1]?.activity !== activity) &&
          dataCard.patient
        ) {
          complete.unshift(dataCard);
          await localStorage.addCard(dataCard);
        }
      } else {
        complete = [dataCard];
        await localStorage.addCard(dataCard);
      }
      setData(complete);
    })();
  }, []);

  const handlePress = (item: Card, index: number) => {
    setSelectedCard(item);
    console.log(`Selected card ${index}`);
  };
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.body}>
          <Carousel
            data={data}
            onPress={(item, index) => handlePress(item, index)}
          />
          {/* TODO: substituir por card com detalhes do card */}
          <Text>{JSON.stringify(selectedCard || data[0])}</Text>
          <CardDescription
            data={selectedCard}
            state="finished"
            onPress1={() => console.warn("onPress1")}
            onPress2={() => console.warn("onPress2")}
            onPress3={() => console.warn("onPress3")}
          />
        </View>
      </ScrollView>
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
