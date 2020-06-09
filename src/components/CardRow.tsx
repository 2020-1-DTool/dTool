import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";

import { Card } from "react-native-elements";

import * as executionActions from "../store/actions/execution";
import { Card as CardType, ExecutionStatus } from "../services/types";
import colors from "../utils/colors";
import sizes from "../utils/sizes";

export interface ScreenProps {
  data?: CardType[] | undefined;
  selectedCardIndex: number;
  toggleCard: (card: CardType, index: number) => void;
}

const CardRow: React.FC<ScreenProps> = ({
  data,
  selectedCardIndex,
  toggleCard,
}) => {
  const setBorder = (index: number) => {
    console.log(`Previous sected card ${selectedCardIndex}`);
    console.log(`Current selected card ${index}`);
  };

  const handlePress = (item: CardType, index: number) => {
    setBorder(index);
    toggleCard(item, index);
  };

  const getExecutionState = (state: ExecutionStatus) => {
    switch (state) {
      case ExecutionStatus.Uninitialized:
        return "Não iniciado";
      case ExecutionStatus.Initialized:
        return "Cronometrando";
      case ExecutionStatus.Paused:
        return "Pausado";
      default:
        return "Inválido";
    }
  };

  return (
    <View>
      <Card containerStyle={styles.cardStyle}>
        <View />
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data?.map((item, key) => (
              <View key={key}>
                <TouchableOpacity
                  key={item?.patient?.id! + item.activity}
                  style={[
                    styles.viewGeral,
                    selectedCardIndex === key
                      ? styles.borderGreen
                      : styles.borderWhite,
                  ]}
                  onPress={() => handlePress(item, key)}
                >
                  <View style={styles.cardTitle}>
                    <Text style={styles.boldText}>{item.activity}</Text>
                  </View>
                  <View style={styles.cardInfo}>
                    <Image
                      style={styles.imagePadding}
                      source={require("../assets/profile-carousel.png")}
                    />
                    <Text style={styles.normalText}>{item?.patient?.name}</Text>
                  </View>
                  <View style={styles.cardInfo}>
                    <Image
                      style={styles.imagePadding}
                      source={require("../assets/clock-carousel.png")}
                    />
                    <Text style={styles.normalText}>
                      {getExecutionState(item.executionState)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </Card>
    </View>
  );
};

let styles = StyleSheet.create({
  boldText: {
    color: colors.text.primary,
    fontSize: sizes.buttonText.note,
    fontWeight: "bold",
    textAlign: "center",
  },
  borderGreen: {
    borderColor: colors.theme.primary,
    borderWidth: 2.5,
  },
  borderWhite: {
    borderColor: colors.basic.white,
    borderWidth: 2.5,
  },
  cardInfo: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  cardStyle: {
    backgroundColor: colors.basic.backgroundHighlight,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    padding: 10,
  },
  cardTitle: {
    flexDirection: "row",
    justifyContent: "center",
    minHeight: 50,
  },
  imagePadding: {
    marginRight: 10,
  },
  normalText: {
    color: colors.text.primary,
    fontWeight: "600",
  },
  viewGeral: {
    backgroundColor: colors.basic.white,
    borderRadius: 10,
    display: "flex",
    height: 146,
    justifyContent: "center",
    margin: 5,
    padding: 15,
    width: 150,
  },
});

const mapStateToProps = (state: {
  execution: { data: CardType[]; selectedCardIndex: number };
}) => ({
  data: state.execution.data,
  selectedCardIndex: state.execution.selectedCardIndex,
});

const mapDispatchToProps = (
  dispatch: (arg0: { type: string; card: CardType; index: number }) => any
) => ({
  toggleCard: (item: CardType, index: number) =>
    dispatch(executionActions.toggleCard(item, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardRow);
