import * as React from "react";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  SectionList,
  StyleSheet,
  Alert,
} from "react-native";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { format } from "date-fns";
import { TitleText } from "../components/TitleText";
import { FontAwesome } from "@expo/vector-icons";
import Colors, { primaryColor } from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { BookingDate, loadCalendar } from "../lib/calendarService";

export default function OfficeBookingScreen({
  navigation,
}: RootTabScreenProps<"OfficeBooking">) {
  const [weekStart, setWeekStart] = useState<Date>(getMonday(new Date()));
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<BookingDate[]>([]);

  async function getData() {
    loadCalendar(weekStart)
      .then((response) => setData(response))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    if (isLoading) {
      getData();
    }
  }, [weekStart]);

  return (
    <View style={{ padding: 20 }}>
      <View
        style={{
          paddingBottom: 20,
          borderBottomColor: "#666",
          borderBottomWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
          onPress={() => {
            setWeekStart(addDays(weekStart, -7));
            setIsLoading(true);
          }}
        >
          <View style={{ flexDirection: "row", margin: 5 }}>
            <FontAwesome size={30} name="arrow-left" />
            <Text
              style={{
                margin: 5,
                marginHorizontal: 10,
                fontSize: 14,
                width: 60,
              }}
            >
              Previous
            </Text>
          </View>
        </Pressable>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 24 }}>
            {format(weekStart, "MMM")}
          </Text>
        </View>
        <Pressable
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
          onPress={() => {
            setWeekStart(addDays(weekStart, 7));
            setIsLoading(true);
          }}
        >
          <View style={{ flexDirection: "row", margin: 5 }}>
            <Text
              style={{
                textAlign: "right",
                margin: 5,
                marginHorizontal: 10,
                fontSize: 14,
                width: 60,
              }}
            >
              Next
            </Text>
            <FontAwesome size={30} name="arrow-right" />
          </View>
        </Pressable>
      </View>

      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <SectionList
            style={{ padding: 10 }}
            sections={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
                onPress={() => {
                  Alert.alert(
                    "Remove Employee",
                    `Do you want to remove ${item}?`,
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                      { text: "OK", onPress: () => console.log("OK Pressed") },
                    ]
                  );
                }}
              >
                <Text
                  style={{ fontSize: 18, paddingVertical: 5, color: "#666" }}
                >
                  {item}
                </Text>
              </Pressable>
            )}
            renderSectionHeader={({ section }) => (
              <View style={styles.separator}>
                <Text
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    padding: 4,
                    paddingHorizontal: 10,
                    color: primaryColor,
                  }}
                >
                  {format(section.title, "d")}
                </Text>
                <Text style={{ fontSize: 24, paddingTop: 10 }}>
                  {format(section.title, "EEEE")}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

function addDays(date: Date, days: number) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getMonday(d: Date) {
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

const styles = StyleSheet.create({
  container: { marginBottom: 30, backgroundColor: "#fff" },
  separator: {
    flexDirection: "row",
    marginVertical: 10,
    borderTopColor: "#999",
    borderTopWidth: 0,
  },
});
