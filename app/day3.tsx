import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const Day3 = () => {
  const NUM_ROWS = 3;
  const NUM_COLS = 3;
  type DataType = number[][];
  const DATA = Array.from({ length: NUM_ROWS + 2 }, () =>
    new Array(NUM_COLS + 2).fill(0)
  );
  const [data, setData] = useState<DataType>(DATA);
  const [error, setError] = useState("");
  const rowHeader = ["Sr. No.", "A", "B", "C", "Total"];

  const handleChange = (row: number, col: number, value: number) => {
    if (isNaN(value)) {
      setError("Please Enter a valid number");
      return;
    } else {
      setError("");
    }
    setData((prev) => {
      let newData = [...prev];
      newData[row] = [...newData[row]];
      newData[row][col] = value;
      return newData;
    });
  };
  const rowTotal = (row: number) => {
    return data[row].reduce((acc, curr) => acc + curr, 0);
  };
  const columnTotal = (col: number) => {
    return data.reduce((acc, curr) => acc + curr[col], 0);
  };
  function grandTotal() {
    const newData = data.flat();
    return newData.reduce((acc, curr) => acc + curr, 0);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.dynamic}>DYNAMIC SPREADSHEET</Text>
      <View style={styles.grid}>
        {data.map((row, rowIndex) => {
          return (
            <View key={rowIndex} style={styles.row}>
              {data.map((col, colIndex) => {
                let cell;
                if (rowIndex === 0) {
                  cell = <Text>{rowHeader[colIndex]}</Text>;
                } else if (colIndex === 0) {
                  cell = <Text>{rowIndex}</Text>;
                } else if (
                  colIndex === NUM_COLS + 1 &&
                  rowIndex === NUM_ROWS + 1
                ) {
                  cell = <Text>{grandTotal()}</Text>;
                } else if (rowIndex === NUM_ROWS + 1) {
                  cell = <Text>{columnTotal(colIndex)}</Text>;
                } else if (colIndex === NUM_COLS + 1) {
                  cell = <Text>{rowTotal(rowIndex)}</Text>;
                } else {
                  cell = (
                    <TextInput
                      value={data[rowIndex][colIndex].toString()}
                      onChangeText={(text) =>
                        handleChange(rowIndex, colIndex, Number(text))
                      }
                      keyboardType="numeric"
                    />
                  );
                }
                return (
                  <View key={colIndex} style={styles.cell}>
                    {cell}
                  </View>
                );
              })}
            </View>
          );
        })}
        {error && <Text>{error}</Text>}
      </View>
    </View>
  );
};

export default Day3;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  cell: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  col: {
    flex: 1,
  },
  grid: {
    borderRadius: 10,
    marginVertical: 20,
  },
  dynamic: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
});
