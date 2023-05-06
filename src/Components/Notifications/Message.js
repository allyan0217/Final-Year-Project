import React from 'react'
import { Center, Text } from 'native-base'

export default function Message({bg, color, size, children, bold}) {
  return (
    <Center bg={bg} p={4} rounded={5}>
        <Text color={color} fontSize={size} bold={bold} >{children}</Text>
    </Center>
  )
}