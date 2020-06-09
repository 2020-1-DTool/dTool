import React, { useLayoutEffect } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { connect } from "react-redux";

import { StackNavigationProp } from "@react-navigation/stack";

import {
  createExecution,
  initializeExecution,
  cancelExecution,
  pauseExecution,
  finishExecution,
} from "../services/timerFunction";

import * as executionActions from "../store/actions/execution";
import { Carousel, CardDescription } from "../containers";
import * as localStorage from "../services/localStorage";
import {
  Card as CardType,
  ExecutionStatus,
  CardExecutionType,
} from "../services/types";
import colors from "../utils/colors";

export interface ScreenProps {
  addCard: (item: CardType[]) => void;
  data: CardType[];
  navigation: StackNavigationProp<any, any>;
  removeCard: (index: number) => void;
  selectedCardIndex: number;
  setCardExecutionSate: (newCardExec: ExecutionStatus, index: number) => void;
  route?: {
    params: {
      patientId: string;
      activityName: string;
      activityId: number;
    };
  };
}

const CarouselScreen: React.FC<ScreenProps> = ({
  addCard,
  data,
  navigation,
  removeCard,
  setCardExecutionSate,
  selectedCardIndex,
  route,
}) => {
  const activity = route?.params?.activityName;
  const activityId = route?.params?.activityId;
  const patientId = route?.params?.patientId;

  useLayoutEffect(() => {
    (async () => {
      const sessionCardResponse = await localStorage.getSession();
      const preferencesCardResponse = await localStorage.getPreferences();
      const { roleName, role } =
        sessionCardResponse! || preferencesCardResponse!;

      const currentTech = sessionCardResponse?.technology?.toString();

      let strComplete = await localStorage.getCards();
      let complete: CardType[] | undefined;
      let newCard: CardType;
      let patient: any;

      if (patientId)
        patient = (await localStorage.getPatient(patientId)) || {
          id: "",
          name: "",
          sex: "",
        };

      newCard = {
        patient,
        activity,
        role: roleName,
        technology: currentTech,
        time: "00:00:00",
        // ao inserir uma atividade nova, ela é sempre `uninitialized`
        executionState: ExecutionStatus.Uninitialized,
      };

      if (strComplete) {
        complete = strComplete;

        // se é uma nova execução (recebeu patientId por parâmetro), deve inserir no local storage e no carrosel
        if (patientId) {
          const dataCardInfo: CardExecutionType = {
            idPatient: newCard?.patient?.id,
            activity: activityId,
            role,
          };

          complete.unshift(newCard);
          await createExecution(dataCardInfo);
          await localStorage.addCard(newCard);
          addCard(complete);
        } else if (complete.length) {
          // se são somente os dados do local storage, deve adicionar somente ao carrosel
          addCard(complete);
        }
      }

      if (!complete) {
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
      }
    })();
  }, []);

  const updateCardExecutionState = async (
    newExecutionState: ExecutionStatus
  ) => {
    const updatedCard = data[selectedCardIndex];
    updatedCard.executionState = newExecutionState;
    await localStorage.setCard(updatedCard, selectedCardIndex);
  };

  const removeCardActions = async () => {
    // removendo os cards da lista do carrosel e do redux state
    await localStorage.removeCard(selectedCardIndex);
    removeCard(selectedCardIndex);

    // navega para home, se todos os cards em execução foram removidos ou finalizados
    const cards = await localStorage.getCards();

    if (cards.length === 0) {
      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    }
  };

  const handlePress1 = async () => {
    switch (data[selectedCardIndex].executionState) {
      case ExecutionStatus.Uninitialized:
        await initializeExecution(selectedCardIndex);
        await updateCardExecutionState(ExecutionStatus.Initialized);
        setCardExecutionSate(ExecutionStatus.Initialized, selectedCardIndex);
        break;
      case ExecutionStatus.Initialized:
        await pauseExecution(selectedCardIndex);
        await updateCardExecutionState(ExecutionStatus.Paused);
        setCardExecutionSate(ExecutionStatus.Paused, selectedCardIndex);
        break;
      case ExecutionStatus.Paused:
        await finishExecution(selectedCardIndex);
        await removeCardActions();
        break;
      default:
        break;
    }
  };

  const handlePress2 = async () => {
    if (data[selectedCardIndex].executionState !== ExecutionStatus.Paused) {
      const removed = await cancelExecution(selectedCardIndex);
      if (removed) await removeCardActions();
    } else {
      await initializeExecution(selectedCardIndex);
      await updateCardExecutionState(ExecutionStatus.Initialized);
      setCardExecutionSate(ExecutionStatus.Initialized, selectedCardIndex);
    }
  };

  const handlePress3 = async () => {
    const removed = await cancelExecution(selectedCardIndex);
    if (removed) await removeCardActions();
  };

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.body}>
          <Carousel />
          <CardDescription
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

const mapStateToProps = (state: {
  execution: { data: CardType[]; selectedCardIndex: number };
}) => ({
  data: state.execution.data,
  selectedCardIndex: state.execution.selectedCardIndex,
});

const mapDispatchToProps = (
  dispatch: (arg0: {
    type: string;
    cards?: CardType[];
    newExecState?: ExecutionStatus;
    index?: number;
  }) => any
) => ({
  addCard: (items: CardType[]) => dispatch(executionActions.addCard(items)),
  removeCard: (index: number) => dispatch(executionActions.removeCard(index)),
  setCardExecutionSate: (newExecState: ExecutionStatus, index: number) =>
    dispatch(executionActions.setCardExecutionSate(newExecState, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CarouselScreen);
