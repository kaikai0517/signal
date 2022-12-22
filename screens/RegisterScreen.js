import { View, Text, KeyboardAvoidingView, StyleSheet } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Button, Input } from "@rneui/base";
import { StatusBar } from "expo-status-bar";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Login",
    });
  }, [navigation]);

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: imageUrl || "https://img.onl/TpK2Sb",
      });
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
        ></Input>
        <Input
          placeholder="Email"
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
        <Input
          placeholder="Profile Picture URL (optional)"
          type="text"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        ></Input>
      </View>
      <Button
        style={styles.button}
        raised
        onPress={register}
        title="Register"
      ></Button>
      <View style={{ height: 100 }}></View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

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
