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

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [pic, setPic] = useState("");

  const postDetails = () => {};

  const submitHandler = () => {
    const obj = {
      name,
      email,
      password,
      pic
    };
    console.log(obj);
  };

  return (
    <VStack spacing={"5px"}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeContent={"Enter Your Name"}
          onChange={(e) => {
            setName(e.target.value);
          }}></Input>
      </FormControl>
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
      <FormControl id="confpassword" isRequired>
        <FormLabel>Conform Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeContent={"Enter Your Password"}
            onChange={(e) => {
              setConfPassword(e.target.value);
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
      <FormControl id="pic">
        <FormLabel>Add Your Picture</FormLabel>
        <Input
          type="File"
          accept="image/*"
          placeContent={"Enter Your Email"}
          onChange={(e) => {
            setPic(e.target.files[0]);
          }}
        />
      </FormControl>
      <Button
        colorScheme="teal"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}>
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
