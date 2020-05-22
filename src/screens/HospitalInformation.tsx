import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import * as localStorage from "../services/localStorage";
import colors from "../utils/colors";
import {
  ButtonPrimary,
  ButtonSecundary,
  ButtonExecutions,
} from "../components";

export interface ScreenProps {
  navigation: StackNavigationProp<any, any>;
  route?: any;
}

const HospitalInformation: React.FC<ScreenProps> = ({ navigation }) => {
  const [hospitalName, setHospitalName] = useState("Hospital não nomeado");
  const [permission, setPermission] = useState("");

  useEffect(() => {
    (async () => {
      const { institution } = await localStorage.getData();
      setHospitalName(institution?.name ?? "Hospital não nomeado");

      const auth = await localStorage.getAuth();
      setPermission(auth.permission);
    })();
  }, []);

  const handleBack = () => {
    localStorage.clear();
    navigation.reset({ index: 0, routes: [{ name: "HospitalCode" }] });
  };

  const mainButtonAction = async () => {
    if (permission === "time-tracking") {
      const { role } = await localStorage.getPreferences();
      if (role) {
        navigation.navigate("SelectPatient");
      } else {
        navigation.navigate("ChooseRole");
      }
    } else {
      console.warn("TODO: navigate to adminTechnology screen");
      // navigation.navigate('adminTechnology');
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.main}
      >
        <View style={styles.main}>
          <View style={[styles.image, styles.headerContainer]}>
            <Image
              style={styles.image}
              source={require("../assets/logo-SVG.png")}
            />
          </View>
          <View style={styles.imageTime}>
            <Image
              style={styles.imageTime}
              source={require("../assets/time-SVG.png")}
            />
          </View>
          <Text style={styles.textHospital}>{hospitalName}</Text>
          <Text style={styles.text}>
            Coleta de tempo de atividades hospitalares
          </Text>
          <View style={styles.iniciateButton}>
            <ButtonPrimary
              title={
                permission === "time-tracking"
                  ? "Iniciar Contagem"
                  : "Tecnologias"
              }
              onPress={mainButtonAction}
            />
          </View>
          <View style={styles.variableButton}>
            <ButtonSecundary
              style={styles.variableButton}
              title={
                permission === "time-tracking"
                  ? "Consultar Relatórios"
                  : "Exportar Relatório"
              }
              onPress={() => "nothingyet"}
            />
          </View>

          <View style={styles.variableButton}>
            {/* TODO: botões de execução estão aqui somente para teste */}
            <ButtonExecutions
              onPress={() => "nothingyet"}
              action="start"
              text="INICIAR"
            />
            <ButtonExecutions
              onPress={() => "nothingyet"}
              action="stop"
              text="PARAR"
            />
            <ButtonExecutions
              onPress={() => "nothingyet"}
              action="finish"
              text="CONCLUIR E SALVAR"
            />
            <ButtonExecutions
              onPress={() => "nothingyet"}
              action="restart"
              text="RETOMAR CONTAGEM"
            />
            <ButtonExecutions
              onPress={() => "nothingyet"}
              action="cancel"
              text="CANCELAR"
            />
          </View>
          <View>
            <TouchableOpacity style={styles.outButton} onPress={handleBack}>
              <Text style={styles.outButton}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    elevation: 20,
  },
  image: {
    alignItems: "flex-start",
    backgroundColor: colors.theme.primary,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: "center",
    marginBottom: 20,
    paddingLeft: 20,
  },
  imageTime: {
    alignItems: "flex-end",
    elevation: 20,
    justifyContent: "center",
    marginBottom: 15,
    marginTop: -35,
    paddingRight: 15,
    position: "relative",
  },
  iniciateButton: {
    alignContent: "center",
    justifyContent: "center",
    paddingBottom: 10,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  main: {
    backgroundColor: colors.basic.background,
    flexDirection: "column",
    flex: 6,
    minHeight: Dimensions.get("window").height,
    minWidth: Dimensions.get("window").width,
  },
  outButton: {
    alignContent: "center",
    alignItems: "center",
    color: colors.theme.primary,
    fontSize: 16,
    justifyContent: "center",
    paddingBottom: 20,
  },
  text: {
    color: colors.text.secondary,
    fontSize: 15,
    paddingHorizontal: 16,
    textAlign: "center",
  },
  textHospital: {
    color: colors.text.primary,
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 1,
    paddingHorizontal: 16,
    textAlign: "center",
  },
  variableButton: {
    alignContent: "center",
    paddingBottom: 60,
    paddingHorizontal: 16,
  },
});

export default HospitalInformation;
