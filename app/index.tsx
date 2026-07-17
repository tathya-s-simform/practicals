import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Index = () => {
  return (
    <View style={styles.outer}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Pressable onPress={() => router.navigate("/day0")}>
            <Text style={styles.text}>EMI Calculator</Text>
          </Pressable>
        </View>
        <View style={styles.card}>
          <Pressable onPress={() => router.navigate("/day1")}>
            <Text style={styles.text}>Student Result</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.card}>
          <Pressable onPress={() => router.navigate("/day2")}>
            <Text style={styles.text}>Stopwatch</Text>
          </Pressable>
        </View>
        <View style={styles.card}>
          <Pressable onPress={() => router.navigate("/day3")}>
            <Text style={styles.text}>Spreadsheet</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.card}>
          <Pressable onPress={() => router.navigate("/day4")}>
            <Text style={styles.text}>Tic-Tac-Toe</Text>
          </Pressable>
        </View>
        <View style={styles.card}>
          <Pressable onPress={() => router.navigate("/day5")}>
            <Text style={styles.text}>OTP Handler</Text>
          </Pressable>
        </View>
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
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
