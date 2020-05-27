import React, { useState, useEffect } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";
import { Carousel, CardDescription } from "../containers";
import {
  createExecution,
  timeToString,
  initializeExecution,
  cancelExecution,
  pauseExecution,
  finishExecution,
  updateAll,
  getExecutionStatus,
} from "../services/timerFunction";
import * as localStorage from "../services/localStorage";
import { Card, ExecutionStatus, CardExecutionType } from "../services/types";
import colors from "../utils/colors";

export interface ScreenProps {
  navigation: StackNavigationProp<any, any>;
  route?: {
    params: { patientId: string; activityName: string; activityId: number };
  };
}

const CarouselScreen: React.FC<ScreenProps> = ({ navigation, route }) => {
  const [cardState, setCardState] = useState(ExecutionStatus.Uninitialized);
  const [data, setData] = useState([] as Card[]);
  const [selectedCard, setSelectedCard] = useState(data[0] as Card);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const activity = route?.params?.activityName;
  const activityId = route?.params?.activityId;
  const patientId = route?.params?.patientId;

  useEffect(() => {
    (async () => {
      const sessionCardResponse = await localStorage.getSession();
      const preferencesCardResponse = await localStorage.getPreferences();
      const currentRole =
        sessionCardResponse?.roleName || preferencesCardResponse?.roleName;
      const currentRoleIndex =
        sessionCardResponse?.role || preferencesCardResponse?.role;

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

        // Evitar que insira duas vezes a mesma execução, em sequência
        if (dataCard.patient) {
          complete.unshift(dataCard);
          await localStorage.addCard(dataCard);

          const dataCardInfo: CardExecutionType = {
            idPatient: dataCard.patient.id,
            activity: activityId || 0,
            role: currentRoleIndex || 0,
          };

          await createExecution(dataCardInfo);
        }
      } else {
        complete = [dataCard];
        const dataCardInfo: CardExecutionType = {
          idPatient: dataCard.patient.id,
          activity: activityId || 0,
          role: currentRoleIndex || 0,
        };

        await createExecution(dataCardInfo);
        await localStorage.addCard(dataCard);
      }
      setData(complete);
    })();
  }, []);

  const handlePress = async (item: Card, index: number) => {
    setSelectedCard(item);
    setSelectedCardIndex(index);
    console.log(`Selected card ${index}`);
    await handleCardStateChange();
  };

  const handleCardStateChange = async () => {
    const nextStatus = await getExecutionStatus(data.indexOf(selectedCard));
    if (nextStatus) setCardState(nextStatus);
  };

  const updateCarousel = async () => {
    const complete = await localStorage.getCards();
    if (complete.length) {
      setSelectedCard(complete[0]);
      setData(complete);
      setSelectedCardIndex(0);
      await handleCardStateChange();
    } else
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Home",
          },
        ],
      });
  };

  const handlePress1 = async () => {
    switch (cardState) {
      case ExecutionStatus.Uninitialized:
        await initializeExecution(selectedCardIndex);
        setCardState(ExecutionStatus.Initialized);
        break;
      case ExecutionStatus.Initialized:
        await pauseExecution(selectedCardIndex);
        setCardState(ExecutionStatus.Paused);
        break;
      case ExecutionStatus.Paused:
        // TODO: no momento só conseguimos remover os cards do início
        await finishExecution(selectedCardIndex);
        setCardState(ExecutionStatus.Finished);
        await localStorage.removeCard(selectedCardIndex);
        await updateCarousel();
        break;
      default:
        break;
    }
  };

  const handlePress2 = async () => {
    if (cardState !== ExecutionStatus.Paused) {
      const removed = await cancelExecution(selectedCardIndex);
      if (removed) {
        await localStorage.removeCard(selectedCardIndex);
        await updateCarousel();
      }
    } else {
      await initializeExecution(selectedCardIndex);
      setCardState(ExecutionStatus.Initialized);
    }
  };

  const handlePress3 = async () => {
    const removed = await cancelExecution(selectedCardIndex);
    if (removed) {
      await localStorage.removeCard(selectedCardIndex);
      await updateCarousel();
    }
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
            state={cardState}
            onPress1={() => handlePress1()}
            onPress2={() => handlePress2()}
            onPress3={() => handlePress3()}
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
