import {
  Box,
  HStack,
  Input,
  Text,
  VStack,
  Flex,
  ScrollView,
} from "native-base";
import { Pressable } from "react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "react-native-dynamic-search-bar";
import { useSelector } from "react-redux";
function HomeSearch({ setSearchText }) {
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

  const onSearch = (text) => {
    setSearchText(text);
  };
  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text
              style={{
                position: "absolute",
                fontWeight: "bold",
                size: 30,
                color: "white",
              }}
              fontSize="xl"
            >
              E-Mobile
            </Text>
          </View>
          <View style={{ marginRight: 50 }}>
            <Pressable
              style={{ position: "absolute" }}
              onPress={() => navigation.navigate("Cart")}
            >
              <Feather name="shopping-cart" size={24} />
              <Box
                px={2}
                zIndex={1}
                position="absolute"
                top={-13}
                left={4}
                bg="#ff0000"
                _text={{ color: "white", fontSize: "11px" }}
              >
                {res.length}
              </Box>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            marginTop: -20,
            boxShadow: 60,
            shadowOpacity: 0.7,
            shadowColor: "gray",
          }}
        >
          <SearchBar
            fontColor="#c6c6c6"
            iconColor="#c6c6c6"
            shadowColor="gray"
            cancelIconColor="#c6c6c6"
            backgroundColor="white"
            placeholder="Search here"
            onChangeText={(text) => {
              onSearch(text);
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeSearch;
const styles = StyleSheet.create({
  container: {
    color: "white",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#008CBA",
    height: 100,
    paddingTop: 20,
    paddingBottom: 40,
    alignContent: "center",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
});
