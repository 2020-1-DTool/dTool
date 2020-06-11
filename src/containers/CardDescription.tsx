import React, { useEffect, useState } from "react";

import { Text, View, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-elements";
import colors from "../utils/colors";
import sizes from "../utils/sizes";
import { ButtonExecutions, ButtonPrimary } from "../components";
import { Card as CardType, ExecutionStatus } from "../services/types";

export interface ScreenProps {
  data?: CardType;
  onPress1: () => void;
  onPress2: () => void;
  onPress3?: () => void;
}

const CardDescription: React.FC<ScreenProps> = ({
  data,
  onPress1,
  onPress2,
  onPress3,
}) => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  let button1 = "";
  let button2 = "";
  let button3 = "";
  let buttonText1 = "";
  let buttonText2 = "";
  let buttonText3 = "";

  switch (data?.executionState) {
    case ExecutionStatus.Uninitialized:
      button1 = "start";
      button2 = "cancel";
      buttonText1 = "INICIAR";
      buttonText2 = "REMOVER";
      break;
    case ExecutionStatus.Initialized:
      button1 = "stop";
      button2 = "cancel";
      buttonText1 = "PARAR";
      buttonText2 = "CANCELAR";
      break;
    case ExecutionStatus.Paused:
      button1 = "finish";
      button2 = "restart";
      button3 = "cancel";
      buttonText1 = "CONCLUIR E SALVAR";
      buttonText2 = "RETOMAR CONTAGEM";
      buttonText3 = "CANCELAR";
      break;
    default:
      break;
  }

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime(() => time + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const navigation = useNavigation();

  const getTime = () => {
    const min = (time % 3600) / 60;
    const hour = time / 3600;
    const sec = time % 60;
    const formatHour = Math.floor(hour).toString().padStart(2, "0");
    const formatMin = Math.floor(min).toString().padStart(2, "0");
    const formatSec = sec.toString().padStart(2, "0");
    return `${formatHour}:${formatMin}:${formatSec}`;
  };

  const handlePress1 = () => {
    toggle();
    onPress1();
  };

  const handlePress2 = () => {
    if (isActive) toggle();
    setTime(0);
    onPress2();
  };

  return (
    <Card containerStyle={styles.cardStyle}>
      <View style={styles.container}>
        <View>
          <View style={styles.cardTitle}>
            <Text style={styles.boldText}>{data?.activity}</Text>
          </View>
          <View style={styles.cardInfo}>
            <Image
              style={styles.imagePadding}
              source={require("../assets/profile-carousel.png")}
            />
            <Text style={styles.normalText}>{data?.patient?.name}</Text>
            <Text
              style={styles.patientSubtitle}
            >{` ${data?.patient?.id} | ${data?.patient?.sex}`}</Text>
          </View>
          <View style={styles.cardInfo}>
            <Image
              style={styles.imagePadding}
              source={require("../assets/clock-carousel.png")}
            />
            <Text style={styles.normalText}>{getTime()}</Text>
          </View>
          <View style={styles.cardInfo}>
            <Image
              style={styles.imagePadding}
              source={require("../assets/profile-carousel.png")}
            />
            <Text style={styles.normalText}>{data?.role}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonsWrap}>
        <View style={styles.buttonsCardDescription}>
          <ButtonPrimary
            title="EmptyScreen"
            onPress={() => navigation.navigate("EmptyScreen")}
          />
        </View>
        <View style={styles.buttonsCardDescription}>
          <ButtonExecutions
            onPress={handlePress1}
            action={button1}
            text={buttonText1}
          />
        </View>
        <View style={styles.buttonsCardDescription}>
          <ButtonExecutions
            onPress={handlePress2}
            action={button2}
            text={buttonText2}
          />
        </View>
        <View style={styles.buttonsCardDescription}>
          <ButtonExecutions
            onPress={onPress3}
            action={button3}
            text={buttonText3}
          />
        </View>
      </View>
    </Card>
  );
};

let styles = StyleSheet.create({
  boldText: {
    color: colors.text.primary,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsCardDescription: {
    padding: 7,
  },
  buttonsWrap: {
    flexDirection: "column",
    justifyContent: "flex-end",
    minHeight: "50%",
    width: "100%",
  },
  cardInfo: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  cardStyle: {
    alignItems: "stretch",
    backgroundColor: colors.basic.white,
    borderRadius: 10,
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
  cardTitle: {
    flexDirection: "row",
    justifyContent: "center",
    minHeight: 40,
  },
  container: {
    minHeight: "30%",
  },
  imagePadding: {
    marginRight: 10,
  },
  normalText: {
    color: colors.text.primary,
    fontWeight: "700",
  },
  patientSubtitle: {
    color: colors.text.tertiary,
    fontSize: sizes.buttonText.label,
  },
});

const mapStateToProps = (state: { execution: { selectedCard: CardType } }) => ({
  data: state.execution.selectedCard,
});

export default connect(mapStateToProps)(CardDescription);
