import React from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ButtonSecundary } from "../../components";
import colors from "../../utils/colors";
import sizes from "../../utils/sizes";

export interface ScreenProps extends TouchableOpacityProps {
  navigation: StackNavigationProp<any, any>;
}

const AddTechnology: React.FC<ScreenProps> = ({ navigation, ...props }) => {
  return (
    <SafeAreaView>
      <View style={styles.body}>
        <Text style={styles.baseText}>
          Crie um arquivo baseado na{" "}
          <Text style={styles.bold}>documentação</Text> e{" "}
          <Text style={styles.bold}>exemplos</Text> disponíveis e importe para o
          aplicativo, para que seja utilizado na contagem de tempo das
          atividades.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            {...props}
            // TODO: Usar componente "ButtonExecutions" para criacao do botao de "Importar tecnologia"
          >
            <Text>Importar Tecnologia</Text>
          </TouchableOpacity>
          <View style={styles.secondaryButton}>
            <ButtonSecundary title="Exemplos" onPress={() => "nothingyet"} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  baseText: {
    color: colors.text.primary,
    fontSize: sizes.headline.h6,
    paddingBottom: "40%",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: "5%",
    textAlign: "justify",
  },

  body: {
    flex: 1,
    height: Dimensions.get("screen").height,
    justifyContent: "space-between",
    minWidth: Dimensions.get("screen").width,
  },

  bold: {
    fontWeight: "bold",
  },

  buttonContainer: {
    padding: "5%",
  },

  secondaryButton: {
    paddingTop: "4%",
  },
});

export default AddTechnology;
