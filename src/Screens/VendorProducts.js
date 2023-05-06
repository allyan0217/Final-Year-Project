import React from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import { Button } from "native-base";
import { useState } from "react";
import axios from "axios";

const VendorProductList = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  React.useEffect(() => {
    const fetchproducts = () => {
      axios
        .get("http://192.168.100.78:3001/productInfo")
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    fetchproducts();

    //focus
    const unsubscribe = navigation.addListener("focus", () => {
      fetchproducts();
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vendor Product List</Text>
      <Button
        onPress={() => navigation.navigate("UploadProduct")}
        style={{ marginBottom: 20 }}
      >
        <Text>Add Product</Text>
      </Button>

      <View style={styles.productList}>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <View style={styles.product}>
              <Image
                source={{ uri: item.Image }}
                style={styles.productImage}
              ></Image>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.Name}</Text>
                <Text style={styles.productPrice}>{item.Price}</Text>
                <Text style={styles.productDescription}>{item.rating}</Text>
                <Button
                  onPress={() => {
                    axios
                      .delete(
                        `http://192.168.100.78:3001/deleteProduct?id=${item._id}`
                      )
                      .then((res) => {
                        console.log(res.data);
                        setProducts(res.data);
                      })
                      .catch((err) => {
                        console.log(err.response);
                      });
                  }}
                >
                  <Text>Delete</Text>
                </Button>
              </View>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 70,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  productList: {
    width: "100%",
    paddingBottom: 70,
  },
  product: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginLeft: 20,
    marginRight: 20,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginTop: 20,
  },
  productInfo: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
  productDescription: {
    fontSize: 15,
    color: "gray",
  },
});

export default VendorProductList;
