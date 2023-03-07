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
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confPassword, setConfPassword] = useState(null);
  const [pic, setPic] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  const postDetails = async (pics) => {
    try {
      setLoading(true);
      if (pics === undefined) {
        toast({
          status: "warning",
          title: "Please Select an Image",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }

      if (pics.type === "image/jpeg" || pics.type === "image/png") {
        const postdata = new FormData();
        postdata.append("file", pics);
        postdata.append("upload_preset", "chatbox");
        const { data } = await axios.post(
          "https://api.cloudinary.com/v1_1/dv7krzlua/image/upload",
          postdata
        );
        setPic(data.url);
        console.log(data);
        setLoading(false);
      } else {
        console.log("not image");
      }
    } catch (e) {
      console.log(e);
      toast({
        status: "warning",
        title: "Image not uploaded",
        duration: 4000,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password) {
      toast({
        title: "Please enter all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    if (password !== confPassword) {
      toast({
        title: "Enter Correct Password",
        status: "error",
        duration: 2000,
      });
      setLoading(false);
      return;
    }
    try {
      const obj = pic
        ? {
            name,
            email,
            password,
            pic,
          }
        : {
            name,
            email,
            password,
          };
      const { data } = await axios.post("/api/user", obj);
      toast({
        title: "Account Created",
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
            postDetails(e.target.files[0]);
          }}
        />
      </FormControl>
      <Button
        colorScheme="teal"
        width={"100%"}
        style={{ marginTop: 15 }}
        isLoading={loading}
        onClick={submitHandler}>
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
