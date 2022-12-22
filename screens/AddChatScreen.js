import { View, StyleSheet } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Button, Input, Icon } from "@rneui/base";
import { db, collection, addDoc } from "../firebase";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerBackTitle: "Chats",
    });
  }, []);

  const createChat = async () => {
    try {
      await addDoc(collection(db, "chats"), {
        chatName: input,
      });

      navigation.goBack();
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black"></Icon>
        }
      ></Input>
      <Button
        disabled={!input}
        onPress={createChat}
        title="Create new Chat"
      ></Button>
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
});
