import React, { useState, useEffect } from "react";
import Moment from "moment";
import { extendMoment } from "moment-range";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';

import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  Dimensions,
  AsyncStorage,
} from "react-native";

import ResetButton from "./components/ResetButton";
import QuitButton from "./components/QuitButton";

export default function App() {
  let [fontsLoaded] = useFonts({
    'PoppinsSemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'PoppinsBold': require('./assets/fonts/Poppins-Bold.ttf'),
    'PoppinsRegular': require('./assets/fonts/Poppins-Regular.ttf'),
  });

  const moment = extendMoment(Moment);
  var [quitDate, setQuitDate] = useState();
  var [isSmoking, setSmokingStatus] = useState(); 
  var [daysSmokeFree, setDaysSmokeFree] = useState();
  var [btns, setBtns] = useState();

  var today = moment();
  var smoke;

  const quitNow = () => {
    isSmoking = false;
    smoke = isSmoking.toString();
    
    var z = JSON.stringify(today).split('T');
    z.pop();
    var spliT = z.toString().split('"');
    quitDate = spliT.pop();
    Alert.alert("Congratulations! This is a big step, and you'll do great.")
    
    setBtns(false);
    setQuitDate(quitDate);
    setSmokingStatus(isSmoking);
    updateAsyncStorage(quitDate, smoke);
    console.log("updated quit");
  };
  
  const resetBtn  = () => {
    Alert.alert(
      "You've come so far!",
      "Are you sure you want to restart?",
      [
        {
          text: "No, I want to keep trying!",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => {
          quitDate = "none";
          isSmoking = true;
          smoke = isSmoking.toString();

          setQuitDate(quitDate);
          setSmokingStatus(isSmoking);
          setBtns(true);
          updateAsyncStorage(quitDate, smoke);
          console.log("updated reset");
        }}
      ],
      { cancelable: false }
    );
  };

  function updateAsyncStorage(quitDate, smoke) {
    return new Promise(async (resolve, reject) => {
      try {
        await AsyncStorage.removeItem("quitDate");
        await AsyncStorage.removeItem("isSmoking");

        await AsyncStorage.setItem("quitDate", quitDate);
        await AsyncStorage.setItem("isSmoking", smoke);
        
        console.log("async updated successfully");
        fetchDate();
        return resolve(true);
      } catch (e) {
        return reject(e);
      } 
    }); 
  };
  
  async function fetchDate() {
    const dateStored = await AsyncStorage.getItem("quitDate");
    const smokingStatus = await AsyncStorage.getItem("isSmoking");

    if (dateStored) {
      setQuitDate(dateStored);
      setSmokingStatus(smokingStatus);
      smokeFree(dateStored, smokingStatus);
    }

    console.log("data fetched. Date: " + dateStored + " Smoking: " + smokingStatus);
  }

  useEffect(() => {
    fetchDate();
  }, []);

  function smokeFree(dateStored, smokingStatus) {
    console.log("here!");
    const start = new Date(dateStored);
    const end = new Date(today);
    const range = moment.range(start, end);

    daysSmokeFree = range.diff('days') + " Days";

    if (dateStored === "none") {
      setBtns(true);
      setDaysSmokeFree("0 Days");
      setQuitDate("You're still smoking...");
      setSmokingStatus(smokingStatus);
      console.log('working');
    } else {
      setBtns(false);
      setQuitDate("You Quit Smoking On: \n" + dateStored);
      setDaysSmokeFree(daysSmokeFree);
      setSmokingStatus(smokingStatus);
      console.log('working 2 ' + dateStored);
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  else {
    return (
    <View style={styles.container}>
      <LinearGradient 
        colors={
          btns ? ['#FFFFFF', '#F6E9CF', '#C68308', '#AA6F00'] : ['#00B786', '#BCFDFB']}
        locations={btns ? [0,0.25,0.85,1] : [0,1]}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: Dimensions.get("window").height,
        }}
      />
      <View style={styles.topContainer}>
        <Text style={styles.smokeFree}>{daysSmokeFree}</Text>
        <Text style={styles.textMd}>Smoke Free</Text>
        <Image
          style={styles.image}
          source={
            btns
            ? require("./assets/images/cigarette.png")
            : require("./assets/images/no-cigarette.png")
          }
        />
        <Text style={styles.quiteDate}>{quitDate}</Text>
      </View>

      <View style={styles.btnContainer}>
        <View style={
          btns
            ? styles.quitContainer
            : styles.hideQuit 
          }>
          <QuitButton quitNow={quitNow} />
        </View>

        <View style={
          btns
            ? styles.hideReset 
            : styles.resetContainer
          }>
          <ResetButton resetBtn={resetBtn}/>
        </View>
      </View>

    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  topContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    color: "#141414",
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 60,
    paddingVertical: 150,
    width: Dimensions.get("window").width - 50,
  },
  text: { //font family regular
    fontSize: 20,
    color: "#141414",
    textAlign: 'center',
    fontFamily: "PoppinsRegular",
  },
  textMd: { //font family, semi-bold
    fontSize: 20,
    color: "#141414",
    textAlign: 'center',
    fontFamily: "PoppinsSemiBold",
  },
  quiteDate: { //font family bold
  color: "#141414",
  fontSize: 20,
  textAlign: 'center',
    fontFamily: "PoppinsBold",
  },
  smokeFree: {
    color: "#141414",
    fontSize: 40,
    textTransform: "uppercase",
    fontFamily: "PoppinsBold",
  },
  image: {
    width: Dimensions.get("window").width - 100,
    height: 200,
    marginVertical: 30,
    resizeMode: "contain",
    // backgroundColor: "green",
  },
  btnContainer: {
    flex: 2,
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "green",
  },
  quitContainer: {
    marginVertical: 30,
    // backgroundColor: "blue",
  },
  resetContainer: {
    marginVertical: 30,
    // backgroundColor: "red",
  },
  hideQuit: {
    opacity: 0,
    flex: 1,
  },
  hideReset: {
    opacity: 0,
    flex: 1,
  },
});