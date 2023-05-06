import React from "react";
import { Text, Box, Center, ScrollView, HStack, Button } from "native-base";
import CartEmpty from "../Components/Notifications/CartEmpty";
import CartItems from "../Components/Notifications/CartItems";
import Buttone from "../Components/Buttone";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RemoveBasket } from "../features/slice/BasketManagement";
function CartScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const BasketItems = useSelector((state) => state.Basket);
  const res = [];
  console.log(BasketItems);
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
      });
    } else {
      res[index]["count"]++;
    }
  });
  var total = 0;
  res.map((object) => {
    total += object.price * object.count;
  });
  const MinusButtonHandler = (Count, Name) => {
    console.log(Name);
    if (Count > 0) {
      dispatch(RemoveBasket(Name));
    }
  };
  return (
    <Box flex={1} bg="#f56" safeArea>
      {/* HEADER */}
      <Center w="full" py={5}>
        {" "}
        <Text color={"#008CBA"} fontSize={20} bold>
          Cart
        </Text>
      </Center>

      {/* IF CART IS EMPTY */}
      {/* <CartEmpty/> */}

      {/* CART ITEM */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <CartItems basket={res} remove={MinusButtonHandler} />
        {/* BUTTONS */}
        {/* TOTAL */}
        <Center mt={5} bg="black" px={1} mx={1} rounded={30} >
          <HStack
            rounded={30}
            justifyContent="space-between"
            bg="#fff"
            shahdow={30}
            w="90%" 
            pl={5}
            h={45}
            alignItems="center"
          >
            <Text>total:$</Text>
            <Button
              px={10}
              h={45}
              rounded={50}
              bg="#008CBA"
              _text={{ color: "white", fontWeight: "semibold" }}
              _pressed={{ color: "blue.100" }}
            >
              {total}
            </Button>
          </HStack>
        </Center>
        {/* CHECKOUT */}
        <Center px={3}>
          <Button
            onPress={() => navigation.navigate("Shipping")}
            bg="#008CBA"
            color="white"
            mt={10}
          >
            CHECKOUT
          </Button>
        </Center>
      </ScrollView>
    </Box>
  );
}

export default CartScreen;
