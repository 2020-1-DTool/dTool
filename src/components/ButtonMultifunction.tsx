import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from "react-native";
import colors from "../utils/colors";
import sizes from "../utils/sizes";
import { Style } from "react-native-material-kit";
import { Image } from "react-native";

export interface Props extends TouchableOpacityProps {
  disabled?: boolean;
  title: string;
  //onPress: Function;
  //onPress?: (index: number) => void;
  style: Style;
  text: string;
  action: string;
}

const ButtonMultifunction: React.FC<Props> = ({
  disabled,
  title,
  //onPress,
  style,
  text,
  action,
  ...props
}) => {
  const buttonStyle = disabled ? styles.buttonDisabled : styles.button;
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      disabled={disabled}
      style={[styles.base, buttonStyle]}
    >
      <Text style={styles.text}>{title}</Text>
      <Image
        style={styles.icon}
        source={require("../assets/" + action + ".png")}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 50,
    minWidth: 328,
    flexDirection: "row",
    position: "relative",
  },
  button: {
    backgroundColor: colors.theme.primary,
  },
  buttonDisabled: {
    backgroundColor: colors.basic.separator,
  },
  text: {
    color: colors.basic.background,
    fontSize: sizes.buttonText.main,
    fontWeight: "600",
    position: "absolute",
    left: 16,
  },
  icon: {
    position: "absolute",
    right: 16,
  },
});

export default ButtonMultifunction;
