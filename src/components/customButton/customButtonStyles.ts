import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    button: {
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "blue",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: {
          width: 3,
          height: 3,
        },
      },
      buttonText: {
        alignSelf: "center",
        color: "blue",
        fontSize: 20,
        fontWeight: "bold",
      },
      secondaryButton: {
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "blue",
        borderRadius: 10,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: {
          width: 3,
          height: 3,
        },
      },
      secondaryButtonText: {
        alignSelf: "center",
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
  },
  disabled: {
    backgroundColor: "gray",
      }
})