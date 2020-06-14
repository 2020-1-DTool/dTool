import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
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
  const [data, setData] = useState([
    {
      activity: "",
      minimumDuration: 1,
      medianDuration: 2,
      maximumDuration: 3,
    },
  ] as Metrics[]);
  const [index, setIndex] = useState(0 as number);

  useEffect(() => {
    (async () => {
      const prefs = await getPreferences();
      let { role, technology } = prefs;

      if (!role || !technology) {
        const session = await getSession();
        if (!role) {
          let aux = session.role;
          role = aux;
        }
        if (!technology) {
          let aux = session.technology;
          technology = aux;
        }
        if (!role) {
          navigation.navigate("ChooseRole", { isForReports: true });
        }
      }
      const reports = await getReports(technology, role);
      const metrics = reports.map((report) => {
        return {
          activity: report.activity,
          minimumDuration: report.minimumDuration,
          medianDuration: report.medianDuration,
          maximumDuration: report.maximumDuration,
        };
      }) as Metrics[];
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
      <ScrollView>
        <View>
          <View>
            <Text style={styles.textSummary}>
              Abaixo, é possível verificar algumas das métricas que já estão
              sendo calculadas a partir das cronometragens efetuadas até o
              momento.
            </Text>
          </View>
          <View>
            <Text style={styles.textTitle}>
              Métricas de Tempo por Atividade:
            </Text>
            <Report
              title={data ? data[index].activity : ""}
              metrics={
                data
                  ? data[index]
                  : {
                      activity: "",
                      minimumDuration: 1,
                      medianDuration: 2,
                      maximumDuration: 3,
                    }
              }
            />
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignSelf: "flex-end",
    color: colors.text.primary,
    fontSize: sizes.headline.h1,
    paddingHorizontal: 8,
  },
  iconPrevious: {
    alignSelf: "flex-start",
    color: colors.text.primary,
    fontSize: sizes.headline.h1,
    paddingHorizontal: 8,
  },
  textSummary: {
    color: colors.text.primary,
    fontSize: 16,
    // fontWeight: "bold",
    paddingBottom: 10,
    paddingHorizontal: 8,
    paddingTop: 10,
    textAlign: "justify",
  },
  textTitle: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 10,
    paddingHorizontal: 8,
    paddingTop: 10,
    textAlign: "justify",
  },
});

export default ReportsScreen;
