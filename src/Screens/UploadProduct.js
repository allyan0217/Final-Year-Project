import React from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const App = () => {
  const formData = new FormData();
  const [photo, setPhoto] = React.useState(null);

  const [photoShow, setPhotoShow] = React.useState(null);
  const [Uri, setUri] = useState("");
  const [Name, setName] = React.useState("");
  const [Price, setPrice] = React.useState(0);
  const [rating, setrating] = React.useState(0.0);
  const [imageUploading, setImageUploading] = React.useState(false);
  const cloudinaryUpload = async (photo) => {
    setImageUploading(true);
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "dtgumos3");
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dudpldhbr/upload",
        {
          body: data,
          headers: {
            "content-type": "multipart/form-data",
          },
          method: "POST",
        }
      );
      const res_json = await res.json();
      setImageUploading(false);
      return res_json.secure_url;
    } catch (error) {
      console.error(error);
    }
  };
  const takePhotoAndUpload = async (event) => {
    event.preventDefault();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.cancelled) {
      return;
    }
    let localUri = result.uri;
    const source = {
      uri: result.uri,
      type: "image/jpeg",
      name: result.uri.split("/ImagePicker/")[1],
    };
    setPhotoShow(source);

    // let filename = localUri.split('/').pop();
    // let match = /\.(\w+)$/.exec(filename);
    // let type = match ? `image/${match[1]}` : `image`;
  };

  const uploadProduct = async () => {
    const image = await cloudinaryUpload(photoShow);
    await axios
      .post("http://192.168.100.78:3001/addProduct", {
        Name: Name,
        Image: image,
        Price: Price,
        rating: rating,
      })
      .then((res) => {
        Alert.alert("Product Added");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const productNameHandler = (val) => {
    setName(val);
  };
  const productPriceHandler = (val) => {
    setPrice(val);
  };
  const productRatingHandler = (val) => {
    setrating(val);
  };

  return (
    <View style={styles.mainBody}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Add Product</Text>
      </View>

      {photoShow ? (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: photoShow.uri }}
            style={{ width: "100%", height: 350 }}
          />
        </View>
      ) : (
        <View
          style={{
            width: "100%",
            height: 350,
            backgroundColor: "gray",
            borderRadius: 30,
          }}
        >
          <Image
            source={{
              uri: "https://tse3.mm.bing.net/th?id=OIP.wZ5875hGQzQGIIVwcnkNXwHaHa&pid=Api&P=0",
            }}
            style={{ width: "100%", height: 350, borderRadius: 30 }}
          />
        </View>
      )}

      <TextInput
        placeholder="Your product name"
        name="Name"
        style={styles.input}
        placeholderTextColor="#666666"
        onChangeText={(val) => productNameHandler(val)}
      />
      <TextInput
        placeholder="Your product Price"
        name="Price"
        style={styles.input}
        placeholderTextColor="#666666"
        onChangeText={(val) => productPriceHandler(val)}
      />
      <TextInput
        placeholder="Your product rating"
        name="rating"
        style={styles.input}
        placeholderTextColor="#666666"
        type="number"
        onChangeText={(val) => productRatingHandler(val)}
      />
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={takePhotoAndUpload}
      >
        <Text style={styles.buttonTextStyle}>Upload Image</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={uploadProduct}
      >
        <Text style={styles.buttonTextStyle}>
          {imageUploading ? "Uploading..." : "Upload Product"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,

    justifyContent: "center",

    padding: 20,
  },

  buttonStyle: {
    backgroundColor: "#307ecc",

    borderWidth: 0,

    color: "#FFFFFF",

    borderColor: "#307ecc",

    height: 40,

    alignItems: "center",

    borderRadius: 30,

    marginLeft: 35,

    marginRight: 35,

    marginTop: 15,
  },

  buttonTextStyle: {
    color: "#FFFFFF",

    paddingVertical: 10,

    fontSize: 16,
  },

  textStyle: {
    backgroundColor: "#fff",

    fontSize: 15,

    marginTop: 16,

    marginLeft: 35,

    marginRight: 35,

    textAlign: "center",
  },

  imageContainer: {
    justifyContent: "center",

    alignItems: "center",

    borderWidth: 1,

    borderColor: "#d9d6d6",

    shadowColor: "#000",

    shadowOffset: { width: 0, height: 1 },

    shadowOpacity: 0.8,

    shadowRadius: 2,

    elevation: 5,
  },

  titleContainer: {
    alignItems: "center",

    marginBottom: 30,
  },

  title: {
    fontSize: 23,

    fontWeight: "bold",
  },
  container: {
    paddingTop: 23,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: "white",
  },
});

export default App;
