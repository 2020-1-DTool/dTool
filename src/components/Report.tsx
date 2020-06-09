import React from "react";
import { BarChart } from "react-native-chart-kit";
import {
  TouchableOpacityProps,
  StyleSheet,
  View,
  Dimensions,
  Text,
} from "react-native";
import sizes from "../utils/sizes";

export interface Props extends TouchableOpacityProps {
  title: string;
}

const Report: React.FC<Props> = ({ title }) => {
  const data = {
    labels: ["Menor", "Mediana", "Maior"],
    datasets: [
      {
        data: [10, 15, 20],
      },
    ],
  };

  return (
    <View>
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View>
        <BarChart
          data={data}
          width={
            Dimensions.get("window").width -
            Dimensions.get("window").width / 100
          }
          height={
            Dimensions.get("window").height -
            Dimensions.get("window").height / 3
          }
          yAxisLabel=""
          yAxisSuffix="min"
          chartConfig={{
            backgroundColor: "#1CC910",
            backgroundGradientFrom: "#EFF3FF",
            backgroundGradientTo: "#EFEFEF",
            color: (opacity = 1) => `rgba(0, 0, 156, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          showBarTops
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: sizes.buttonText.main,
    textAlign: "center",
  },
});

export default Report;
