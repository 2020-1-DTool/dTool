import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, Dimensions } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Metrics } from "../services/types";
import { getSession, getPreferences } from "../services/localStorage";
import { ButtonNavigation, Report } from "../components";
import { getReports } from "../services/appService";
import colors from "../utils/colors";
import sizes from "../utils/sizes";

export interface ScreenProps {
  navigation: StackNavigationProp<any, any>;
}

const ReportsScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const [data, setData] = useState([] as Metrics[]);
  const [index, setIndex] = useState(0 as number);

  useEffect(() => {
    (async () => {
      const prefs = await getPreferences();
      let { role, technology } = prefs;

      if (!role || !technology) {
        const session = await getSession();
        if (!role) {
          role = session.role;
        }
        if (!technology) {
          technology = session.technology;
        }
        if (!role) {
          navigation.navigate("ChooseRole", { isForReports: true });
        }
        if (!technology) {
          navigation.navigate("ChooseTechnology");
        }
      }
      console.log(role); // TODO remover
      console.log(technology); // TODO remover
      const reports = await getReports(technology, role);
      console.log(reports); // TODO remover
      const metrics = reports.map((report) => {
        return {
          activity: report.activity,
          minimumDuration: report.minimumDuration,
          medianDuration: report.medianDuration,
          maximumDuration: report.maximumDuration,
        };
      });
      setData(metrics);
    })();
  }, []);

  const handlePressPrevious = () => {
    if (index === 0) {
      setIndex(data.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  const handlePressNext = () => {
    if (index === data.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <View>
          <Text style={styles.text}>
            Abaixo, é possível verificar algumas das métricas que já estão sendo
            calculadas a partir das cronometragens efetuadas até o momento.
          </Text>
        </View>
        <View>
          <Text style={styles.text}>Métricas por Atividade:</Text>
        </View>
        <Report title={data[index].activity} metrics={data[index]} />
        <View style={styles.body}>
          <ButtonNavigation
            title="Anterior"
            iconName="ios-arrow-back"
            style={styles.iconPrevious}
            onPress={handlePressPrevious}
          />
          <ButtonNavigation
            title="Próximo"
            iconName="ios-arrow-forward"
            style={styles.icon}
            onPress={handlePressNext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    minHeight: Dimensions.get("window").height,
  },
  icon: {
    alignSelf: "flex-end",
    color: colors.text.primary,
    fontSize: sizes.headline.h1,
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
