import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function Dashboard() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await auth().signOut();

      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.log("Error during logout", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Dashboard</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#ff3b30",
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
