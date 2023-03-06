import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const submitHandler = () => {};

  return (
    <VStack spacing={"5px"}>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeContent={"Enter Your Email"}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "" : "password"}
            placeContent={"Enter Your Password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputRightElement width={"4.5rem"}>
            <Button
              h={"1.75rem"}
              size={"sm"}
              onClick={() => {
                setShow(!show);
              }}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="teal"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}>
        Log In
      </Button>
      <Button
        style={{ marginTop: 15, background: "#F9BCBA" }}
        // variant={"solid"}
        // colorScheme="red"
        width={"100%"}
        onClick={() => {
          setEmail("guest@email.com");
          setPassword("123456");
        }}>
        Log In As Guest
      </Button>
    </VStack>
  );
};

export default Login;
