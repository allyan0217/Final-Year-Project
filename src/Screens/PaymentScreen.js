import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Image,
  Input,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from "native-base";
import React from "react";
import Buttone from "../Components/Buttone";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const paymentMethodes = [
  {
    image: require("../assests/pics/cash-on-delivery.png"),
    alt: "cod",
    icon: "Ionicons",
  },
];

function PaymentScreen({ route }) {
  const navigation = useNavigation();
  const { shippingAddress } = route.params;
  return (
    <Box flex={1} safeAreaTop bg="#008CBA" py={5}>
      {/* HEADER */}
      <Center pb={15}>
        <Text color="black" fontSize={14} bold>
          PAYMENT METHOD
        </Text>
      </Center>
      {/* SELECTION */}
      <Box h="full" bg="white" px={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={6} mt={5}>
            {paymentMethodes.map((i, index) => (
              <HStack
                key={index}
                alignItems="center"
                bg="blue.100"
                px={3}
                py={1}
                justifyContent="space-between"
                rounded={10}
              >
                <Box>
                  <Image
                    source={i.image}
                    alt={i.alt}
                    resizeMode="contain"
                    w={60}
                    h={50}
                  />
                </Box>
                <Text bold> Cash on delivery </Text>
                {i.icon === "Ionicons" ? (
                  <Ionicons name="checkmark-circle" size={30} color="#008CBA" />
                ) : (
                  <FontAwesome name="circle-thin" size={30} />
                )}
              </HStack>
            ))}
            <Button
              onPress={() =>
                navigation.navigate("Placeorder", {
                  shippingAddress,
                })
              }
              bg="#008CBA"
              color="white"
              mt={5}
            >
              CONTINUE
            </Button>
            <Text italic textAlign="center">
              Payment method is <Text bold>"Cash on delivery" </Text>by default
            </Text>
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
}

export default PaymentScreen;
