import React, { useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  createExecution,
  timeToString,
  initializeExecution,
  cancelExecution,
  pauseExecution,
  finishExecution,
  updateAll,
} from "../services/timerFunction";
import { ButtonPrimary, InputText, ButtonExecutions } from "../components";

export interface ScreenProps {
  navigation: StackNavigationProp<any, any>;
}

const EmptyScreen: React.FC<ScreenProps> = () => {
  const cardInfo = {
    idPatient: 1234,
    role: 1,
    activity: 42,
  };

  const testTime = 100;
  const [position, setPosition] = useState("0");

  return (
    <SafeAreaView>
      <View style={styles.body}>
        <Text>Você chegou, mas não tem nada aqui</Text>
        <Text>
          Use esta tela como teste, como base para você criar outra, mas NÃO
          apague ela, mais alguém pode precisar. Quando estiver acabando o
          projeto, removeremos
        </Text>
        <InputText
          autoFocus
          title="Posição Array"
          onChangeText={(key) => setPosition(key)}
          value={position}
        />
        <ButtonPrimary
          title="Adiciona execução"
          onPress={() => {
            createExecution(cardInfo);
          }} // remover modificação futuramente, apenas para testes
        />
        <ButtonPrimary
          title="UpdateAll"
          onPress={() => {
            updateAll();
          }} // remover modificação futuramente, apenas para testes
        />
        <ButtonPrimary
          title="TimeToStringTest"
          onPress={() => {
            timeToString(testTime);
          }} // remover modificação futuramente, apenas para testes
        />
      </View>
      <View style={styles.variableButton}>
        {/* TODO: botões de execução estão aqui somente para teste */}
        <ButtonExecutions
          onPress={() => {
            initializeExecution(position);
          }} // remover modificação futuramente, apenas para testes
          action="start"
          text="INICIAR"
        />
        <ButtonExecutions
          onPress={() => {
            pauseExecution(position);
          }} // remover modificação futuramente, apenas para testes
          action="stop"
          text="PARAR"
        />
        <ButtonExecutions
          onPress={() => {
            finishExecution(position);
          }} // remover modificação futuramente, apenas para testes
          action="finish"
          text="CONCLUIR E SALVAR"
        />
        <ButtonExecutions
          onPress={() => "nothingyet"}
          action="restart"
          text="RETOMAR CONTAGEM"
        />
        <ButtonExecutions
          onPress={() => {
            cancelExecution(position);
          }} // remover modificação futuramente, apenas para testes
          action="cancel"
          text="CANCELAR"
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
  variableButton: {
    alignContent: "center",
    paddingBottom: 60,
    paddingHorizontal: 16,
  },
});

export default EmptyScreen;
