import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

import { Card } from "react-native-elements";
import colors from "../utils/colors";

export type itemType = {
  id: number;
  patient: string;
  title: string;
  time: string;
  role?: string;
};

export interface ScreenProps {
  data?: itemType[];
}

const CardDescription: React.FC<ScreenProps> = ({ data }) => {
  return (
    <View>
      <Card containerStyle={styles.cardStyle}>
        <View />
        <View>
          {data?.map((item) => (
            <View key={item.id}>
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
              <View style={styles.cardInfo}>
                <Image
                  style={styles.imagePadding}
                  source={require("../assets/profile-carousel.png")}
                />
                <Text style={styles.normalText}>{item.role}</Text>
              </View>
            </View>
          ))}
        </View>
      </Card>
    </View>
  );
};

let styles = StyleSheet.create({
  boldText: {
    color: colors.text.primary,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardInfo: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  cardStyle: {
    backgroundColor: colors.basic.white,
    borderRadius: 10,
    display: "flex",
    height: 450,
    justifyContent: "flex-start",
    margin: 5,
    padding: 40,
    width: 400,
  },
  cardTitle: {
    flexDirection: "row",
    justifyContent: "center",
    minHeight: 40,
  },
  imagePadding: {
    marginRight: 10,
  },
  normalText: {
    color: colors.text.primary,
    fontWeight: "700",
  },
});

export default CardDescription;
