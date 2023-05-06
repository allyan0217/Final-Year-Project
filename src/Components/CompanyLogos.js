import { Box, ScrollView, Button } from "native-base";
import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { notInitialized } from "react-redux/es/utils/useSyncExternalStore";

const images = [
  "https://i.pinimg.com/originals/e6/ed/40/e6ed401e0783fcf213e47a638580eaf8.png",
  "https://tse3.mm.bing.net/th?id=OIP.Kg2FF2wpIK_HLyo8Q56ycAHaFj&pid=Api&P=0",
  "https://tse1.mm.bing.net/th?id=OIP.LB1ttmV5vWwIv9eTJO6VWgHaFj&pid=Api&P=0",
  "https://logosandtypes.com/wp-content/uploads/2020/10/one-plus.png",
  "https://download.logo.wine/logo/Oppo/Oppo-Logo.wine.png",
  "https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/xiaomi-512.png",
];

const imagesDic = [
  {
    iphone:
      "https://i.pinimg.com/originals/e6/ed/40/e6ed401e0783fcf213e47a638580eaf8.png",
  },
  {
    google:
      "https://tse3.mm.bing.net/th?id=OIP.Kg2FF2wpIK_HLyo8Q56ycAHaFj&pid=Api&P=0",
  },
  {
    huawei:
      "https://tse1.mm.bing.net/th?id=OIP.LB1ttmV5vWwIv9eTJO6VWgHaFj&pid=Api&P=0",
  },
  {
    oneplus:
      "https://logosandtypes.com/wp-content/uploads/2020/10/one-plus.png",
  },
  { oppo: "https://download.logo.wine/logo/Oppo/Oppo-Logo.wine.png" },
  {
    xiaomi:
      "https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/xiaomi-512.png",
  },
];

function CompanyLogos({ setSearchText }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Button
        onPress={() => {
          setSearchText("");
        }}
        style={{
          width: 80,
          height: 75,
          marginLeft: 10,
          borderRadius: 100,
          position: "relative",
          top: 15,
          left: 10,
        }}
      >
        All
      </Button>

      {imagesDic.map((object) => (
        <TouchableOpacity
          onPress={() => {
            setSearchText(Object.keys(object)[0]);
          }}
        >
          <Image
            source={{
              uri: object[Object.keys(object)[0]],
            }}
            style={{
              width: 105,
              height: 100,
              marginLeft: 10,
              borderRadius: 100,
            }}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

export default CompanyLogos;
