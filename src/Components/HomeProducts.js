import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Heading } from "native-base";
import React from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useEffect } from "react";
import { products } from "../data/Products.js";
import Rating from "./Rating.js";
import Axios from "axios";
import { useState } from "react";
import { getIpAddressAsync } from "expo-network";
import { AuthContext } from "../../Helper/Auth.js";
function HomeProducts({ getSearchText }) {
  const { userInfo } = React.useContext(AuthContext);
  const [Products, setProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [recommended, setRecommended] = useState(null);
  useEffect(() => {
    const fetchProducts = () => {
      Axios.get("http://192.168.100.78:3001/productInfo").then((result) => {
        console.log(result.data);
        setProducts(result.data);
      });
      Axios.get("http://192.168.100.78:3001/recommendation?id="+userInfo._id).then((result) => {
        console.log(result.data);
        setRecommended(result.data);
      });
    };
    fetchProducts();
    const unsubscribe = navigation.addListener("focus", () => {
      fetchProducts();
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (getSearchText.length > 0) {
      console.log(getSearchText);
      const filteredProducts = Products.filter((product) => {
        return product.Name.toLowerCase().includes(getSearchText.toLowerCase());
      });
      console.log(filteredProducts);
      setSearchedProducts(filteredProducts);
    }
  }, [getSearchText]);

  const navigation = useNavigation();
  return (
    <>
      <Heading style={{ marginLeft: 20, marginTop: 20 }}>Recommended</Heading>
      <TouchableOpacity
        onPress={() => navigation.navigate("Single", recommended)}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <Image
            source={{
              uri: recommended ? recommended.Image : null,
            }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 10,
              marginTop: 20,
            }}
          ></Image>
          <View
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {recommended ? recommended.Name : null}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              ${recommended ? recommended.Price : null}
            </Text>
            <Rating value={recommended ? recommended.rating : null} />
            <Text style={{ color: "black" }}>
              {recommended ? recommended.reviews.length : null} reviews
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Heading style={{ marginLeft: 20, marginTop: 20 }}>Products</Heading>
      {getSearchText.length > 0
        ? searchedProducts.map((product) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Single", product)}
            >
              <View style={{ display: "flex", alignItems: "center" }}>
                <View
                  style={{
                    width: "95%",
                    backgroundColor: "#FFF",
                    borderRadius: 10,
                    marginBottom: 20,
                    flexDirection: "row",
                  }}
                >
                  <View style={{ flex: 0.6 }}>
                    <Image
                      source={{
                        uri: product?.Image,
                      }}
                      style={styles.image}
                    ></Image>
                  </View>
                  <View style={{ flex: 0.4, justifyContent: "center" }}>
                    <View
                      style={{
                        fontSize: 4,
                        color: "black",
                      }}
                    >
                      <Text style={styles.text}>{product.Name}</Text>
                      <Text style={styles.paragraph}>${product.Price}</Text>
                      <Rating value={product.rating} />
                      <Text style={{ color: "black" }}>
                        {product.reviews.length} reviews
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        : Products.map((product) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Single", product)}
            >
              <View style={{ display: "flex", alignItems: "center" }}>
                <View
                  style={{
                    width: "95%",
                    backgroundColor: "#FFF",
                    borderRadius: 10,
                    marginBottom: 20,
                    flexDirection: "row",
                  }}
                >
                  <View style={{ flex: 0.6 }}>
                    <Image
                      source={{
                        uri: product.Image,
                      }}
                      style={styles.image}
                    ></Image>
                  </View>
                  <View style={{ flex: 0.4, justifyContent: "center" }}>
                    <View
                      style={{
                        fontSize: 4,
                        color: "black",
                      }}
                    >
                      <Text style={styles.text}>{product.Name}</Text>
                      <Text style={styles.paragraph}>${product.Price}</Text>
                      <Rating value={product.rating} />
                      <Text style={{ color: "black" }}>
                        {product.reviews.length} reviews
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
    </>
  );
}

export default HomeProducts;
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: "100%",
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
  paragraph: {
    color: "black",
  },
  image: {
    backgroundColor: "rgba(0,0,0,1)",
    height: 130,
    // width: '50%',
    margin: 10,
    opacity: 0.5,
    borderRadius: 10,
    resizeMode: "contain",
  },
});
