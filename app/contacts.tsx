import ContactCard from "@/src/components/contactCard/ContactCard";
import CardModal from "@/src/components/modal/CardModal";
import { PAGE_SIZE } from "@/src/constants/constants";
import { contacts } from "@/src/data/contacts";
import { useDebounce } from "@/src/hooks/useDebounce";
import { ContactType, SectionDataType } from "@/src/types/types";
import React, { useMemo, useState } from "react";
import { FlatList, SectionList, StyleSheet, Text, TextInput, View } from "react-native";

const Contacts = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue=useDebounce(searchValue,400);
  const [contact, setContact] = useState<ContactType[]>(contacts);
  const [visibleContact, setVisibleContact] = useState<ContactType[]>(contacts.slice(0,PAGE_SIZE));
  const [selectedContact, setSelectedContact]=useState<ContactType|null>(null);
  
  const filteredContacts = useMemo(() => {
    if(!debouncedSearchValue.trim()){
      return contact;
    }
    return contact.filter((c) => c.firstName.toLowerCase().includes(debouncedSearchValue.toLowerCase()) || c.lastName.toLowerCase().includes(debouncedSearchValue.toLowerCase()) || c.phoneNumber.toLowerCase().includes(debouncedSearchValue.toLowerCase()));
  },[contact, debouncedSearchValue]);

  const sectionListData: SectionDataType[] = useMemo(()=>filteredContacts.reduce(
    (acc: SectionDataType[], curr: ContactType) => {
      const heading = curr.firstName.charAt(0).toUpperCase();
      let found = acc.find((obj) => obj.title === heading);
      if (!found) {
        const obj: SectionDataType = {
          title: heading,
          data: filteredContacts.filter(
            (contact) => contact.firstName.charAt(0).toUpperCase() === heading,
          ),
        };
        acc.push(obj);
      }
      return acc.sort((a, b) => a.title.localeCompare(b.title));
    },
    [],
  ),[filteredContacts]);

  const renderHeader = ({ title }: { title: string }) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headingText}>{title}</Text>
      </View>
    )
  }
  const renderContacts = ({ contact }: { contact: ContactType }) => {
    return (
      <ContactCard
        contact={contact}
        onFavoritePress={() => handlefavoritePress(contact.id)}
        onPress={() => {setSelectedContact(contact)}}
      />
    )
  }
  const handlefavoritePress = (id: string) => {
    setContact((prev) => (
      prev.map((contact) =>
        contact.id === id ? { ...contact, isFavorite: !contact.isFavorite } : contact
      )
    ))
  }
  const renderEmpty = () => {
    return (
      <View style={styles.empty}>
        <Text style={styles.noFavorites}>No Favorites Added</Text>
      </View>
    )
  }
  const renderPinnedFavorites = () => {
    const favoriteContacts = contact.filter((c) => c.isFavorite === true)
    return (
      <View style={styles.pinnedFavorites}>
        <Text style={styles.headingText}>Favorite Contacts</Text>
        <FlatList
          data={favoriteContacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ContactCard
              contact={item}
              onFavoritePress={() => handlefavoritePress(item.id)}
              onPress={() => { }}
            />
          )}
          horizontal={true}
          contentContainerStyle={styles.contentContainer}
          ListEmptyComponent={renderEmpty}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    )
  }
  const loadMore=()=>{
    setVisibleContact(prev=>[...prev, ...contact.slice(prev.length, prev.length+PAGE_SIZE)])
  }

  return (
    <View style={styles.container}>
      <CardModal 
      selectedContact={selectedContact}
      onRequestClose={()=>setSelectedContact(null)}
      />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.search}
          placeholder="Search Contacts..."
          value={searchValue}
          onChangeText={setSearchValue}
        />
      </View>
      <SectionList
        sections={sectionListData}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => renderContacts({ contact: item })}
        renderSectionHeader={({ section }) => renderHeader({ title: section.title })}
        stickySectionHeadersEnabled
        initialNumToRender={20}
        ListHeaderComponent={renderPinnedFavorites}
        onEndReachedThreshold={0.1}
        onEndReached={loadMore}
      />
    </View>
  );
};

export default Contacts;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    marginVertical: 8
  },
  contentContainer: {
    gap: 16
  },
  header: {
    flex: 1,
    backgroundColor:"#f2f2f2"
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  search: {
    padding: 14,
    borderWidth: 2,
    borderRadius: 12,
    borderColor:'blue',
    backgroundColor: 'white'
  },
  pinnedFavorites: {
    flex: 1,
    gap: 10
  },
  empty: {
    flex: 1,
  },
  noFavorites: {
    fontSize: 18,
    color: 'grey'
  }
});
