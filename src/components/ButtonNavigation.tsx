import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  View,
  TouchableHighlight,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../utils/colors";
import sizes from "../utils/sizes";

export interface Props extends TouchableOpacityProps {
  type: "forward" | "back";
}

const ButtonNavigation: React.FC<Props> = ({ type, ...props }) => {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <View style={styles.content}>
        {type === "forward" && (
          <Text style={styles.text}>
            Próximo&nbsp;&nbsp;
            <Icon style={styles.icon} name="ios-arrow-forward" />
          </Text>
        )}

        {type === "back" && (
          <Text style={styles.text}>
            <Icon style={styles.icon} name="ios-arrow-back" />
            &nbsp;&nbsp;Anterior
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  content: {
    flexDirection: "row",
  },
  icon: {
    color: colors.text.primary,
    fontSize: sizes.headline.h1,
  },
  text: {
    color: colors.text.primary,
    fontSize: sizes.buttonText.main,
    fontWeight: "500",
  },
});

export default ButtonNavigation;
