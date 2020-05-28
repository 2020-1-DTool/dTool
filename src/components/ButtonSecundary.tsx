import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from "react-native";
import colors from "../utils/colors";
import sizes from "../utils/sizes";

export interface Props extends TouchableOpacityProps {
  disabled?: boolean;
  title: string;
}

const ButtonSecundary: React.FC<Props> = ({ disabled, title, ...props }) => {
  const buttonStyle = disabled ? styles.buttonDisabled : styles.button;
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      style={[styles.base, buttonStyle]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderColor: colors.theme.primary,
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: "center",
    minHeight: 45,
  },
  button: {
    backgroundColor: colors.basic.background,
  },
  buttonDisabled: {
    backgroundColor: colors.basic.background,
  },
  text: {
    alignSelf: "center",
    color: colors.theme.primary,
    fontSize: sizes.buttonText.main,
    fontWeight: "600",
  },
});

export default ButtonSecundary;
