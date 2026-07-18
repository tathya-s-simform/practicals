import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: "#FFF",
    marginHorizontal: 4,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  cardPressed: {
    opacity: 0.75,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4F8EF7",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 18,
  },
  info: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
  },
  phone: {
    marginTop: 4,
    fontSize: 14,
    color: "#7B7B7B",
  },
  favorite: {
    marginLeft: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});