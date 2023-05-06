import React, { useState } from "react";
import { Text, Box, ScrollView, Image, Heading, HStack, Spacer, Button,View,} from "native-base";
import Rating from "../Components/Rating";
import NumericInput from "react-native-numeric-input";
import { TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Buttone from "../Components/Buttone";
import Review from "../Components/Review";
import { AddBasket, RemoveBasket } from "../features/slice/BasketManagement";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
function SingleProductScreen({ route }) {
  const dispatch = useDispatch();
  const Basket = useSelector((state) => state.Basket);
  const [quantityCount, setquantityCount] = useState(0);
  const [value, setValue] = useState(0);
  const navigation = useNavigation();
  const product = route.params;
  const PlusButtonHandler = () => {
    setquantityCount(quantityCount + 1);
    dispatch(
      AddBasket({
        name: product.Name,
        img: product.Image,
        price: product.Price,
        _id: product._id,
      })
    );
  };
  const MinusButtonHandler = () => {
    if (quantityCount > 0) {
      setquantityCount(quantityCount - 1);
      dispatch(RemoveBasket(product.Name));
    } else {
      setquantityCount(0);
    }
  };
  console.log(product);
  return (
    <>
      <Box safeArea flex={1} bg="white">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            style={{ resizeMode: "contain" }}
            source={{ uri: product?.Image }}
            alt="Image"
            w="full"
            h={200}
          />

          <View px={5}>
            <Heading bold fontSize={20} mt={4} isTruncated lineHeight={40}>
              {product.Name}{" "}
            </Heading>
            <Rating value={product.rating} text={`${product.rating} reviews`} />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <View style={{ display: "flex", flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ marginRight: 10 }}
                  onPress={MinusButtonHandler}
                >
                  <MinusCircleIcon size={40} color="#5DCBEF" />
                </TouchableOpacity>
                <Text>{quantityCount}</Text>
                <TouchableOpacity
                  style={{ marginLeft: 10 }}
                  onPress={PlusButtonHandler}
                >
                  <PlusCircleIcon size={40} color="#5DCBEF" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/2076/2076218.png",
                  }}
                  style={{ height: 30, width: 30 }}
                />
              </TouchableOpacity>
            </View>
            <HStack alignItems="center" my={5}>
              {product.countInStock > 0 ? (
                <NumericInput
                  value={value}
                  totalWidth={120}
                  totalHeight={30}
                  iconSize={25}
                  step={1}
                  maxValue={product.countInStock}
                  minValue={0}
                  borderColor="grey"
                  textColor={"green"}
                  iconStyle={{ color: "red" }}
                  rightButtonBackgroundColor="yellow"
                  leftButtonBackgroundColor="yellow"
                />
              ) : (
                <Heading bold color={"black"} fontSize={20}>
                  Price:
                </Heading>
              )}
              <Spacer />
              <Heading bold color={"black"} fontSize={20}>
                ${product.Price}
              </Heading>
            </HStack>
            <Text lineHeight={24} fontSize={12}>
              {product.description}
            </Text>
            {/* <Buttone onPress={()=>navigation.navigate("Cart")} color="white">Add to cart</Buttone> */}
            <Button onPress={() => navigation.navigate("Cart")} color="white">
              Add to Cart
            </Button>
          </View>

          <Review product={product}  />
        </ScrollView>
      </Box>
    </>
  );
}

export default SingleProductScreen;
