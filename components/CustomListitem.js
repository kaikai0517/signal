import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from "@rneui/base";
import { db, query, doc, onSnapshot, orderBy, collection } from "../firebase";

const CustomListitem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState("");

  useEffect(() => {
    const docRef = doc(db, "chats", id);

    const q = query(
      collection(docRef, "messages"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) =>
      setChatMessages(snapshot.docs.map((doc) => doc.data()))
    );

    return unsubscribe;
  });
  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri: chatMessages?.[0]?.photoURL || "https://img.onl/TpK2Sb",
        }}
      ></Avatar>
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListitem;
