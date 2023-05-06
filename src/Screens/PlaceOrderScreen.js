import React from "react";
import { Box, Button, Heading, ScrollView } from "native-base";
import Orderinfo from "../Components/Profile/Orderinfo";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import OrderItems from "../Components/OrderItems";
import PlaceOrderModel from "../Components/PlaceOrderModel";
import { useSelector } from "react-redux";
import axios from "axios";
import { AuthContext } from "../../Helper/Auth";
function PlaceOrderScreen({ route }) {
  const { shippingAddress } = route.params;
  const { userInfo } = React.useContext(AuthContext);
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
  const order = {
    user: userInfo._id,
    orderItems: res.map((item) => {
      return item._id;
    }),
    shippingAddress: shippingAddress,
    totalPrice: total,
    paymentMethod: "Cash on delivery",
  };
  const placeOrder = async () => {
    console.log("ordered");
    try {
      const data = await axios.post(
        "http://192.168.100.78:3001/placeOrder",
        order,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      alert("Order placed successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box flex={1} safeArea pt={6} bg="white">
      <Box>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Orderinfo
            title="CUSTOMER"
            subTitle={"Mr. " + userInfo.Name}
            text={userInfo.Name + "@gmail.com"}
            icon={<FontAwesome name="user" size={30} color="white" />}
          />
          <Orderinfo
            title="SHIPPING INFO"
            subTitle={"Shipping: " + shippingAddress}
            text="Payment method: Cash on delivery"
            icon={<FontAwesome5 name="shipping-fast" size={30} color="white" />}
          />
        </ScrollView>
      </Box>
      {/* ORDER ITEMS */}
      <Box px={6} flex={1} pb={3}>
        <Heading bold isTruncated fontSize={15} my={4}>
          PRODUCTS
        </Heading>
        <OrderItems />
        {/* TOTAL */}
        <Box
          bg="blue.100"
          shadow={1}
          rounded={10}
          overflow="hidden"
          mt={3}
          p={3}
          flexDirection="row"
          justifyContent="space-between"
        >
          <Heading bold isTruncated fontSize={15} my={4}>
            TOTAL
          </Heading>
          <Heading bold isTruncated fontSize={15} my={4}>
            ${total}
          </Heading>
        </Box>
        <Button
          bg="#008CBA"
          rounded={10}
          shadow={1}
          _text={{ color: "white" }}
          mt={3}
          onPress={async () => {
            await placeOrder();
          }}
        >
          Place Order
        </Button>
      </Box>
    </Box>
  );
}

export default PlaceOrderScreen;
