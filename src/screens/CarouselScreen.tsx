import React, { useState, useEffect } from "react";
import {
  AppState,
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  AppStateEvent,
} from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";
import moment from "moment";
import { Carousel, CardDescription } from "../containers";
import * as localStorage from "../services/localStorage";
import { Card } from "../services/types";
import colors from "../utils/colors";

export interface ScreenProps {
  navigation: StackNavigationProp<any, any>;
  route?: { params: { patientId: string; activityName: string } };
}

const CarouselScreen: React.FC<ScreenProps> = ({ route }) => {
  const [data, setData] = useState([] as Card[]);
  const [selectedCard, setSelectedCard] = useState(data[0] as Card);
  const activity = route?.params?.activityName;
  const patientId = route?.params?.patientId;

  // TODO: usar estes tempos para incrementar nos cronômetros já iniciados
  const handleAppstateFocus = () =>
    console.warn(
      `Voltou ao app no tempo: ${moment().format("YYYY-MM-DDTHH:mm:ss[Z]ZZ")}`
    );
  const handleAppstateBlur = () =>
    console.warn(
      `Saiu do app no tempo: ${moment().format("YYYY-MM-DDTHH:mm:ss[Z]ZZ")}`
    );

  useEffect(() => {
    // Eventos de focus e blur só funcionam para Android
    if (Platform.OS === "android") {
      AppState.addEventListener("focus" as AppStateEvent, handleAppstateFocus);
      AppState.addEventListener("blur" as AppStateEvent, handleAppstateBlur);

      return () => {
        AppState.removeEventListener(
          "focus" as AppStateEvent,
          handleAppstateFocus
        );
        AppState.removeEventListener(
          "blur" as AppStateEvent,
          handleAppstateBlur
        );
      };
    }
    return undefined;
  }, []);

  useEffect(() => {
    (async () => {
      const sessionCardResponse = await localStorage.getSession();
      const preferencesCardResponse = await localStorage.getPreferences();
      const currentRole =
        sessionCardResponse?.roleName || preferencesCardResponse?.roleName;

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
        role: currentRole,
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
          <CardDescription
            data={selectedCard || data[0]}
            state="finished" /* TODO: essa info deve vir do @ongoingExecution na integração, para alternar de estado */
            onPress1={() =>
              console.warn("onPress1")
            } /* TODO: cada callback destes, deve chamar as ações apropriadas */
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
    backgroundColor: colors.basic.backgroundHighlight,
    minHeight: Dimensions.get("window").height,
  },
});

export default CarouselScreen;
