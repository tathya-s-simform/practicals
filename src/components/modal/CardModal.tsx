import React from "react";
import {
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { ContactType } from "@/src/types/types";
import { styles } from "./cardModalStyles";

export type CardModalProps = {
  selectedContact: ContactType | null;
  onRequestClose: () => void;
};

const CardModal = ({
  selectedContact,
  onRequestClose,
}: CardModalProps) => {
  if (!selectedContact) return null;

  return (
    <Modal
      visible={selectedContact !== null}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <Pressable
        style={styles.backdrop}
        onPress={onRequestClose}
      >
        <Pressable style={styles.modal} onPress={() => {}}>
          <Pressable
            style={styles.closeButton}
            onPress={onRequestClose}
          >
            <Text style={styles.closeText}>✕</Text>
          </Pressable>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {selectedContact.firstName[0]}
              {selectedContact.lastName[0]}
            </Text>
          </View>
          <Text style={styles.name}>
            {selectedContact.firstName} {selectedContact.lastName}
          </Text>
          <View style={styles.infoContainer}>
            <InfoRow
              label="Phone"
              value={selectedContact.phoneNumber}
            />
            <InfoRow
              label="Gender"
              value={selectedContact.gender}
            />
            <InfoRow
              label="Favorite"
              value={selectedContact.isFavorite ? "⭐ Yes" : "No"}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default CardModal;