import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null);
  const navigation = useNavigation();

  const sendOTP = async () => {
    try {
      const result = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(result);
    } catch (error) {
      console.log("Error sending OTP!", error);
    }
  };

  const checkOTP = async () => {
    try {
      const userInfo = await confirm.confirm(code);
      const user = userInfo.user;

      const fireUser = await firestore()
        .collection("users")
        .doc(user.uid)
        .get();

      if (fireUser.exists) {
        navigation.navigate("Dashboard");
      } else {
        navigation.navigate("Register", { uid: user.uid });
      }
    } catch (error) {
      console.log("Invalid code", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Authentication using Firebase</Text>
      {!confirm ? (
        <>
          <Text style={styles.label}>Enter Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Eg - +91 89089089088"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={styles.button} onPress={sendOTP}>
            <Text style={styles.buttonText}>Send Code</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.label}>Enter the OTP sent to your number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Code"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
          />
          <TouchableOpacity style={styles.button} onPress={checkOTP}>
            <Text style={styles.buttonText}>Confirm Code</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
