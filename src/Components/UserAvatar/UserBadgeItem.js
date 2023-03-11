import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";

const UserBadgeItem = ({ user, handlerFunction }) => {
  return (
    <Box
      px={2}
      fontSize={12}
      background="teal.100"
      py={1}
      borderRadius="lg"
      m={1}
      cursor="pointer"
      onClick={handlerFunction}
      alignItems="center"
      mb={2}>
      {user.name}
      <CloseIcon ml={2} boxSize="2" />
    </Box>
  );
};

export default UserBadgeItem;
