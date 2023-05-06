import { Box, Button, HStack, ScrollView, Text } from "native-base";
import React from "react";
import { Pressable } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { AuthContext } from "../../../Helper/Auth";

export default function Orders() {
  const [orders, setOrders] = React.useState([]);
  const { userInfo } = React.useContext(AuthContext);
  const navigation = useNavigation();
  React.useEffect(() => {
    const fetchOrder = () => {
      axios
        .get("http://192.168.100.78:3001/getAllOrders?id="+userInfo._id)
        .then((res) => {
          console.log(res.data);
          setOrders(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchOrder();

    const unsubscribe = navigation.addListener("focus", () => {
      fetchOrder();
    });
    return unsubscribe;
  }, []);

  return (
    <Box h="full" bg="white" pt={5}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* PAID ORDER */}
        {orders.map((order) => (
          <Pressable>
            <HStack
              space={4}
              justifyContent="space-between"
              alignItems="center"
              bg="gray.200"
              py={5}
              px={2}
            >
              <Text fontSize={10} color="blue.400" isTruncated>
                {order._id.slice(0, 6)}
              </Text>
              <Text fontSize={12} color="black" bold isTruncated>
                {order?.isPaid ? "Paid" : "Not Paid"}
              </Text>
              <Text fontSize={11} color="black" italic isTruncated>
                {new Date(order?.updatedAt).toDateString()}
              </Text>
              <Button
                px={7}
                py={1.5}
                rounded={50}
                bg="amber.900"
                _text={{ color: "white" }}
                _pressed={{ bg: "green.100" }}
              >
                {order?.TotalPrice}
              </Button>
            </HStack>
          </Pressable>
        ))}
        {/* PAID ORDER */}
      </ScrollView>
    </Box>
  );
}
