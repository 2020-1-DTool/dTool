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
  text: string;
  action: string;
}

const ButtonMultifunction: React.FC<Props> = ({
  disabled,
  text,
  action,
  ...props
}) => {
  const iconSource = [
    action === "start" && "../assets/start.png",
    action === "stop" && "../assets/stop.png",
  ];
  const buttonStyle = [
    styles.base,
    action === "start" && styles.start,
    action === "stop" && styles.stop,
  ];
  // const buttonStyle = disabled ? styles.buttonDisabled : styles.button;
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      disabled={disabled}
      style={[styles.base, buttonStyle]}
    >
      <Text style={styles.text}>{text}</Text>
      <Image style={styles.icon} source={require(iconSource)} />
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
  //button: {
  //  backgroundColor: colors.theme.primary,
  //},
  //buttonDisabled: {
  //  backgroundColor: colors.basic.separator,
  //},
  text: {
    color: "black", //colors.theme.primary,
    fontSize: sizes.buttonText.main,
    fontWeight: "600",
    position: "absolute",
    left: 16,
  },
  icon: {
    position: "absolute",
    right: 16,
  },
  start: {
    backgroundColor: colors.theme.primary,
  },
  stop: {
    backgroundColor: "#FF9933",
  },
  cancel: {
    backgroundColor: "#CC0000",
  },
  finish: {
    backgroundColor: colors.theme.primary,
  },
  restart: {
    backgroundColor: "#2D2D2D",
  },
});

export default ButtonMultifunction;
