import React from "react";
import { Box, Heading, ScrollView } from "native-base";
import Orderinfo from "../Components/Profile/Orderinfo";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import OrderItems from "../Components/OrderItems";
import PlaceOrderModel from "../Components/PlaceOrderModel";
import OrderModel from "../Components/OrderModel";

function OrderScreen({ route }) {
  const { shippingAddress } = route.params;
  return (
    <Box flex={1} safeArea pt={6} bg="amber.100">
      <Box>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Orderinfo
            title="SHIPPING INFO"
            success
            subTitle="Shipping: Pakistan"
            text="Pay Method: EasyPaisa"
            icon={<FontAwesome5 name="shipping-fast" size={30} color="white" />}
          />
          <Orderinfo
            title="DELIVER TO"
            danger
            subTitle="Address:"
            text={shippingAddress}
            icon={<Ionicons name="location-sharp" size={30} color="white" />}
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
        <OrderModel />
      </Box>
    </Box>
  );
}

export default OrderScreen;
