import React from "react";
import { Pressable, Text, ViewStyle } from "react-native";
import { styles } from "./customButtonStyles";

export type CustomButtonProps = {
  title: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  style?: ViewStyle;
  onPress: () => void;
};
const CustomButton = ({
  title,
  variant = "primary",
  disabled = false,
  style,
  onPress,
}: CustomButtonProps) => {
  return (
    <Pressable
      style={[
        variant === "primary"
          ? disabled
            ? [styles.button, styles.disabled]
            : styles.button
          : disabled
          ? [styles.secondaryButton, styles.disabled]
          : styles.secondaryButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          variant === "primary"
            ? styles.buttonText
            : styles.secondaryButtonText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
