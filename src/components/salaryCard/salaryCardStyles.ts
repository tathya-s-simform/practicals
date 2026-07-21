import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "grey",
    shadowOffset: {
      width: 3,
      height:3
    },
    shadowOpacity: 0.2,
    shadowRadius:5
  },
  topRow: {
    flexDirection: "row",
    alignItems: 'center',
    gap:8
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    color:"blue"
  }
})