import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modal: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    elevation: 8,
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 16,
    zIndex: 10,
    padding: 4,
  },
  closeText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#666",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#4F8EF7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  avatarText: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "bold",
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
  infoContainer: {
    width: "100%",
    gap: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#DDD",
    paddingBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
    color: "#111",
    fontWeight: "500",
  },
});