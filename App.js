import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";

import AppButton from "./components/AppButton";

export default function App() {
  const [count, setCount] = useState(0);

  const onButtonPress = () => {
    Alert.alert("Button clicked!");
  };

  const countIncrementHandler = () => {
    setCount(count + 1);
  };
  
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.textTitle]}>Hello world!</Text>
      <Text style={styles.text}>Welcome to React Native</Text>
      <Button title="Button" onPress={onButtonPress} />
      <View>
        <Text>Count: {count}</Text>
      </View>
      <AppButton countIncrementHandler={countIncrementHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 15,
  },
  counterBtn: {
    marginTop: 10,
    backgroundColor: "purple",
    padding: 20,
  },
  counterBtnText: {
    color: "white",
  },
  textTitle: {
    color: "purple",
    fontSize: 25,
    fontWeight: "700",
  },
});
