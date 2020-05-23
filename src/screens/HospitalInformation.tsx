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
import { WarningBox } from "../containers";
import { ButtonPrimary, ButtonSecundary } from "../components";

export interface ScreenProps {
  navigation: StackNavigationProp<any, any>;
  route?: any;
}

const HospitalInformation: React.FC<ScreenProps> = ({ navigation }) => {
  const [hospitalName, setHospitalName] = useState("Hospital não nomeado");
  const [permission, setPermission] = useState("");
  const [pendingExecs, setPendingExecs] = useState(false);

  useEffect(() => {
    (async () => {
      const { institution } = await localStorage.getData();
      setHospitalName(institution?.name ?? "Hospital não nomeado");

      const auth = await localStorage.getAuth();
      setPermission(auth.permission);

      const list = localStorage.getFinishedExecutions();
      if (Array.isArray(list) && list.length > 0) {
        setPendingExecs(true);
      }
    })();
  }, []);

  const handleBack = () => {
    console.log("Tentando enviar agora...");

    if (pendingExecs) {
      return;
    }
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
          <View style={styles.textHospital}>
            <Text style={styles.textHospital}>{hospitalName}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.text}>
              Coleta de tempo de atividades hospitalares
            </Text>
          </View>
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
          {/* pendingExecs && <WarningBox handleBack={handleBack} /> */}
          <WarningBox handleBack={handleBack} />
          {/* TODO: só aparecer quando tiver execuções pendentes */}
          <View>
            <TouchableOpacity
              style={
                pendingExecs === true ? styles.fadedButton : styles.outButton
              }
              onPress={handleBack}
            >
              <Text
                style={
                  pendingExecs === true ? styles.fadedButton : styles.outButton
                }
              >
                Sair
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fadedButton: {
    alignContent: "center",
    alignItems: "center",
    color: colors.text.secondary,
    fontSize: 16,
    justifyContent: "center",
    paddingBottom: 20,
  },
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
    paddingLeft: 40,
    paddingRight: 40,
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
    alignContent: "flex-start",
    alignItems: "flex-start",
    color: colors.text.secondary,
    fontSize: 15,
    justifyContent: "center",
    paddingLeft: 20,
  },
  textHospital: {
    alignContent: "center",
    alignItems: "flex-start",
    color: colors.text.primary,
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    paddingBottom: 1,
    paddingLeft: 20,
    textAlign: "center",
  },
  variableButton: {
    alignContent: "center",
    paddingBottom: 60,
    paddingLeft: 40,
    paddingRight: 40,
  },
});

export default HospitalInformation;
