import CustomButton from "@/src/components/customButton/customButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type PersonType = {
  name: string;
  money: string;
};
type DataType = {
  groupName: string;
  persons: PersonType[];
};
const initialData: DataType[] = [];

const Splitwise = () => {
  const [expenseData, setExpenseData] = useState(initialData);
  const [showGroupName, setShowGroupName] = useState(false);
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [name, setName] = useState("");
  const [money, setMoney] = useState("");
  const [groupName, setGroupName] = useState("");
  const personInputRef = useRef<TextInput | null>(null);
  const groupInputRef = useRef<TextInput | null>(null);
  const moneyInputRef = useRef<TextInput | null>(null);

  const currentExpenseData = expenseData.find(
    (expense) => expense.groupName === groupName
  );

  const handleAddGroupPress = () => {
    setShowGroupName((prev) => {
      if (!prev) {
        setTimeout(() => groupInputRef.current?.focus(), 0);
      }
      return !prev;
    });
  };

  const handleCreateGroupPress = () => {
    setExpenseData((prev) => [...prev, { groupName: groupName, persons: [] }]);
    setShowGroupName(false);
  };

  const calculateTotal = useMemo(() => {
    const found = expenseData.find((exp) => exp.groupName === groupName);
    if (!found) {
      return { total: 0, average: 0 };
    }
    const total = found.persons.reduce(
      (acc, curr) => acc + Number(curr.money),
      0
    );
    const average = total / found.persons.length;
    return { total, average };
  }, [expenseData, groupName]);

  const { total, average } = calculateTotal;

  const handleSaveperson = () => {
    setExpenseData((prev) =>
      prev.map((expense) =>
        expense.groupName === groupName
          ? {
              ...expense,
              persons: [
                ...expense.persons,
                {
                  name,
                  money,
                },
              ],
            }
          : expense
      )
    );
    setName("");
    setMoney("");
    setShowAddPerson(false);
  };

  const handleAddPerson = () => {
    setShowAddPerson((prev) => {
      if (!prev) {
        setTimeout(() => personInputRef.current?.focus(), 0);
      }
      return !prev;
    });
  };

  const handleDeltePerson = (name: string) => {
    setExpenseData((prev) =>
      prev.map((expense) =>
        expense.groupName === groupName
          ? {
              ...expense,
              persons: expense.persons.filter((person) => person.name !== name),
            }
          : expense
      )
    );
  };
  const handleSettlePayment = () => {
    if (!currentExpenseData) return;
    setExpenseData((prev) =>
      prev.map((expense) =>
        expense.groupName === groupName
          ? {
              ...expense,
              persons: expense.persons.map((person) => ({
                ...person,
                money: average.toString(),
              })),
            }
          : expense
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SPLIT-WISE</Text>
      {showGroupName && (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.groupNameView}>
            <TextInput
              value={groupName}
              placeholder="Group Name"
              style={styles.input}
              ref={(ref) => {
                groupInputRef.current = ref;
              }}
              onChangeText={setGroupName}
            />
            <CustomButton
              title={`Create Group ${groupName}`}
              onPress={handleCreateGroupPress}
              variant="secondary"
              disabled={groupName === ""}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
      {expenseData.length === 0 ? (
        <CustomButton
          onPress={handleAddGroupPress}
          title={!showGroupName ? `Add Group` : `Hide`}
        />
      ) : (
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            style={[styles.expenseDetails, styles.flex]}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.groupContainer}>
              <Text style={styles.groupname}>{groupName}</Text>
            </View>
            <View style={styles.peopleContainer}>
              <Text style={styles.people}>PEOPLE</Text>
              {currentExpenseData &&
                currentExpenseData.persons?.map((person) => (
                  <View style={styles.personRow} key={person.name}>
                    <View style={styles.person}>
                      <Text style={styles.personText}>{person.name}</Text>
                      <Text style={styles.personText}>
                        ${Number(person.money).toFixed(2)}
                      </Text>
                    </View>

                    <MaterialCommunityIcons
                      name="delete"
                      size={26}
                      color="red"
                      style={styles.icon}
                      onPress={() => handleDeltePerson(person.name)}
                    />
                  </View>
                ))}
            </View>
            {showAddPerson && (
              <View style={[styles.add, styles.row]}>
                <TextInput
                  value={name}
                  style={styles.input}
                  placeholder="Enter Name"
                  onChangeText={setName}
                  returnKeyType="next"
                  ref={(ref) => {
                    personInputRef.current = ref;
                  }}
                  onSubmitEditing={() => moneyInputRef.current?.focus()}
                />
                <TextInput
                  value={money}
                  keyboardType="numeric"
                  style={styles.input}
                  placeholder="Enter Money"
                  onChangeText={setMoney}
                  ref={moneyInputRef}
                />
                <CustomButton
                  title="Save"
                  onPress={handleSaveperson}
                  variant="secondary"
                  disabled={name === "" || money === ""}
                />
              </View>
            )}
            <CustomButton
              title={!showAddPerson ? "Add Person" : "Hide"}
              onPress={handleAddPerson}
              variant="secondary"
            />
            <View style={[styles.row, styles.totalandpaid]}>
              <View style={styles.total}>
                <Text style={styles.totalTitle}>Total</Text>
                <Text style={styles.totalValue}>
                  {total === 0 ? "No Data" : `${total}`}
                </Text>
              </View>
              <View style={styles.total}>
                <Text style={styles.totalTitle}>Total Paid</Text>
                <Text style={styles.totalPaidValue}>
                  {total === 0 ? "No Data" : `${total}`}
                </Text>
              </View>
            </View>
            <View style={styles.settle}>
              <Text style={styles.personText}>Settle Up</Text>
              {currentExpenseData &&
                currentExpenseData.persons?.map((person) => {
                  const difference = Number(person.money) - Number(average);
                  return (
                    <View key={person.name} style={styles.settlePerson}>
                      <Text>{person.name}</Text>
                      <Text
                        style={[
                          difference >= 0 ? styles.highMoney : styles.lowMoney,
                        ]}
                      >
                        {difference >= 0 ? "Gets" : "Owes"}
                      </Text>
                      <Text
                        style={[
                          difference >= 0 ? styles.highMoney : styles.lowMoney,
                        ]}
                      >
                        ${Math.abs(difference).toFixed(2)}
                      </Text>
                    </View>
                  );
                })}
              {currentExpenseData &&
                currentExpenseData.persons?.length >= 2 && (
                  <CustomButton
                    title="Settle Payment"
                    onPress={handleSettlePayment}
                    variant="secondary"
                  />
                )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

export default Splitwise;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  row: {
    flexDirection: "row",
  },
  heading: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 24,
    alignSelf: "center",
  },
  flex: {
    flex: 1,
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "blue",
  },
  groupNameView: {
    flexDirection: "row",
    gap: 12,
  },
  groupContainer: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
  },
  groupname: {
    color: "blue",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: 500,
  },
  contentContainer: {
    gap: 20,
    paddingBottom: 30,
  },
  expenseDetails: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
  },
  peopleContainer: {
    gap: 10,
  },
  people: {
    fontSize: 18,
    fontWeight: 600,
  },
  add: {
    gap: 6,
  },
  person: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
  },
  personText: {
    fontSize: 16,
    fontWeight: 600,
  },
  total: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 12,
    gap: 4,
  },
  totalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalPaid: {
    color: "green",
    fontSize: 18,
  },
  totalandpaid: {
    gap: 8,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  totalValue: {
    color: "darkorange",
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
  },
  totalPaidValue: {
    color: "green",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  settle: {
    flex: 1,
    borderRadius: 10,
  },
  settlePerson: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    marginVertical: 4,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  lowMoney: {
    color: "red",
  },
  highMoney: {
    color: "green",
  },
  personRow: {
    flex: 1,
    gap: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    alignSelf: "center",
  },
});
