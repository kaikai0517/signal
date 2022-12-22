import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Input, Image } from "@rneui/base";
import { StatusBar } from "expo-status-bar";
import {
  auth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(err.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://img.onl/TpK2Sb",
        }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        ></Input>
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        ></Input>
      </View>
      <Button
        containerStyle={styles.button}
        onPress={signIn}
        title="Login"
      ></Button>
      <Button
        containerStyle={styles.button}
        onPress={() => navigation.navigate("Register")}
        type="outline"
        title="Register"
      ></Button>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
