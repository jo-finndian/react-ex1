import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function AppButton(props) {
  return (
    <TouchableOpacity
      onPress={props.quitNow}
    >
    <LinearGradient 
    colors={['#1CFFC3', '#15C496', '#1CFFC3']}
    locations={[0,0.5,1]}
    style={{
        marginVertical: 20,
        width: 200,
        height: 70,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 40,
        padding: 20,
    }}>
      <Text style={styles.counterBtnText}>Quit now!</Text>
    </LinearGradient>
    </TouchableOpacity>
  );
}
// test github
const styles = StyleSheet.create({
  counterBtnText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
});