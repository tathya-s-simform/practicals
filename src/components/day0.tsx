import { useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";

export type LoanDetails = {
  loanAmount: string;
  interestRate: string;
  loanDuration: string;
};
export type ScheduleItem = {
  month: number;
  emi: number;
  loanAmount: number;
  interestRate: number;
};

// function toNumber(value: string) {
//   const number = Number(value);
//   return number;
// }

function calculateEMI(
  loanAmount: number,
  interestRate: number,
  loanDuration: number
) {
  // const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  // p = loanAmount loan amount
  // r = Monthly interest rate (calculated as: Annual Rate / 12 / 100)
  // n = Total number of monthly installments
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = loanDuration * 12;
  const factor = Math.pow(1 + monthlyRate, totalMonths);
  return (loanAmount * monthlyRate * factor) / (factor - 1);
}

function calculateSchedule(
  loanAmount: number,
  interestDate: number,
  loanDuration: number,
  emi: number
): ScheduleItem[] {
  const schedule: ScheduleItem[] = [];
  const monthlyRate = interestDate / 12 / 100;
  const totalMonths = loanDuration * 12;
  let balance = loanAmount;
  for (let month = 1; month <= totalMonths; month++) {
    const interest = balance * monthlyRate;
    let loanAmountPaid = emi - interest;
    if (month === totalMonths) {
      loanAmountPaid = balance;
    }
    balance = Math.max(balance - loanAmountPaid, 0);
    schedule.push({
      month,
      emi,
      loanAmount: loanAmountPaid,
      interestRate: interest,
    });
  }
  return schedule;
}

export default function Day0() {
  const [loanDetails, setLoanDetails] = useState<LoanDetails>({
    loanAmount: "",
    interestRate: "",
    loanDuration: "",
  });
  function handleChange({
    key,
    value,
  }: {
    key: keyof LoanDetails;
    value: string;
  }) {
    setLoanDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
  }
  const loanAmount = Number(loanDetails.loanAmount);
  const interestRate = Number(loanDetails.interestRate);
  const loanDuration = Number(loanDetails.loanDuration);
  const emi = calculateEMI(loanAmount, interestRate, loanDuration);
  const totalPayment = emi * loanDuration * 12;
  const totalInterest = totalPayment - loanAmount;
  const schedule = calculateSchedule(
    loanAmount,
    interestRate,
    loanDuration,
    emi
  );
  const [firstTime, setFirstTime] = useState(true);
  const handleButton = () => {
    setFirstTime(false);
  };
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Loan Amount</Text>
      <TextInput
        value={loanDetails.loanAmount}
        placeholder="Enter Loan Amount"
        keyboardType="numeric"
        onChangeText={(text) =>
          handleChange({
            key: "loanAmount",
            value: text,
          })
        }
        style={{
          borderWidth: 1,
          marginBottom: 20,
          padding: 10,
        }}
      />
      <Text>Annual Interest Rate (%)</Text>
      <TextInput
        value={loanDetails.interestRate}
        placeholder="Enter Interest Rate"
        keyboardType="numeric"
        onChangeText={(text) =>
          handleChange({
            key: "interestRate",
            value: text,
          })
        }
        style={{
          borderWidth: 1,
          marginBottom: 20,
          padding: 10,
        }}
      />
      <Text>Loan Duration (Years)</Text>
      <TextInput
        value={loanDetails.loanDuration}
        keyboardType="numeric"
        placeholder="Enter Loan Duration (Years)"
        onChangeText={(text) =>
          handleChange({
            key: "loanDuration",
            value: text,
          })
        }
        style={{
          borderWidth: 1,
          marginBottom: 20,
          padding: 10,
        }}
      />
      <Button title="Calculate EMI" onPress={handleButton} />
      {loanAmount > 0 &&
        loanDuration > 0 &&
        interestRate > 0 &&
        interestRate < 100 &&
        !firstTime && (
          <View>
            <Text>Monthly EMI : {emi.toFixed(2)}</Text>
            <Text>Total Interest : {totalInterest.toFixed(2)}</Text>
            <Text>Total Payment : {totalPayment.toFixed(2)}</Text>
            <Text style={{ marginTop: 20, color: "blue" }}>
              Ammortization Summary (First 5 Months)
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              <Text>Month</Text>
              <Text>EMI</Text>
              <Text>loanAmount</Text>
              <Text>Interest</Text>
            </View>
            <FlatList
              data={schedule.slice(0, 5)}
              keyExtractor={(item) => item.month.toString()}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 8,
                  }}
                >
                  <Text>{item.month}</Text>
                  <Text>{item.emi.toFixed(2)}</Text>
                  <Text>{item.loanAmount.toFixed(2)}</Text>
                  <Text>{item.interestRate.toFixed(2)}</Text>
                </View>
              )}
            />
          </View>
        )}
    </View>
  );
}
