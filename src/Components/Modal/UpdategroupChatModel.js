import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";

const UpdategroupChatModel = ({ fetchAgain, setFetchAgain }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedChat, setSelectedChat, user } = ChatState();
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const toast = useToast();

  const removeHandler = () => {};

  const renameHandler = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      toast({
        title: "Group Name Changed",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (e) {
      console.log(e);
      setRenameLoading(false);
      toast({
        title: "Error Occured",
        description: "Failed to change group name",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const searchHandler = async (query) => {
    setLoading(true);
    if (!query) {
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setSearchResult(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast({
        title: "Error Occured",
        description: "Failed to load the search result",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const deleteHandler = async (user1) => {
    if (selectedChat.groupAdmin._id !== user.id) {
      toast({
        title: "Only admins can remove users",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/chat/groupremove",
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );
      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast({
        title: "Error Occured",
        description: "Failed to add member",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const addUserHandler = async (user1) => {
    console.log(selectedChat.groupAdmin._id, user.id);

    if (selectedChat.groupAdmin._id !== user.id) {
      toast({
        title: "Only admins can add users",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/chat/groupadd",
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast({
        title: "Error Occured",
        description: "Failed to add member",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <IconButton
        onClick={onOpen}
        display={{ base: "flex" }}
        icon={<ViewIcon />}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={35}
            fontFamily="Work sans"
            display={"flex"}
            justifyContent="center">
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="100%" flexWrap={"wrap"} display={"flex"}>
              {selectedChat.users.map((user) => {
                return (
                  <UserBadgeItem
                    user={user}
                    handlerFunction={deleteHandler.bind(null, user)}
                    key={user._id}
                  />
                );
              })}
            </Box>
            <FormControl display={"flex"}>
              <Input
                placeholder="Rename The Group"
                mb={3}
                value={groupChatName}
                onChange={(e) => {
                  setGroupChatName(e.target.value);
                }}
              />
              <Button
                variant={"solid"}
                colorScheme="teal"
                ml={1}
                onClick={renameHandler}
                isLoading={renameLoading}>
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users to group..."
                mb={1}
                onChange={(e) => {
                  searchHandler(e.target.value);
                }}
              />
            </FormControl>
            {loading ? (
              <Spinner size={"lg"} />
            ) : (
              searchResult.map((user) => {
                if (!selectedChat.users.find((u) => u._id === user._id)) {
                  return (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={addUserHandler.bind(null, user)}
                    />
                  );
                }
              })
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={removeHandler(user)}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdategroupChatModel;
