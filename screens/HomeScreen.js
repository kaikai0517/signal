import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import CustomListitem from "../components/CustomListitem";
import { Avatar } from "@rneui/base";
import { auth, db, collection, onSnapshot } from "../firebase";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const signOutUser = async () => {
    try {
      await auth.signOut();
      navigation.replace("Login");
    } catch (error) {}
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "chats"), (snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return unsubscribe;
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTitleStyle: {
        color: "black",
      },
      headerTintColor: "black",
      headerLeft: () => (
        <View>
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
            <Avatar
              rounded
              source={{
                uri: auth?.currentUser?.photoURL || "https://img.onl/TpK2Sb",
              }}
            ></Avatar>
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
          }}
        >
          <TouchableOpacity onPress={() => {}} activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black"></AntDesign>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddChat")}
            activeOpacity={0.5}
          >
            <SimpleLineIcons
              name="pencil"
              size={24}
              color="black"
            ></SimpleLineIcons>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListitem
            id={id}
            chatName={chatName}
            key={id}
            enterChat={enterChat}
          ></CustomListitem>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
