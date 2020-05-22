import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from "react-native";
import colors from "../utils/colors";
import sizes from "../utils/sizes";
import Icon from "react-native-vector-icons/MaterialIcons";

export interface Props extends TouchableOpacityProps {
  disabled?: boolean;
  text: string;
  action: string;
}

const ButtonExecutions: React.FC<Props> = ({
  disabled,
  text,
  action,
  ...props
}) => {
  let iconName = "";

  switch (action) {
    case "start":
      iconName = "play-circle-outline";
      break;
    case "stop":
      iconName = "pause-circle-outline";
      break;
    case "cancel":
      iconName = "delete";
      break;
    case "finish":
      iconName = "save";
      break;
    case "restart":
      iconName = "play-circle-outline";
      break;
    default:
      break;
  }

  const buttonStyle = [
    styles.base,
    action === "start" && styles.start,
    action === "stop" && styles.stop,
    action === "cancel" && styles.cancel,
    action === "finish" && styles.finish,
    action === "restart" && styles.restart,
  ];

  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      disabled={disabled}
      style={[styles.base, buttonStyle]}
    >
      <Text style={styles.text}>{text}</Text>
      <Icon name={iconName} size={24} color={colors.basic.white} style={styles.icon} />
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
  cancel: {
    backgroundColor: colors.theme.failure,
  },
  finish: {
    backgroundColor: colors.theme.primary,
  },
  icon: {
    position: "absolute",
    right: 16,
  },
  restart: {
    backgroundColor: colors.text.header,
  },
  start: {
    backgroundColor: colors.theme.primary,
  },
  stop: {
    backgroundColor: colors.theme.accent,
  },
  text: {
    color: colors.basic.white,
    fontSize: sizes.buttonText.main,
    fontWeight: "600",
    position: "absolute",
    left: 16,
  }
});

export default ButtonExecutions;
