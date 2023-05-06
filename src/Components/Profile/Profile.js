import {
  Box,
  Button,
  FormControl,
  Input,
  ScrollView,
  VStack,
} from "native-base";
import React from "react";
import Buttone from "../Buttone";
import { AuthContext } from "../../../Helper/Auth";
import axios from "axios";
import { Alert } from "react-native";

const Inputs = [
  { label: "USERNAME", type: "text" },
  { label: "EMAIL", type: "text" },
  { label: "NEW PASSWORD", type: "password" },
  { label: "CONFIRM PASSWORD", type: "password" },
];

export default function Profile() {
  const { userInfo, Logout, Login } = React.useContext(AuthContext);
  const [name, setName] = React.useState(userInfo?.Name);
  const [phone, setPhone] = React.useState(userInfo?.Phone);

  const handleUpdate = async () => {
    try {
      const data = {
        name: name,
        phone: phone,
        id: userInfo?._id,
      };
      const res = await axios.post(
        "http://192.168.100.78:3001/updateProfile",
        data
      );
      Login({
        _id: userInfo._id,
        token: userInfo.token,
        Name: name,
        Phone: phone,
      });
      Alert.alert("Profile Updated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box h="full" bg="white" px={5}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space={10} mt={5} pb={10}>
          <Input
            borderColor="black"
            borderWidth={0.5}
            bg="green.100"
            type={"text"}
            placeholder={"USERNAME"}
            py={3}
            value={name}
            onChangeText={(text) => setName(text)}
            color="amber.900"
            fontSize={15}
            _focus={{
              bg: "green.400",
              borderColor: "black",
              borderWidth: 1,
            }}
          />
          <Input
            borderColor="black"
            borderWidth={0.5}
            bg="green.100"
            type={"text"}
            placeholder={"Phone"}
            value={phone}
            onChangeText={(text) => setPhone(text)}
            py={3}
            color="amber.900"
            fontSize={15}
            _focus={{
              bg: "green.400",
              borderColor: "black",
              borderWidth: 1,
            }}
          />
          <Button
            bg="green.400"
            _text={{ color: "white" }}
            onPress={handleUpdate}
          >
            Update
          </Button>
          <Button bg="green.400" _text={{ color: "white" }} onPress={Logout}>
            Logout
          </Button>
        </VStack>
      </ScrollView>
    </Box>
  );
}
