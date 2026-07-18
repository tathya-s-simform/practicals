import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { ContactType } from "@/src/types/types";
import { styles } from "./contactCardStyles";

export type CardProps = {
  contact: ContactType;
  onFavoritePress: () => void;
  onPress: () => void;
};

const ContactCard = ({
  contact,
  onFavoritePress,
  onPress,
}: CardProps) => {
  const initials = `${contact.firstName[0]}${contact.lastName[0]}`.toUpperCase();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.cardContainer,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.name}>
          {contact.firstName} {contact.lastName}
        </Text>
        <Text numberOfLines={1} style={styles.phone}>
          {contact.phoneNumber}
        </Text>
      </View>
      <Pressable
        hitSlop={10}
        onPress={onFavoritePress}
        style={styles.favorite}
      >
        <MaterialCommunityIcons
          name={contact.isFavorite ? "star" : "star-outline"}
          size={28}
          color="#F5B301"
        />
      </Pressable>
    </Pressable>
  );
};

export default React.memo(ContactCard);