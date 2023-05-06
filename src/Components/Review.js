import React, { useState } from "react";
import {
  Box,
  Button,
  CheckIcon,
  FormControl,
  Heading,
  Select,
  Text,
  TextArea,
  VStack,
} from "native-base";
import { Alert } from "react-native";
import Rating from "./Rating";
import Message from "./Notifications/Message";
import Buttone from "./Buttone";
import axios from "axios";
import { AuthContext } from "../../Helper/Auth";
import { View } from "react-native-animatable";

export default function Review({ product }) {
  const [ratings, setRatings] = useState("");
  const [comment, setComment] = useState("");
  const { userInfo } = React.useContext(AuthContext);

  const addComment = async () => {
    console.log(ratings);
    try {
      const data = await axios.post("http://192.168.100.78:3001/addReview", {
        rating: ratings,
        comment,
        user: userInfo._id,
        id: product?._id,
      });
      Alert.alert("Review Added");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box my={9}>
      <Heading bold fontSize={15} mb={2}>
        Review
      </Heading>

      {/* IF THERE IS NO REVIEW */}
      {/* <Message color={"black"} bg="grey" size={13} bold children={"No Review"} /> */}

      {/* REVIEW */}
      {product.reviews.length > 0 ? (
        product?.reviews?.map((review) => (
          <Box p={5} bg="#E0E0E0" mt={5} mx={5} rounded={3}>
            <Heading bold fontSize={15} color="black">
              {" "}
              Mr. {review?.User?.Username}{" "}
            </Heading>{" "}
            <Rating value={review.rating} />
            <Text my={3}>{new Date(review.createdAt).toDateString()}</Text>
            <Message
              color="black"
              bg="white"
              size={12}
              children={
                review?.comment ? review?.comment : "No Comment for this review"
              }
            />
          </Box>
        ))
      ) : (
        <Message
          color={"black"}
          bg="grey"
          size={13}
          bold
          children={"No Review"}
        />
      )}

      {/* WRITE REVIEW */}
      <Heading my={6} fontSize={14} color="black" bold mb={4}>
        REVIEW THIS PRODUCT
      </Heading>
      <Box mt={6}>
        <VStack space={6}>
          <FormControl>
            <FormControl.Label _text={{ fontSize: "12px", fontWeight: "bold" }}>
              Rating
            </FormControl.Label>
            <Select
              bg="blue.100"
              borderWidth={0}
              rounded={5}
              py={3}
              placeholder="choose Rate"
              _selectedItem={{
                bg: "coolGray.400",
                endIcon: <CheckIcon size={5} />,
                justifyContent: "center",
                alignItems: "center",
              }}
              selectedValue={ratings}
              onValueChange={(e) => setRatings(e)}
            >
              <Select.Item label="1 - Poor" value="1" />
              <Select.Item label="2 - Good" value="2" />
              <Select.Item label="3 - Best" value="3" />
              <Select.Item label="4 - Excellent" value="4" />
            </Select>
          </FormControl>
          <FormControl>
            <FormControl.Label _text={{ fontSize: "12px", fontWeight: "bold" }}>
              Comment
            </FormControl.Label>
            <TextArea
              h={20}
              w="full"
              placeholder="Comment Here... "
              borderWidth={0}
              py={4}
              bg="blue.100"
              _focus={{ bg: "blue.100" }}
              value={comment}
              onChangeText={(e) => setComment(e)}
            ></TextArea>
          </FormControl>

          <View alignItems={"center"} justifyContent={"center"}>
            <Button
              color="white" width={100} alignItems={"center"} justifyContent={"center"}
              onPress={async () => {
                console.log("here");
                if (ratings !== "" && comment !== "") {
                  await addComment();
                } else {
                  Alert.alert("Please Fill All Fields");
                }
              }}
            >
              SUBMIT
            </Button>
          </View>
          

          {/* IF USER NOT LOGIN */}
          {/* <Message
            color="white"
            bg="black"
            children={"Please 'Login to write a Review'"}
          /> */}
        </VStack>
      </Box>
    </Box>
  );
}
