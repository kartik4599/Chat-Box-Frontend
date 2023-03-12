import React, { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import SideDrawer from "../Components/Chat/SideDrawer";
import { Box } from "@chakra-ui/react";
import MyChats from "../Components/Chat/MyChats";
import ChatBox from "../Components/Chat/ChatBox";
const Chat = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      {user && (
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100&",
            height: "91.5vh",
            padding: "10px",
          }}>
          <MyChats fetchAgain={fetchAgain}  />
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
      )}
    </div>
  );
};

export default Chat;
