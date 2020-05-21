import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as localStorage from "../../services/localStorage";
import colors from "../../utils/colors";
import { TechnologyList } from "../../containers";
import { ButtonPlus } from "../../components";
import { Technology } from "../../services/types";

export interface ScreenProps {
  storageResult: Array<Record<string, any>>;
  navigation: StackNavigationProp<any, any>;
}

const ListTechnology: React.FC<ScreenProps> = ({ navigation }) => {
  const [data, setData] = useState([] as Technology[]);

  useEffect(() => {
    (async () => {
      const data = await localStorage.getData();
      setData(data.technologies ?? []);
    })();
  }, []);

  const eraseTechology = async (index: number) => {
    let currentList = await localStorage.removeTechnology(index);
    if (currentList) {
      currentList = JSON.parse(currentList);
      setData(currentList);
    }
    return true;
  };

  const handleListPress = async (item: Technology) => {
    console.log("selecionado: ", item);
    navigation.navigate("ChooseActivity", { technology: item });
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <View style={styles.body}>
          <View style={styles.main}>
            <TechnologyList
              data={data ?? []}
              onPressList={(item) => handleListPress(item)}
              onPressTrashIcon={(index) => eraseTechology(index)}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonPlus}>
        <ButtonPlus
          onPress={() => navigation.navigate("AddPatient")}
          style={styles.iconPlus}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    minHeight: Dimensions.get("window").height,
  },
  buttonPlus: {
    bottom: -70,
    position: "absolute",
    right: 50,
  },
  iconPlus: {
    alignSelf: "flex-end",
  },
  main: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  scrollView: {
    backgroundColor: colors.basic.background,
  },
});

export default ListTechnology;
