import React, { useState, useLayoutEffect } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";
import { Carousel } from "../containers";
import * as localStorage from "../services/localStorage";
import { Activity, Patient, Card } from "../services/types";
import { CardRow } from "../components";

export interface ScreenProps {
  navigation: StackNavigationProp<any, any>;
  route?: { params: { patientName: string; activityName: string } };
}

let initialData = [
  {
    patient: "RVRS",
    activity: "Medir pressão ",
    time: "00:15:37",
  },
];

const CarouselScreen: React.FC<ScreenProps> = ({ route }) => {
  const [data, setData] = useState([] as Card[]);
  const [role, setRole] = useState("");
  const patient = route?.params?.patientName;
  const activity = route?.params?.activityName;

  useLayoutEffect(() => {
    (async () => {
      console.log("blablabla");
      const responseCard = await localStorage.getSession();
      setRole(responseCard?.role?.toString() || "");
      let complete = data;
      let tam = complete.length || 1;

      if (
        patient &&
        activity &&
        complete[tam - 1]?.patient !== patient &&
        complete[tam - 1]?.activity !== activity
      ) {
        let dataCard = {
          patient,
          activity,
          role,
          time: "00:00:00",
        };
        complete.push(dataCard);
      }

      // nitialData.push(initialData);

      setData(complete);
    })();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.body}>
        <Carousel data={data} />
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

export default CarouselScreen;
