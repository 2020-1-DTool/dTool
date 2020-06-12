import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { Metrics, Reports } from "src/services/types";
import { ButtonNavigation, Report } from "../components";
import colors from "../utils/colors";
import sizes from "../utils/sizes";

const ReportsScreen: React.FC = () => {
  const [data, setData] = useState([] as Metrics[]);

  useEffect(() => {
    (async () => {
      const reports = [
        {
          activityID: 1,
          activity: "Cirurgia",
          roleID: 1,
          role: "Enfermeiro",
          minimumDuration: 2,
          medianDuration: 5.666666666666667,
          maximumDuration: 16,
          lastUpdate: "2020-06-10T22:45:00.062Z",
        },
        {
          activityID: 2,
          activity: "RaioX",
          roleID: 2,
          role: "Medico",
          minimumDuration: 3.3333333333333335,
          medianDuration: 4.166666666666667,
          maximumDuration: 5,
          lastUpdate: "2020-06-10T22:45:00.053Z",
        },
      ];
      const role = {
        id: 2,
        name: "Medico",
        activities: ["Medir pressão"],
      };
      const metrics = reports
        .filter((report) => {
          return report.roleID === role.id;
        })
        .map((report) => {
          return {
            minimumDuration: report.minimumDuration,
            medianDuration: report.medianDuration,
            maximumDuration: report.maximumDuration,
          };
        });
      setData(metrics);
      console.log(data);
    })();
  }, []);
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
