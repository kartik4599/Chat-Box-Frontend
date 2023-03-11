import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, IconButton, Image, Text } from "@chakra-ui/react";
import React from "react";
import msg from "../../assets/undraw_quick_chat_re_bit5.svg";
import { getSender, getSenderFull } from "../../config/ChatLogic";
import { ChatState } from "../../context/ChatProvider";
import ProfileModal from "../Modal/ProfileModal";
import UpdategroupChatModel from "../Modal/UpdategroupChatModel";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();

  return (
    <>
      {!selectedChat && (
        <Box
          display="flex"
          h="100%"
          justifyContent={"center"}
          flexDir={"column"}
          alignItems="center">
          <Box w={"70%"}>
            <Image src={msg} />
            <Text
              mt={5}
              fontFamily="Work sans"
              fontWeight={"bold"}
              fontSize={26}
              color="teal">
              Click on a user to start chatting
            </Text>
          </Box>
        </Box>
      )}
      {selectedChat && (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily={"Work sans"}
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignContent="center">
            <IconButton
              display={{ base: "flex", md: "none" }}
              onClick={() => {
                setSelectedChat("");
              }}
              icon={<ArrowBackIcon />}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdategroupChatModel
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </Text>
          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent="flex-end"
            p={3}
            bg="blackAlpha.100"
            w="100%"
            borderRadius={"lg"}
            overflowY="hidden"
            h="100%">
            <Text bg="whiteAlpha.500" w="30%" borderRadius={"lg"} h="5%">
              Message Here
            </Text>
          </Box>
        </>
      )}
    </>
  );
};

export default SingleChat;
