import { Pressable, Text } from "react-native";
import { styles } from "./scoreButtonStyles";

export type ScoreButtonProps = {
  label: string;
  onPress: () => void;
  color?:
    | "lightblue"
    | "lightgreen"
    | "white"
    | "lightorange"
    | "lightred"
    | string;
  textColor?: "blue" | "green" | "white" | "orange" | "red" | string;
};
const ScoreButton = ({
  label,
  color = "white",
  textColor = "blue",
  onPress,
}: ScoreButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: color },
        { borderColor: color === "white" ? "lightgrey" : textColor },
      ]}
    >
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
};

export default ScoreButton;
