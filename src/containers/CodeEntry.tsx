import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { InputCode } from "../components";

declare type onChangeType = { (value: string): void };
declare type onCompleteType = { (value: string): void };

export interface Props {
  onChange?: onChangeType;
  onComplete?: onCompleteType;
}

const CodeEntry: React.FC<Props> = ({ onChange, onComplete }) => {
  const inputFocus2 = useRef(React.createRef());
  const inputFocus3 = useRef(React.createRef());
  const inputFocus4 = useRef(React.createRef());
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [value4, setValue4] = useState("");

  useEffect(() => {
    if (value1.trim() && value2.trim() && value3.trim() && value4.trim()) {
      const value = `${value1}${value2}${value3}${value4}`;
      if (onComplete) onComplete(value);
    } else if (onComplete) onComplete("");
  });

  const handleTextChange = (inputId: number, key: string) => {
    switch (inputId) {
      case 1:
        setValue1(key);
        inputFocus2.current.focus();
        break;
      case 2:
        setValue2(key);
        inputFocus3.current.focus();
        break;
      case 3:
        setValue3(key);
        inputFocus4.current.focus();
        break;
      case 4:
        setValue4(key);
        break;
      default:
        break;
    }

    if (onChange) onChange(key);
  };

  return (
    <View style={styles.container}>
      <InputCode autoFocus onChangeText={(key) => handleTextChange(1, key)} />
      <InputCode
        onChangeText={(key) => handleTextChange(2, key)}
        ref={inputFocus2}
      />
      <InputCode
        onChangeText={(key) => handleTextChange(3, key)}
        ref={inputFocus3}
      />
      <InputCode
        onChangeText={(key) => handleTextChange(4, key)}
        ref={inputFocus4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 80,
  },
});

export default CodeEntry;
