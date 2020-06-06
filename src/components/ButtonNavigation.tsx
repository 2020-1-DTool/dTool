import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../utils/colors";
import sizes from "../utils/sizes";

export interface Props extends TouchableOpacityProps {
  title: string;
  iconName: string;
  style?: ViewStyle;
}

const ButtonNavigation: React.FC<Props> = ({
  title,
  iconName,
  style,
  ...props
}) => {
  const textFormatting = [
    iconName === "ios-arrow-forward" && styles.text,
    iconName === "ios-arrow-back" && styles.textPrevious,
  ];
  return (
    <TouchableOpacity {...props}>
      <View>
        <Icon style={[styles.icon, style]} name={iconName} />
        <Text style={[styles.text, textFormatting]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: colors.text.primary,
    fontSize: sizes.headline.h1,
  },
  text: {
    color: colors.text.primary,
    fontSize: sizes.buttonText.main,
    fontWeight: "500",
    position: "absolute",
    right: 26,
  },
  textPrevious: {
    color: colors.text.primary,
    fontSize: sizes.buttonText.main,
    fontWeight: "500",
    left: 26,
    position: "absolute",
  },
});

export default ButtonNavigation;
