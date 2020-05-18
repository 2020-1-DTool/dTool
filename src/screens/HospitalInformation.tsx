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
  ButtonMultifunction,
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
      // TODO: ir para tela apropriada de acordo com permissão (listagem de tecnologias ou de hospitais)
      console.warn(`permissão ${permission}`);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.main}
      >
        <View style={styles.main}>
          <View style={styles.image}>
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
              title="Iniciar Contagem"
              onPress={mainButtonAction}
            />
          </View>
          <View style={styles.variableButton}>
            <ButtonSecundary
              style={styles.variableButton}
              title="Consultar Relatórios"
              onPress={() => "nothingyet"}
            />
          </View>
          <View style={styles.variableButton}>
            <ButtonMultifunction
              //style={styles.variableButton}
              onPress={() => "nothingyet"}
              action="start"
              text="INICIAR"
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
  image: {
    alignItems: "flex-start",
    backgroundColor: colors.theme.primary,
    justifyContent: "center",
    marginBottom: 20,
    paddingLeft: 20,
  },
  imageTime: {
    alignItems: "flex-end",
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
