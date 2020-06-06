import React from "react";
import { BarChart } from "react-native-chart-kit";
import { SafeAreaView, View, Text, Dimensions, StyleSheet } from "react-native";
import { ButtonNavigation } from "../components";
import colors from "../utils/colors";
import sizes from "../utils/sizes";

const ReportsScreen: React.FC = () => {
  const data = {
    labels: ["Menor", "Mediana", "Maior"],
    datasets: [
      {
        data: [10, 15, 26],
      },
    ],
  };

  return (
    <SafeAreaView>
      <View>
        <View>
          <Text style={styles.text}>
            Ontem, foram executadas 42 atividades em 15 processos, com um tempo
            de trabalho de 205 horas.
          </Text>
        </View>
        <View>
          <Text style={styles.text}>Atividades mais frequentes:</Text>
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
              Dimensions.get("window").height / 2
            }
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
                alignSelf: "center",
                paddingTop: 40,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            showBarTops
          />
        </View>
        <ButtonNavigation
          title="Próximo"
          iconName="ios-arrow-forward"
          style={styles.icon}
        />
        <ButtonNavigation
          title="Anterior"
          iconName="ios-arrow-back"
          style={styles.iconAnterior}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignSelf: "flex-end",
    color: colors.text.primary,
    fontSize: sizes.headline.h1,
  },
  iconAnterior: {
    alignSelf: "flex-start",
    color: colors.text.primary,
    fontSize: sizes.headline.h1,
  },
  text: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 8,
    textAlign: "justify",
  },
});

export default ReportsScreen;
