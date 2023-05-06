import React from "react";
import { View, Text, HStack, Input, Box, ScrollView } from "native-base";
import HomeSearch from "../Components/HomeSearch";
import HomeProducts from "../Components/HomeProducts";
import ImageSlider from "../Components/ImageSlider";
import CompanyLogos from "../Components/CompanyLogos";

function HomeScreen() {
  const [searchText, setSearchText] = React.useState("");

  return (
    <Box flex={1} bg="#FCFCFC">
      <HomeSearch setSearchText={setSearchText}  />
      <ScrollView>
        <ImageSlider />
        <CompanyLogos  setSearchText={setSearchText}  />
        <HomeProducts getSearchText={searchText}  />
      </ScrollView>
    </Box>
  );
}

export default HomeScreen;
