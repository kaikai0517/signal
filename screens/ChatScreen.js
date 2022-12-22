import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Avatar } from "@rneui/base";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  db,
  collection,
  doc,
  addDoc,
  auth,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "../firebase";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar rounded source={{ uri: messages[0]?.data.photoURL }}></Avatar>
          <Text style={{ color: "white", fontWeight: "700", marginLeft: 10 }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="white"></AntDesign>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
          }}
        >
          <TouchableOpacity onPress={navigation.goBack}>
            <FontAwesome
              name="video-camera"
              size={24}
              color="white"
            ></FontAwesome>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigation.goBack}>
            <Ionicons name="call" size={24} color="white"></Ionicons>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);
  const sendMessage = async () => {
    try {
      Keyboard.dismiss();
      const docRef = doc(db, "chats", route.params.id);

      await addDoc(collection(docRef, "messages"), {
        timestamp: serverTimestamp(),
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  useLayoutEffect(() => {
    const docRef = doc(db, "chats", route.params.id);

    const q = query(
      collection(docRef, "messages"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) =>
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return unsubscribe;
  }, [route]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light"></StatusBar>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {messages.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.reciever}>
                    <Avatar
                      position="absolute"
                      bottom={-15}
                      right={-5}
                      rounded
                      size={30}
                      source={{
                        uri: data.photoURL,
                      }}
                    ></Avatar>
                    <Text style={styles.recieverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      position="absolute"
                      bottom={-15}
                      left={-5}
                      rounded
                      size={30}
                      source={{
                        uri: data.photoURL,
                      }}
                    ></Avatar>
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={sendMessage}
                placeholder="Signal Message"
                style={styles.textInput}
              ></TextInput>
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={24} color="#2B68E6"></Ionicons>
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "grey",
    borderRadius: "30",
  },
  reciever: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
  recieverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
});
