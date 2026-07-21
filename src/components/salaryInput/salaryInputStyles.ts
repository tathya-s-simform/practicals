import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 30,
    marginVertical:6,
    flexDirection: "row",
    justifyContent: "space-between",
    gap:12
  },
  label: {
    fontSize:13
  },
  labelView: {
    flex:1,
    flexDirection: "row",
    alignItems:"center",
    maxWidth:140,
    gap:2
  },
  star: {
    color:"red"
  },
  input: {
    flex: 1,
    padding: 6,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 6,
    fontSize:12
  }
})