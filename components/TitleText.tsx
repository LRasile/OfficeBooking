import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "./EditScreenInfo";
import { Text, TextProps, View } from "./Themed";

export function TitleText(props: TextProps) {
  return (
    <Text style={{ fontSize: 20, fontWeight: "bold", padding: 10 }}>
      {props.children}
    </Text>
  );
}
