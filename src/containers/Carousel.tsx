import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { CardRow } from "../components";
import { Card } from "../services/types";
import colors from "../utils/colors";

export type Props = {
  data: Card[] | undefined;
  onPress: (card: Card, index: number) => void;
};

const Carousel: React.FC<Props> = ({ data, onPress }) => {
  return (
    <View style={styles.carouselStyle}>
      <ScrollView>
        <View>
          <CardRow data={data} onPress={onPress} />
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
