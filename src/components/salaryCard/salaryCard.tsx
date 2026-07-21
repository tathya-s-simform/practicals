import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import { styles } from "./salaryCardStyles";

export type SalaryCardProps = {
  heading: string;
  icon?: ReactNode;
  children?: ReactNode;
};
const SalaryCard = ({ heading, icon, children }: SalaryCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {icon}
        <Text style={styles.heading}>{heading}</Text>
      </View>
      {children}
    </View>
  );
};

export default SalaryCard;
