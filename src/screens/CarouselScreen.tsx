import React, { useState, useEffect } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";
//import { State } from "react-native-gesture-handler";
import { Carousel, CardDescription } from "../containers";
import * as localStorage from "../services/localStorage";
import * as timerFunctions from "../services/timerFunction";
import { Card, ExecutionStatus, CardExecutionType } from "../services/types";
import colors from "../utils/colors";

export interface ScreenProps {
  navigation: StackNavigationProp<any, any>;
  route?: { params: { patientId: string; activityName: string } };
}

const CarouselScreen: React.FC<ScreenProps> = ({ route }) => {
  const [data, setData] = useState([] as Card[]);
  const [selectedCard, setSelectedCard] = useState(data[0] as Card);
  const [cardState, setCardState] = useState(ExecutionStatus.Uninitialized);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const activity = route?.params?.activityName;
  const patientId = route?.params?.patientId;

  useEffect(() => {
    (async () => {
      const sessionCardResponse = await localStorage.getSession();
      const preferencesCardResponse = await localStorage.getPreferences();
      const currentRole =
        sessionCardResponse?.roleName || preferencesCardResponse?.roleName;
      const currentRoleNmbr =
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
        const { length } = complete;

        // Evitar que insira duas vezes a mesma execução, em sequência
        if (
          (complete[length - 1]?.patient !== patient ||
            complete[length - 1]?.activity !== activity) &&
          dataCard.patient
        ) {
          complete.unshift(dataCard);
        }
      } else {
        complete = [dataCard];
      }
      if (isFirstRender) {
        await localStorage.addCard(dataCard);
        const dataCardInfo: CardExecutionType = {
          idPatient: dataCard.patient.id,
          activity: 1,
          role: currentRoleNmbr || 0,
        };
        await timerFunctions.createExecution(dataCardInfo);
        setIsFirstRender(false);
        setData(complete);
      }
      let nextStatus = await timerFunctions.getExecutionStatus(
        data.indexOf(selectedCard)
      );
      if (nextStatus === null) {
        console.error(
          `Execution status for index ${data.indexOf(selectedCard)} not found`
        );
      } else {
        setCardState(nextStatus);
      }
    })();
  }, []);

  const handlePress = async (item: Card, index: number) => {
    setSelectedCard(item);
    console.log(`Selected card ${index}`);
    setSelectedCard(data[index]);
    let nextStatus = await timerFunctions.getExecutionStatus(
      data.indexOf(selectedCard)
    );
    if (nextStatus === null) {
      console.error(
        `Execution status for index ${data.indexOf(selectedCard)} not found`
      );
    } else {
      setCardState(nextStatus);
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
            state={
              cardState
            } /* TODO: essa info deve vir do @ongoingExecution na integração, para alternar de estado */
            onPress1={async () => {
              let index = data.indexOf(selectedCard);
              switch (cardState) {
                case ExecutionStatus.Uninitialized:
                  await timerFunctions.initializeExecution(index);
                  setCardState(ExecutionStatus.Initialized);
                  console.log("Botao 1, Uninitialized");
                  break;
                case ExecutionStatus.Initialized:
                  await timerFunctions.pauseExecution(index);
                  setCardState(ExecutionStatus.Paused);
                  console.log("Botao 1, Initialized");
                  break;
                case ExecutionStatus.Paused:
                  console.log("Botao 1, Paused");
                  await timerFunctions.finishExecution(index);
                  await localStorage.removeCard(index);
                  if (data.length <= index) {
                    index = data.length - 1;
                  }
                  setSelectedCard(data[index]);
                  break;
                default:
                  console.warn("Unknown Status");
              }
            }} /* TODO: cada callback destes, deve chamar as ações apropriadas */
            onPress2={async () => {
              let index = data.indexOf(selectedCard);
              switch (cardState) {
                case ExecutionStatus.Uninitialized:
                  console.log("Botao 2, Uninitialized");
                  await timerFunctions.cancelExecution(index);
                  await localStorage.removeCard(index);
                  if (data.length <= index) {
                    index = data.length - 1;
                  }
                  setSelectedCard(data[index]);
                  break;
                case ExecutionStatus.Initialized:
                  console.log("Botao 2, Initialized");
                  await timerFunctions.cancelExecution(index);
                  await localStorage.removeCard(index);
                  if (data.length <= index) {
                    index = data.length - 1;
                  }
                  setSelectedCard(data[index]);
                  break;
                case ExecutionStatus.Paused:
                  console.log("Botao 2, Paused");
                  await timerFunctions.initializeExecution(index);
                  setCardState(ExecutionStatus.Initialized);
                  break;
                default:
                  console.warn("Unknown Status");
              }
            }}
            onPress3={async () => {
              let index = data.indexOf(selectedCard);
              switch (cardState) {
                case ExecutionStatus.Paused:
                  console.log("Botao 3, Paused");
                  await timerFunctions.cancelExecution(index);
                  await localStorage.removeCard(index);
                  if (data.length <= index) {
                    index = data.length - 1;
                  }
                  setSelectedCard(data[index]);
                  break;
                default:
                  console.warn("Unknown Status");
              }
            }}
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
