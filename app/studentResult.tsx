import React, { useMemo, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { MAX_MARKS } from "../src/constants/constants";
import { fieldType, StudentDetails } from "../src/types/types";
import { calculateResult } from "../src/utils/calculateResult";
import { validateDetails } from "../src/utils/validateDetails";

const initialDetails: StudentDetails = {
  name: "",
  physics: "",
  chemistry: "",
  maths: "",
};
const fields: fieldType = [
  {
    field: "name",
    placeholder: "Enter your name",
  },
  {
    field: "physics",
    placeholder: "Enter Physics score",
  },
  {
    field: "chemistry",
    placeholder: "Enter chemistry score",
  },
  {
    field: "maths",
    placeholder: "Enter maths score",
  },
];
const StudentResult = () => {
  const [details, setDetails] = useState<StudentDetails>(initialDetails);
  const [firstTime, setFirstTime] = useState(true);
  const error = useMemo(
    () => (!firstTime ? validateDetails(details) : {}),
    [details, firstTime]
  );
  const hasErrors = Object.keys(error).length > 0;

  function handleUpdate(field: keyof StudentDetails, value: string) {
    setDetails((prev) => ({ ...prev, [field]: value }));
  }
  function handlePress() {
    if (firstTime) {
      setFirstTime(false);
    }
  }
  let results = null;
  if (!hasErrors && !firstTime) {
    results = calculateResult(details);
  }
  return (
    <View>
      <Text>Enter Details</Text>
      {fields.map((field) => (
        <View key={field.field}>
          <TextInput
            placeholder={field.placeholder}
            value={details[field.field]}
            onChangeText={(text) => handleUpdate(field.field, text)}
            style={styles.input}
            keyboardType={field.field === "name" ? "default" : "numeric"}
          />
          {error && <Text>{error[field.field]}</Text>}
        </View>
      ))}
      <Button title="Calculate" onPress={handlePress} />
      {results && (
        <View>
          <Text>Results for {results.name}</Text>
          <Text>
            Total: {results.total.toFixed(2)}/{MAX_MARKS * 3}
          </Text>
          <Text>Percentage: {results.percentage.toFixed(2)} %</Text>
          <Text>Grade: {results.grade}</Text>
          <Text>Status: {results.status}</Text>
        </View>
      )}
    </View>
  );
};

export default StudentResult;
export const styles = StyleSheet.create({
  input: {
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: "blue",
    borderRadius: 6,
  },
});
