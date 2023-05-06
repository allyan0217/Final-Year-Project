import { Box, Text, Center, Heading } from 'native-base'
import React from 'react'

const Orderinfo = ({icon, title, subTitle, text, success, danger}) => {
  return (
    <Center bg="blue.100" w={200} py={2} rounded={10} shadow={9} mb={2} ml={5} mr={1} px={4}>
        <Center bg="#008CBA" w={60} h={60} rounded="full">{icon}</Center>
        <Heading bold fontSize={12} isTruncated mt={3} mb={2} color="black">{title}</Heading>
        <Text fontSize={13} color="black">{subTitle}</Text>
        <Text fontSize={13} textAlign="center" italic color="black">{text}</Text>
        {/* STATUS */}
        {success && (<Center py={2} mt={2} rounded={5} w="full" bg="blue.400">
            <Text fontSize={12} color="black">Paid On Jan 12 2021</Text></Center>)}
        {danger && (<Center py={2} mt={2} rounded={5} w="full" bg="red.500">
            <Text fontSize={12} color="black">Not Deliver</Text></Center>)}

    </Center>
  )
}

export default Orderinfo