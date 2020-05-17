import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { CardRow, ButtonPlus } from "../components";
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
  const [data, setData] = useState(initialData);

  const handleChange = () => {
    let currentData = [...data];

    let newData = {
      id: currentData.length + 1,
      patient: "BCM",
      title: `Consulta ${currentData.length + 1}`,
      time: "00:15:31",
    };

    currentData.unshift(newData);
    return setData(currentData);
  };

  return (
    <View style={styles.carouselStyle}>
      <ButtonPlus style={styles.buttonPlus} onPress={() => handleChange()} />
      <ScrollView>
        <View>
          <CardRow data={data} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonPlus: { bottom: 0, position: "relative", right: 0 },
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
