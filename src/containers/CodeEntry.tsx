import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { InputCode } from '../components';

declare type onChangeType = { (value: string): void };
declare type onCompleteType = { (value: string): void };

export interface Props {
  onChange?: onChangeType;
  onComplete?: onCompleteType;
}

const CodeEntry: React.FC<Props> = ({ onChange, onComplete }) => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');

  useEffect(() => {
    if (value1.trim() && value2.trim() && value3.trim() && value4.trim()) {
      const value = `${value1}${value2}${value3}${value4}`;
      if (onComplete) onComplete(value);
    } else if (onComplete) onComplete('');
  });

  const handleTextChange = (inputId: number, key: string) => {
    switch (inputId) {
      case 1:
        setValue1(key);
        break;
      case 2:
        setValue2(key);
        break;
      case 3:
        setValue3(key);
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
      <InputCode onChangeText={(key) => handleTextChange(2, key)} />
      <InputCode onChangeText={(key) => handleTextChange(3, key)} />
      <InputCode onChangeText={(key) => handleTextChange(4, key)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 80,
  },
});

export default CodeEntry;
