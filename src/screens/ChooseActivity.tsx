import React, { useState, useEffect } from "react";
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BasicList, ButtonPrimary, PatientHeader } from "../components";

import colors from "../utils/colors";
import * as localStorage from "../services/localStorage";
import { Activity, Patient } from "../services/types";

export interface ScreenProps {
  navigation: StackNavigationProp<any, any>;
  route?: { params: { pacient: Patient } };
}

const PatientScreen: React.FC<ScreenProps> = ({ navigation, route }) => {
  const [activities, setActivities] = useState([] as Activity[]);
  const patient = route?.params?.pacient;

  useEffect(() => {
    (async () => {
      const savedActivities = await localStorage.getActivities();
      setActivities(savedActivities);
    })();
  }, []);

  const handleListPress = (index: number) => {
    const activ = activities[index];
    Alert.alert(`(${index}) ${activ.name} (${activ.shortName}) selecionado!`);
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <View style={styles.header}>
          <PatientHeader
            patientInitials={patient?.name}
            patientID={patient?.id}
            patientSex={patient?.sex}
          />
        </View>
        <View style={styles.body}>
          <BasicList
            data={activities.map((activity) => activity.name)}
            onPress={handleListPress}
          />
          <ButtonPrimary
            title="Carousel"
            onPress={() => {
              return navigation.navigate("CarouselScreen");
            }} // TODO: remover modificação futuramente, apenas para testes
          />
          <ButtonPrimary
            title="Início"
            onPress={() => {
              return navigation.navigate("Home");
            }} // TODO: remover modificação futuramente, apenas para testes
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    minHeight: Dimensions.get("window").height,
  },
  header: {
    marginBottom: 20,
    marginTop: 20,
  },
  scrollView: {
    backgroundColor: colors.basic.background,
  },
});

export default PatientScreen;
