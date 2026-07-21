import CustomButton from "@/src/components/customButton/customButton";
import SalaryCard from "@/src/components/salaryCard/salaryCard";
import SalaryInput from "@/src/components/salaryInput/salaryInput";
import { PositiveNumberRegex } from "@/src/constants/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export type EarningsType = {
  basicSalary: string;
  hra?: string;
  da?: string;
  specialAllowance?: string;
  bonus?: string;
};
export type DeductionType = {
  pf: string;
  professionalTax: string;
  incomeTax: string;
  otherDeductions?: string;
};
export type RequiredErrorType = {
  name?: string;
  pf?: string;
  professionalTax?: string;
  incomeTax?: string;
  validInput?: string;
  [key: string]: string | undefined;
};

const SalaryCalculator = () => {
  const [name, setName] = useState("");
  const [firstTime, setFirstTime] = useState(true);
  const [earningsDetails, setEarningsDetails] = useState<EarningsType>({
    basicSalary: "",
  });
  const [deductionDetails, setDeductionDetails] = useState<DeductionType>({
    pf: "",
    professionalTax: "",
    incomeTax: "",
  });

  const handleEarningDetails = (key: keyof EarningsType, value: string) => {
    setEarningsDetails((prev) => ({ ...prev, [key]: value }));
  };
  const handleDeductionDetails = (key: keyof DeductionType, value: string) => {
    setDeductionDetails((prev) => ({ ...prev, [key]: value }));
  };

  const validateDetails = () => {
    const error: RequiredErrorType = {};
    if (!name.trim()) {
      error.name = "Name is required!";
    }
    if (!deductionDetails.pf.trim()) {
      error.pf = "PF is required!";
    }
    if (!deductionDetails.professionalTax.trim()) {
      error.professionalTax = "Professional Tax is required!";
    }
    if (!deductionDetails.incomeTax.trim()) {
      error.incomeTax = "Income Tax is required!";
    }
    const keys = Object.keys(earningsDetails) as (keyof EarningsType)[];
    for (let key of keys) {
      if (!PositiveNumberRegex.test(earningsDetails[key] || "")) {
        error[key] = `${key} should be a positive number`;
      }
    }
    if (!PositiveNumberRegex.test(deductionDetails.professionalTax)) {
      error.validInput = "Professional Tax should be a number";
    }
    if (!PositiveNumberRegex.test(deductionDetails.otherDeductions || "")) {
      error.validInput = "Deductions should be a number";
    }
    const pfValue = parseFloat(deductionDetails.pf);
    if (isNaN(pfValue) || pfValue < 0 || pfValue > 100) {
      error.validInput = "PF should be a number between 0 and 100";
    }
    const incomeTaxValue = parseFloat(deductionDetails.incomeTax);
    if (isNaN(incomeTaxValue) || incomeTaxValue < 0 || incomeTaxValue > 100) {
      error.validInput = "Income Tax should be a number between 0 and 100";
    }
    return error;
  };
  const error = validateDetails();
  const containsError = Object.keys(error).length > 0;
  const handleCalculate = () => {
    setFirstTime(false);
  };
  const calculateSummary = () => {
    if (containsError || firstTime) {
      return {
        monthlyGross: 0,
        totalDeductions: 0,
        monthlyNet: 0,
        annualGross: 0,
        annualNet: 0,
      };
    }
    const monthlyGross = Object.entries(earningsDetails).reduce(
      (acc, curr) => acc + Number(curr[1]),
      0
    );
    const totalDeductions =
      (monthlyGross * Number(deductionDetails.pf)) / 100 +
      (monthlyGross * Number(deductionDetails.incomeTax)) / 100 +
      Number(deductionDetails.otherDeductions) +
      Number(deductionDetails.professionalTax);
    const monthlyNet = monthlyGross - totalDeductions;
    const annualGross = monthlyGross * 12;
    const annualNet = monthlyNet * 12;
    return {
      monthlyGross,
      totalDeductions,
      monthlyNet,
      annualGross,
      annualNet,
    };
  };
  const { monthlyGross, totalDeductions, monthlyNet, annualGross, annualNet } =
    calculateSummary();

  const calculateBreakdown = () => {
    if (containsError || firstTime) {
      return {
        totalPf: 0,
        totalProfessionalTax: 0,
        totalIncomeTax: 0,
        totalOtherDeductions: 0,
        finalDeduction: 0,
      };
    }
    const totalPf = (Number(deductionDetails.pf) / 100) * monthlyGross;
    const totalProfessionalTax = Number(deductionDetails.professionalTax);
    const totalIncomeTax =
      (Number(deductionDetails.incomeTax) / 100) * monthlyGross;
    const totalOtherDeductions = Number(deductionDetails.otherDeductions);
    const finalDeduction =
      totalPf + totalProfessionalTax + totalIncomeTax + totalOtherDeductions;
    return {
      totalPf,
      totalProfessionalTax,
      totalIncomeTax,
      totalOtherDeductions,
      finalDeduction,
    };
  };

  const {
    totalPf,
    totalProfessionalTax,
    totalIncomeTax,
    totalOtherDeductions,
    finalDeduction,
  } = calculateBreakdown();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <SalaryCard
        heading="EMPLOYEE DETAILS"
        icon={<MaterialCommunityIcons name="account" color="blue" size={24} />}
      >
        <SalaryInput
          label="Employee Name"
          required={true}
          onChangeText={setName}
          value={name}
          placeholder="Enter Employee Name"
          keyboardInputType="default"
        />
        {error.name && <Text style={styles.error}>{error.name}</Text>}
      </SalaryCard>
      <SalaryCard
        heading="EARNINGS"
        icon={<MaterialCommunityIcons name="bank" color="blue" size={24} />}
      >
        <SalaryInput
          label="Basic Salary"
          required={true}
          onChangeText={(text) => handleEarningDetails("basicSalary", text)}
          value={earningsDetails.basicSalary}
        />
        {error.basicSalary && (
          <Text style={styles.error}>{error.basicSalary}</Text>
        )}
        <SalaryInput
          label="HRA"
          onChangeText={(text) => handleEarningDetails("hra", text)}
          value={earningsDetails.hra || ""}
        />
        <SalaryInput
          label="DA"
          onChangeText={(text) => handleEarningDetails("da", text)}
          value={earningsDetails.da || ""}
        />
        <SalaryInput
          label="Special Allowance"
          onChangeText={(text) =>
            handleEarningDetails("specialAllowance", text)
          }
          value={earningsDetails.specialAllowance || ""}
        />
        <SalaryInput
          label="Bonus"
          onChangeText={(text) => handleEarningDetails("bonus", text)}
          value={earningsDetails.bonus || ""}
        />
      </SalaryCard>
      <SalaryCard
        heading="DEDUCTIONS & TAXES"
        icon={<MaterialCommunityIcons name="shield" color="blue" size={22} />}
      >
        <SalaryInput
          required={true}
          label="PF (%)"
          value={deductionDetails.pf}
          onChangeText={(text) => handleDeductionDetails("pf", text)}
        />
        {error.pf && <Text style={styles.error}>{error.pf}</Text>}
        <SalaryInput
          required={true}
          label="Professional Tax (₹)"
          value={deductionDetails.professionalTax}
          onChangeText={(text) =>
            handleDeductionDetails("professionalTax", text)
          }
        />
        {error.professionalTax && (
          <Text style={styles.error}>{error.professionalTax}</Text>
        )}
        <SalaryInput
          required={true}
          label="Income Tax (%)"
          value={deductionDetails.incomeTax}
          onChangeText={(text) => handleDeductionDetails("incomeTax", text)}
        />
        {error.incomeTax && <Text style={styles.error}>{error.incomeTax}</Text>}
        <SalaryInput
          label="Other Deductions (₹)"
          value={deductionDetails.otherDeductions || ""}
          onChangeText={(text) =>
            handleDeductionDetails("otherDeductions", text)
          }
        />
      </SalaryCard>
      <SalaryCard
        heading="SUMMARY (MONTHLY)"
        icon={
          <MaterialCommunityIcons
            name="chart-areaspline-variant"
            color="blue"
            size={22}
          />
        }
      >
        <View style={styles.main}>
          <View style={styles.amountView}>
            <View style={styles.leftAmount}>
              <Text style={styles.label}>Monthly Gross</Text>
              <Text style={[styles.money, styles.label]}>
                ₹{monthlyGross.toFixed(2)}
              </Text>
            </View>
            <View style={styles.leftAmount}>
              <Text style={styles.label}>Monthly Net</Text>
              <Text style={[styles.green, styles.label]}>
                ₹{monthlyNet.toFixed(2)}
              </Text>
            </View>
            <View style={styles.leftAmount}>
              <Text style={styles.label}>Total Deductions</Text>
              <Text style={[styles.red, styles.label]}>
                ₹{totalDeductions.toFixed(2)}
              </Text>
            </View>
            <View style={styles.leftAmount}>
              <Text style={styles.label}>Annual Gross</Text>
              <Text style={[styles.money, styles.label]}>
                ₹{annualGross.toFixed(2)}
              </Text>
            </View>
            <View style={styles.leftAmount}>
              <Text style={styles.label}>Annual Net</Text>
              <Text style={[styles.green, styles.label]}>
                ₹{annualNet.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.amountBottomView}>
          <View style={styles.row}>
            <Text style={styles.label}>PF (12% of Basic)</Text>
            <Text style={styles.label}>₹{totalPf.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Professional Tax</Text>
            <Text style={styles.label}>₹{totalProfessionalTax.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Income Tax (10%)</Text>
            <Text style={styles.label}>₹{totalIncomeTax.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Other Deductions</Text>
            <Text style={styles.label}>₹{totalOtherDeductions.toFixed(2)}</Text>
          </View>
          <View style={styles.verticalDivider}></View>
          <View style={styles.row}>
            <Text style={styles.red}>Total Deductions</Text>
            <Text style={styles.red}>
              ₹
              {finalDeduction !== undefined && !isNaN(finalDeduction)
                ? finalDeduction.toFixed(2)
                : 0}
            </Text>
          </View>
        </View>
        <CustomButton
          variant="secondary"
          title="CALCULATE SALARY"
          onPress={handleCalculate}
        />
      </SalaryCard>
    </ScrollView>
  );
};

export default SalaryCalculator;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 20,
    paddingBottom: 40,
  },
  contentContainer: {
    gap: 12,
  },
  flex: {
    flex: 1,
  },
  amountView: {
    flex: 1,
    marginVertical: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "lightgrey",
    justifyContent: "space-between",
    borderRadius: 8,
  },
  amountBottomView: {
    flex: 1,
    marginVertical: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "lightgrey",
    justifyContent: "space-between",
    borderRadius: 8,
  },
  money: {
    color: "blue",
    fontSize: 14,
    fontWeight: "bold",
  },
  green: {
    color: "green",
    fontSize: 14,
    fontWeight: "bold",
  },
  red: {
    color: "red",
    fontSize: 14,
    fontWeight: "bold",
  },
  leftAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  leftContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  label: {
    fontSize: 12,
  },
  divider: {
    width: 1,
    marginVertical: 8,
    backgroundColor: "lightgrey",
    marginHorizontal: 2,
  },
  verticalDivider: {
    height: 1,
    marginHorizontal: 8,
    backgroundColor: "lightgrey",
  },
  error: {
    color: "red",
    opacity: 0.6,
  },
  main: {},
  row: {
    flex: 1,
    margin: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
