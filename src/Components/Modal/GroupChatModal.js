import {
  Box,
  Button,
  FormControl,
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

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  //   const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const { user, chats, setChats } = ChatState();

  const searchHandler = async (query) => {
    if (!query) return;
    try {
      setLoading(true);

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

  const submitHandler = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const postData = {
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map((u) => u._id)),
      };

      console.log(postData);
      const { data } = await axios.post(`/api/chat/group`, postData, config);
      console.log(data);
      setChats([data, ...chats]);
      toast({
        title: "New Group Chat Created !!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      onClose();
    } catch (e) {
      console.log(e);
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

  const deleteHandler = (userToDelete) => {
    setSelectedUsers(
      selectedUsers.filter((user) => user._id !== userToDelete._id)
    );
  };

  const addUserHandler = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedUsers([userToAdd, ...selectedUsers]);
  };
  return (
    <div>
      <span onClick={onOpen}>{children}</span>
      {/* {children} */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"35px"}
            fontFamily="Work sans"
            display={"flex"}
            justifyContent="center">
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir="column" alignItems={"center"}>
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => {
                  setGroupChatName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users"
                mb={1}
                onChange={(e) => {
                  searchHandler(e.target.value);
                }}
              />
            </FormControl>
            <Box
              display={"flex"}
              w={"100%"}
              flexWrap="wrap"
              justifyContent="left"
              m={3}>
              {selectedUsers.map((user) => {
                return (
                  <UserBadgeItem
                    user={user}
                    key={user._id}
                    handlerFunction={deleteHandler.bind(null, user)}
                  />
                );
              })}
            </Box>
            {loading && <Spinner color="teal" size={"lg"} />}

            {searchResult.slice(0, 4).map((user) => {
              return (
                <UserListItem
                  user={user}
                  handleFunction={addUserHandler.bind(null, user)}
                  key={user._id}
                />
              );
            })}

            {/* Selected User */}
            {/* render Users */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={submitHandler}>
              Create Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default GroupChatModal;
// function BasicUsage() {
//   return (
//     <>
//       <Button onClick={onOpen}>Open Modal</Button>
//     </>
//   );
// }
