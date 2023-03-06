import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Login from "../Components/Login";
import Signup from "../Components/Signup";

const Homepage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        backgroundColor={"whiteAlpha.500"}
        borderRadius={"5"}
        width={"100%"}
        margin={"40px 0px 10px 0"}
        borderWidth={"1px"}
        p={3}>
        <Text fontSize={"3xl"} fontFamily={"work sans"}>
          Chat-Box
        </Text>
      </Box>
      <Box
        d="flex"
        justifyContent="center"
        backgroundColor={"whiteAlpha.500"}
        borderRadius={"5"}
        width={"100%"}
        borderWidth={"1px"}
        p={3}>
        <Tabs variant="soft-rounded" colorScheme="teal">
          <TabList>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
