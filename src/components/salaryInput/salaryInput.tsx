import React from "react";
import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";
import { styles } from "./salaryInputStyles";

export type SalaryInputProps = {
  label: string;
  placeholder?: string;
  required?: boolean;
  onChangeText: (text: string) => void;
  value: string;
  keyboardInputType?: KeyboardTypeOptions;
};
const SalaryInput = ({
  label,
  placeholder,
  required,
  onChangeText,
  value,
  keyboardInputType = "numeric",
}: SalaryInputProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelView}>
        <Text style={styles.label}>{label}</Text>
        {required && <Text style={styles.star}>*</Text>}
      </View>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardInputType}
      />
    </View>
  );
};

export default SalaryInput;
