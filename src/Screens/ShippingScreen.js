import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React from "react";
import Buttone from "../Components/Buttone";



function ShippingScreen() {
  const navigation = useNavigation();
  const [shippingAddress, setShippingAddress] = React.useState("");
  return (
    <Box flex={1} safeAreaTop bg="#008CBA" py={5}>
      {/* HEADER */}
      <Center pb={15}>
        <Text color="black" fontSize={14} bold>
          {" "}
          DELIVERY ADDRESS{" "}
        </Text>
      </Center>
      {/* INPUT */}
      <Box h="full" bg="white" px={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={6} mt={5}>
            <Input
              borderWidth={0.2}
              borderColor="amber.900"
              bg="blue.100"
              py={4}
              type={"text"}
              color="black"
              _focus={{
                bg: "blue.100",
                borderWidth: 1,
                borderColor: "black",
              }}
              placeholder="Enter Shipping Address"
              value={shippingAddress}
              onChangeText={(text) => setShippingAddress(text)}
            />
            <Button
              onPress={() => {
                if (shippingAddress === "") {
                  alert("Please Enter Shipping Address");
                  return;
                }
                navigation.navigate("Checkout", {
                  shippingAddress,
                });
              }}
              bg="#008CBA"
              color="white"
              mt={5}
            >
              CONTINUE
            </Button>
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
}

export default ShippingScreen;
