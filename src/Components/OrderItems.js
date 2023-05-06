import {
  Box,
  Button,
  Center,
  FlatList,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { products } from "../data/Products";
import { useSelector } from "react-redux";


const OrderItems = () => {
  const BasketItems = useSelector((state) => state.Basket);
  const res = [];
  BasketItems.forEach((el) => {
    const index = res.findIndex((obj) => {
      return obj["name"] === el.name;
    });
    if (index === -1) {
      res.push({
        name: el.name,
        img: el.img,
        price: el.price,
        count: 1,
        _id: el._id,
      });
    } else {
      res[index]["count"]++;
    }
  });
  var total = 0;
  res.map((object) => {
    total += object.price * object.count;
  });
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={res}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <Pressable>
          <Box mb={3}>
            <HStack
              alignItems="center"
              bg="white"
              shadow={9}
              rounded={10}
              overflow="hidden"
            >
              <Center w="25%" bg="white">
                <Image
                  source={{ uri: item.img }}
                  alt={item.name}
                  w="full"
                  h={24}
                  resizeMode="contain"
                />
              </Center>
              <VStack px={2} w="60%">
                <Text isTruncated color="black" bold fontSize={12}>
                  {item.name}
                </Text>
                <Text mt={2} color="black" bold>
                  ${item.price}
                </Text>
              </VStack>
              <Center>
                <Button
                  bg="#008CBA"
                  _pressed={{ bg: "blue.100" }}
                  _text={{ color: "white" }}
                >
                  {item?.count}
                </Button>
              </Center>
            </HStack>
          </Box>
        </Pressable>
      )}
    />
  );
};

export default OrderItems;
