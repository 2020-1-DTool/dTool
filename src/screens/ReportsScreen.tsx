import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { ButtonNavigation, Report } from "../components";
import colors from "../utils/colors";
import sizes from "../utils/sizes";

const ReportsScreen: React.FC = () => {
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
        <Report title="Medir pressão" />
        <View>
          <ButtonNavigation
            title="Próximo"
            iconName="ios-arrow-forward"
            style={styles.icon}
            onPress={() => console.warn("onPress1")}
          />
          <ButtonNavigation
            title="Anterior"
            iconName="ios-arrow-back"
            style={styles.iconPrevious}
            onPress={() => console.warn("onPress2")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignSelf: "flex-end",
    color: colors.text.primary,
    fontSize: sizes.headline.h1,
    position: "absolute",
  },
  iconPrevious: {
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
