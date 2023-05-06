import { useNavigation } from '@react-navigation/native';
import { Button, Center, FormControl, HStack, Image, Input, Modal, Pressable, Text, VStack } from 'native-base';
import React, { useState } from 'react'
import Buttone from './Buttone';

const OrdersInfos =[
    {title:"Products", price:125.77, color:"black"},
    {title:"Shipping", price:34.00, color:"black"},
    {title:"Tax", price:12.74, color:"black"},
    {title:"Total Amount", price:180.69, color:"amber.700"},
]

const OrderModel = () => {
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false)
  return(
    <Center>
        <Button onPress={()=> setShowModal(true)} bg="black" color="white" mt={5}>SHOW PAYMENT & TOTAL</Button>
        <Modal isOpen={showModal} onClose={()=> setShowModal(false)} size="lg">
            <Modal.Content maxWidth={350}><Modal.CloseButton /><Modal.Header>Order</Modal.Header>
            <Modal.Body>
                <VStack space={7}>
                    {OrdersInfos.map((i,index)=> (
                        <HStack key={index} alignItems="center" justifyContent="space-between">
                            <Text fontWeight="medium">{i.title}</Text>
                            <Text color={i.color==="green.200" ? "amber.100" : "black"}
                            bold fontWeight={14}>${i.price}</Text>
                        </HStack>
                    ))}
                </VStack>
            </Modal.Body>
            <Modal.Footer>
                <Pressable w="full" rounded={5} overflow="hidden" justifyContent="center" bg="amber.500" h={45} onPress={()=>setShowModal(flase)}>
                    <Image source={require("../assests/pics/paypal.svg.png")} 
                    alt="paypal" resizeMode='contain' w="full" h={34} />
                </Pressable>
                <Button w="full" mt={2} bg="black" h={45} _text={{color:"white"}}
                onPress={()=>{ navigation.navigate("Home"); setShowModal=(false)}} _pressed={{bg:"blue.200"}}>PLACE AN ORDER</Button>
            </Modal.Footer>
            </Modal.Content>
        </Modal>
    </Center>
  );
}

export default OrderModel