import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { CardRow } from "../components";
import colors from "../utils/colors";

let initialData = [
  {
    id: 1,
    patient: "RVRS",
    title: "Medir pressão ",
    time: "00:15:37",
  },
  {
    id: 2,
    patient: "Iniciais",
    title: "Conferir dados cadastrais ",
    time: "00:15:37",
  },
  {
    id: 3,
    patient: "Iniciais",
    title: "Trocar roupa de cama ",
    time: "00:15:37",
  },
  {
    id: 4,
    patient: "Iniciais",
    title: "Conferir dados cadastrais ",
    time: "00:15:37",
  },
  {
    id: 5,
    patient: "Iniciais",
    title: "Conferir dados cadastrais ",
    time: "00:15:37",
  },
  {
    id: 6,
    patient: "Iniciais",
    title: "Conferir dados cadastrais ",
    time: "00:15:37",
  },
];

const Carousel: React.FC = () => {
  const [data] = useState(initialData);
  return (
    <View style={styles.carouselStyle}>
      <ScrollView>
        <View>
          <CardRow data={data} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselStyle: {
    alignItems: "center",
    backgroundColor: colors.basic.backgroundHighlight,
    flexDirection: "row",
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    padding: 10,
  },
});

export default Carousel;
