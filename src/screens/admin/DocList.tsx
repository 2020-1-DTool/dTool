import React, { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import colors from "../../utils/colors";
import { BasicList, ButtonPlus } from "../../components";

export interface ScreenProps {
  storageResult: Array<Record<string, any>>;
  navigation: StackNavigationProp<any, any>;
}

let initialData = [
  {
    id: 1,
    name: "AVC",
    type: "CSV",
  },
  {
    id: 2,
    name: "LPCO",
    type: "CSV",
  },
  {
    id: 3,
    name: "LPCO",
    type: "CSV",
  },
];

const DocList: React.FC<ScreenProps> = ({ navigation }) => {
  const [data, setData] = useState(initialData);

  const handleListPress = async (item: number) => {
    console.log("selecionado: ", item);
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <View style={styles.body}>
          <View style={styles.main}>
            <BasicList
              docList={data}
              onPress={(item) => handleListPress(item)}
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

export default DocList;
