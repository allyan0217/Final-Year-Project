import React from 'react'
import { Box, Center, Text } from 'native-base'
import {FontAwesome} from "@expo/vector-icons"
import Buttone from '../Buttone'

const CartEmpty = () => {
  return (
    <Box flex={1} px={4} ><Center h="90%"><Center w={200} h={200} bg="white" rounded="full">
        <FontAwesome name="shopping-basket" size={64} color="blue" />    
        </Center><Text mt={5} color="black" bold>Cart is Empty</Text></Center>
        <Buttone bg="black" color="white">START SHOPPING</Buttone>
    </Box>
  )
}

export default CartEmpty