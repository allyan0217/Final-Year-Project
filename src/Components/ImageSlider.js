import { Box } from "native-base";
import React from "react";
import {View} from 'react-native'
import { SliderBox } from "react-native-image-slider-box";

const images = [
    require('../assests/pics/Slider-Vet-App-promo-copy-1.jpg'),
    require('../assests/pics/Slider-Vet-App-promo-copy-1.jpg'),
    require('../assests/pics/Slider-Vet-App-promo-copy-1.jpg'),
    require('../assests/pics/Slider-Vet-App-promo-copy-1.jpg'),
]

function ImageSlider() {
    return(
      <View>
 <Box mt={1} rounded={9} >
            <SliderBox
  
  images={images}
  sliderBoxHeight={200}
  onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
  dotColor="white"
  inactiveDotColor="#90A4AE"
  paginationBoxVerticalPadding={20}
  autoplay
  circleLoop
  autoplayinterval 
  resizeMethod={'resize'}
  resizeMode={'cover'}
  paginationBoxStyle={{
    position: "absolute",
    bottom: 0,
    padding: 0,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10
  }}
  dotStyle={{
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: "rgba(128, 128, 128, 0.92)"
  }}
  ImageComponentStyle={{borderRadius: 15, width: '97%', marginTop: 5}}
  imageLoadingColor="#2196F3"
/>
        </Box>
      </View>
    )
}

export default ImageSlider