import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const submitHandler = async () => {
    setLoading(true);
    try {
      const obj = {
        email,
        password,
      };
      const { data } = await axios.post("/api/user/login", obj);

      toast({
        title: "Login Succesfully",
        status: "success",
        duration: 5000,
      });

      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      setLoading(false);
      navigate("/chat");
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast({
        title: "Some Error occured",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
        isLoading={loading}
        style={{ marginTop: 15 }}
        onClick={submitHandler}>
        Log In
      </Button>
    </VStack>
  );
};

export default Login;
