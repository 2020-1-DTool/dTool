import React, { useState, useEffect, useLayoutEffect } from "react";
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

  useEffect(() => {
    (async () => {
      console.log("CarouselScreen.tsx blablabla");
      const responseCard = await localStorage.getSession();
      setRole(responseCard?.role?.toString() || "");
      let strComplete = await localStorage.getCards();
      let complete: Card[];
      let dataCard: Card;
      if(strComplete != null){
      complete= JSON.parse(strComplete);
      dataCard = {
        patient: "DDD",
        activity: "BBB",
        role: "CCC",
        time: "00:00:00",
      };
      //complete.push(dataCard);
      
      complete.push(dataCard);
    }
      else {
        dataCard = {
          patient: "AAA",
          activity: "BBB",
          role: "CCC",
          time: "00:00:00",
        };
        //complete.push(dataCard);
        complete= [dataCard];
        console.log("CarouselScreen.tsx Entrou if");
      } 
        //complete.push(dataCard);
        
      //let complete: Card[] = [{patient: 1, activity:2, role:2, time:"Teste"}];
      await localStorage.addCard(dataCard);
      setData(complete);
    })();
  }, []);
  /*  useEffect(() => {
    async function load(){
      console.log("CarouselScreen.tsx blablabla");
      const responseCard = await localStorage.getSession();
      setRole(responseCard?.role?.toString() || "");
      //let complete: Card[] = data;
      let carta: Card = { patient: "1", activity: "2", role: "2", time: "Teste" };
      let complete: Card[] = [carta];
      let tam = complete.length || 1;
      console.log(complete);
      /*if (( complete.length == 0 )||
        (patient &&
        activity &&
        complete[tam - 1]?.patient !== patient &&
        complete[tam - 1]?.activity !== activity)
      ) {
        let dataCard: Card = {
          patient: "AAA",
          activity:"BBB",
          role: "CCC",
          time: "00:00:00",
        };
        complete.push(dataCard);
        console.log("CarouselScreen.tsx Entrou if");
      }
      //let complete: Card[] = [{patient: 1, activity:2, role:2, time:"Teste"}];

      // nitialData.push(initialData);
      console.log("Complete: "+complete);
      return complete;
      //setData(complete);
    }

    let newData = load();
    if(newData != null){
      console.log(newData);
      setData(newData);
    }
   
    //setData(newData);
  });*/
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
