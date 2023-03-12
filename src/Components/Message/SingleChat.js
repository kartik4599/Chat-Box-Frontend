import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  IconButton,
  Image,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import msg from "../../assets/undraw_quick_chat_re_bit5.svg";
import { getSender, getSenderFull } from "../../config/ChatLogic";
import { ChatState } from "../../context/ChatProvider";
import ProfileModal from "../Modal/ProfileModal";
import UpdategroupChatModel from "../Modal/UpdategroupChatModel";
import ScrollableChat from "./ScrollableChat";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const toast = useToast();

  const { user, selectedChat, setSelectedChat } = ChatState();

  const fetchMessage = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      console.log(data);
      setMessage(data);
      setLoading(false);
    } catch (e) {
      toast({
        title: "Error Occured!",
        description: "Failed to load the message",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        console.log(data);

        setMessage([...message, data]);
      } catch (e) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the message",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };
  const typeingHandler = (e) => {
    setNewMessage(e.target.value);
    // Typing INdicator
  };

  useEffect(() => {
    fetchMessage();
  }, [selectedChat]);

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
                  fetchMessage={fetchMessage}
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
            {loading ? (
              <Spinner
                color="teal"
                speed="1s"
                thickness="4px"
                size={"xl"}
                w={20}
                h={20}
                alignSelf="center"
                margin={"auto"}
              />
            ) : (
              <Box display={"flex"} flexDir="column" overflowY={"scroll"}>
                <ScrollableChat message={message} />
              </Box>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input
                variant={"filled"}
                bg="white"
                placeholder="Enter the message..."
                onChange={typeingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      )}
    </>
  );
};

export default SingleChat;
