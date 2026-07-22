import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Index = () => {
  return (
    <View style={styles.outer}>
      <View style={styles.container}>
        <Pressable
          style={styles.card}
          onPress={() => router.navigate("/emiCalculator")}
        >
          <Text style={styles.text}>EMI Calculator</Text>
        </Pressable>
        <Pressable
          style={styles.card}
          onPress={() => router.navigate("/studentResult")}
        >
          <Text style={styles.text}>Student Result</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable
          style={styles.card}
          onPress={() => router.navigate("/stopwatch")}
        >
          <Text style={styles.text}>Stopwatch</Text>
        </Pressable>
        <Pressable
          style={styles.card}
          onPress={() => router.navigate("/excelSheet")}
        >
          <Text style={styles.text}>Spreadsheet</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable
          style={styles.card}
          onPress={() => router.navigate("/ticTacToe")}
        >
          <Text style={styles.text}>Tic-Tac-Toe</Text>
        </Pressable>
        <Pressable
          style={styles.card}
          onPress={() => router.navigate("/otpHandler")}
        >
          <Text style={styles.text}>OTP Handler</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable
          style={styles.card}
          onPress={() => router.navigate("/contacts")}
        >
          <Text style={styles.text}>Contacts</Text>
        </Pressable>
        <Pressable
          style={styles.card}
          onPress={() => router.navigate("/splitwise")}
        >
          <Text style={styles.text}>Split-wise</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable
          style={styles.card}
          onPress={() => router.navigate("/salaryCalculator")}
        >
          <Text style={styles.text}>Salary Calc.</Text>
        </Pressable>
        <Pressable
          style={styles.card}
          onPress={() => router.navigate("/cricketScore")}
        >
          <Text style={styles.text}>Cricket Score</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Index;
const styles = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  container: {
    flexDirection: "row",
    gap: 20,
    marginTop: 20,
    marginHorizontal: 20,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 100,
    backgroundColor: "lightgreen",
    shadowColor: "green",
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 4,
    borderRadius: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "darkgreen",
  },
});
