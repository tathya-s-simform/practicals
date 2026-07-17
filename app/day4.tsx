import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import React, { useCallback, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
export type DataType = string[][];
export type ResultType = "X" | "O" | "Tie";
const Day4 = () => {
  const DATA: DataType = Array.from({ length: 3 }, () => new Array(3).fill(""));
  const [data, setData] = useState(DATA);
  const [isXTurn, setIsXTurn] = useState(false);
  const [result, setResult] = useState<ResultType | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const moves = useRef(0);
  const [winningCordinates, setWinningCordinates] = useState<
    { row: number; col: number }[]
  >([]);
  const handlePress = (row: number, col: number) => {
    if (isGameOver) {
      return;
    }
    setData((prev) => {
      const newData = [...prev];
      newData[row] = [...prev[row]];
      newData[row][col] = isXTurn ? "X" : "O";
      calculateOutcome(newData);
      return newData;
    });
    moves.current = moves.current + 1;
    if (moves.current === 9) {
      setIsGameOver(true);
    }
    setIsXTurn((prev) => !prev);
  };

  const calculateOutcome = useCallback(
    (data: DataType) => {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (
            data[0][col] !== "" &&
            data[0][col] === data[1][col] &&
            data[1][col] === data[2][col]
          ) {
            setResult(data[0][col] === "X" ? "X" : "O");
            setIsGameOver(true);
            setWinningCordinates([
              { row: 0, col },
              { row: 1, col },
              { row: 2, col },
            ]);
            moves.current = 0;
            return;
          }
          if (
            data[row][0] !== "" &&
            data[row][0] === data[row][1] &&
            data[row][1] === data[row][2]
          ) {
            setResult(data[row][0] === "X" ? "X" : "O");
            setIsGameOver(true);
            setWinningCordinates([
              { row, col: 0 },
              { row, col: 1 },
              { row, col: 2 },
            ]);
            moves.current = 0;
            return;
          }
        }
      }
      if (
        data[0][0] !== "" &&
        data[0][0] === data[1][1] &&
        data[1][1] === data[2][2]
      ) {
        setResult(data[0][0] === "X" ? "X" : "O");
        setIsGameOver(true);
        setWinningCordinates([
          { row: 0, col: 0 },
          { row: 1, col: 1 },
          { row: 2, col: 2 },
        ]);
        moves.current = 0;
        return;
      }
      if (
        data[2][0] !== "" &&
        data[2][0] === data[1][1] &&
        data[1][1] === data[0][2]
      ) {
        setResult(data[2][0] === "X" ? "X" : "O");
        setIsGameOver(true);
        setWinningCordinates([
          { row: 0, col: 2 },
          { row: 1, col: 1 },
          { row: 2, col: 0 },
        ]);
        moves.current = 0;
        return;
      }
      if (moves.current === 9) {
        setResult("Tie");
        setIsGameOver(true);
        moves.current = 0;
      }
      return result;
    },
    [result]
  );
  const handleReset = () => {
    setData(DATA);
    setIsGameOver(false);
    moves.current = 0;
    setIsXTurn(false);
    setResult(null);
    setWinningCordinates([]);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TIC-TAC-TOE</Text>
      <View style={styles.grid}>
        {data.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((col, colIndex) => {
              let cell;
              const isWinningCell = winningCordinates.some(
                (cell) => cell.row === rowIndex && cell.col === colIndex
              );
              if (data[rowIndex][colIndex] === "") {
                return (
                  <Pressable
                    key={colIndex}
                    style={styles.cell}
                    onPress={() => handlePress(rowIndex, colIndex)}
                  ></Pressable>
                );
              } else {
                if (data[rowIndex][colIndex] === "X") {
                  cell = <Icon name="close" style={styles.x} size={40} />;
                } else if (data[rowIndex][colIndex] === "O") {
                  cell = (
                    <Icon
                      name="checkbox-blank-circle-outline"
                      style={styles.o}
                      size={30}
                    />
                  );
                }
                return (
                  <View
                    key={colIndex}
                    style={[styles.cell, isWinningCell && styles.success]}
                  >
                    {cell}
                  </View>
                );
              }
            })}
          </View>
        ))}
      </View>
      {!isGameOver ? (
        <Text style={[styles.turn, isXTurn ? styles.x : styles.o]}>
          {isXTurn ? "X's Turn" : "O's Turn"}
        </Text>
      ) : (
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>GAME OVER</Text>
          <Text
            style={[
              styles.result,
              result === "O" && styles.o,
              result === "X" && styles.x,
              result === "Tie" && styles.tie,
            ]}
          >
            {result === "X"
              ? "X WINS!!!"
              : result === "O"
              ? "O WINS!!!"
              : "It's a TIE"}
          </Text>
          <Pressable style={styles.reset} onPress={handleReset}>
            <Text style={styles.resetText}>Reset Game</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Day4;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    maxWidth: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  grid: {
    flex: 1,
    maxHeight: "30%",
    alignItems: "center",
    marginVertical: 16,
  },
  o: {
    color: "blue",
  },
  x: {
    color: "red",
  },
  tie: {
    color: "orange",
  },
  turn: {
    paddingTop: 16,
    fontSize: 26,
    fontWeight: "bold",
    alignSelf: "center",
  },
  result: {
    fontSize: 26,
    fontWeight: "bold",
    alignSelf: "center",
  },
  reset: {
    backgroundColor: "blue",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  resetText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  success: {
    backgroundColor: "lightgreen",
  },
});
