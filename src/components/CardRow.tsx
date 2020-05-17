import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Card } from "react-native-elements";
import colors from "../utils/colors";
import sizes from "../utils/sizes";

export type itemType = {
  id: number;
  patient: string;
  title: string;
  time: string;
};

export interface ScreenProps {
  data?: itemType[];
}

const CardRow: React.FC<ScreenProps> = ({ data }) => {
  const [selectedCard, setSelectedCard] = useState(0);

  const setBorder = (title: string, key: number) => {
    console.log(title);
    console.log(`Previous sected card ${selectedCard}`);
    setSelectedCard(key);
    console.log(`Current selected card ${key}`);
  };

  return (
    <View>
      <Card containerStyle={styles.cardStyle}>
        <View />
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data?.map((item, key) => (
              <View key={item.id}>
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.viewGeral,
                    selectedCard === key
                      ? styles.borderGreen
                      : styles.borderWhite,
                  ]}
                  onPress={() => setBorder(item.title, key)}
                >
                  <View style={styles.cardTitle}>
                    <Text style={styles.boldText}>{item.title}</Text>
                  </View>
                  <View style={styles.cardInfo}>
                    <Image
                      style={styles.imagePadding}
                      source={require("../assets/profile-carousel.png")}
                    />
                    <Text style={styles.normalText}>{item.patient}</Text>
                  </View>
                  <View style={styles.cardInfo}>
                    <Image
                      style={styles.imagePadding}
                      source={require("../assets/clock-carousel.png")}
                    />
                    <Text style={styles.normalText}>{item.time}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </Card>
    </View>
  );
};

let styles = StyleSheet.create({
  boldText: {
    color: colors.text.primary,
    fontSize: sizes.buttonText.note,
    fontWeight: "bold",
    textAlign: "center",
  },
  borderGreen: {
    borderColor: colors.theme.primary,
    borderWidth: 2.5,
  },
  borderWhite: {
    borderColor: colors.basic.white,
    borderWidth: 2.5,
  },
  cardInfo: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  cardStyle: {
    backgroundColor: colors.basic.backgroundHighlight,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    padding: 10,
  },
  cardTitle: {
    flexDirection: "row",
    justifyContent: "center",
    minHeight: 50,
  },
  imagePadding: {
    marginRight: 10,
  },
  normalText: {
    color: colors.text.primary,
    fontWeight: "600",
  },
  viewGeral: {
    backgroundColor: colors.basic.white,
    borderRadius: 10,
    display: "flex",
    height: 146,
    justifyContent: "center",
    margin: 5,
    padding: 15,
    width: 150,
  },
});

export default CardRow;
