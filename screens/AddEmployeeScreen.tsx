import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useState } from "react";
import { View, Platform, Pressable, StyleSheet, TextInput } from "react-native";
import { Button, CheckBox, Icon, Input } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { addDays, format } from "date-fns";
import { FontAwesome } from "@expo/vector-icons";

export default function AddEmployeeScreen() {
  const [email, setEmail] = useState("");
  const [firstAid, setFirstAid] = useState(false);
  const [fireMarshal, setFireMarshal] = useState(false);
  const [date, setDate] = useState(new Date());

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(date);
    hideDatePicker();
  };

  const submit = () => {
    const data = { email, date, firstAid, fireMarshal };
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Input
          rightIcon={{ type: "font-awesome", name: "calendar" }}
          value={format(date, "dd/MM/yyyy")}
          onPressIn={showDatePicker}
          placeholder="dd/mm/yyyy"
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          minimumDate={new Date()}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <View style={styles.item}>
        <Input
          key="Email"
          autoCompleteType="email"
          value={email}
          onChangeText={(value) => setEmail(value)}
          placeholder="Email Address"
        />
      </View>
      <View style={styles.item}>
        <CheckBox
          style={styles.item}
          checked={firstAid}
          onPress={() => setFirstAid(!firstAid)}
          title="🩺 First Aid "
        />
      </View>
      <View style={styles.item}>
        <CheckBox
          checked={fireMarshal}
          onPress={() => setFireMarshal(!fireMarshal)}
          title="🔥 Fire Marshal "
        />
      </View>
      <View style={{ paddingHorizontal: 10 }}>
        <Button title="Submit" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
  },
  item: {
    height: 70,
  },
  checkbox: {
    alignSelf: "center",
  },
});
