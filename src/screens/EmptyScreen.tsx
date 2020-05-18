import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, View, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { getItem, removeItem } from "../services/localStorage";
import {
  ButtonPrimary,
  GenderSelect,
  InputText,
  ButtonPlus,
} from "../components";

export interface ScreenProps {
  navigation: StackNavigationProp<any, any>;
}

const EmptyScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const eraseRole = async () => {
    await removeItem("@role");
  };

  const eraseTech = async () => {
    await removeItem("@tech");
  };

  const retrieveData = () => {
    retrieveRole();
    retrieveTech();
  };

  const retrieveRole = async () => {
    const savedRole = await getItem("@role");
    if (savedRole) console.warn(savedRole);
  };

  const retrieveTech = async () => {
    const savedTech = await getItem("@tech");
    if (savedTech) console.warn(savedTech);
  };

  const adicionaAtividade = async () => {
    const savedTech = await getItem("@tech");
    const savedRole = await getItem("@role");
    if (savedTech == null) {
      navigation.navigate("ChooseTechnology");
    } else if (savedRole == null) {
      navigation.navigate("ChooseRole");
    } else {
      navigation.navigate("AddPatient");
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.body}>
        <Text>Você chegou, mas não tem nada aqui</Text>
        <Text>
          Use esta tela como teste, como base para você criar outra, mas NÃO
          apague ela, mais alguém pode precisar. Quando estiver acabando o
          projeto, removeremos
        </Text>
        <ButtonPrimary title="Ver valores salvos" onPress={retrieveData} />
        <ButtonPrimary title="Apagar função armazenada" onPress={eraseRole} />
        <ButtonPrimary
          title="Apagar tecnologia armazenada"
          onPress={eraseTech}
        />
        <GenderSelect label="Sexo" onChange={(index) => console.log(index)} />
        <InputText title="Iniciais" placeholder="ABC" />
        <ButtonPrimary
          title="Ir a próxima tela"
          onPress={() => {
            return navigation.navigate("ChooseActivity");
          }} // remover modificação futuramente, apenas para testes
        />
        <ButtonPrimary
          title="Carousel"
          onPress={() => {
            return navigation.navigate("CarouselScreen");
          }} // remover modificação futuramente, apenas para testes
        />
        <ButtonPlus onPress={adicionaAtividade} />
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

export default EmptyScreen;
