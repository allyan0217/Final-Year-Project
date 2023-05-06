import { useNavigation } from '@react-navigation/native';
import { Button, Center, FormControl, HStack, Input, Modal, Text, VStack } from 'native-base';
import React, { useState } from 'react'
import Buttone from './Buttone';

const OrdersInfos =[
    {title:"Products", price:125.77, color:"black"},
    {title:"Shipping", price:34.00, color:"black"},
    {title:"Tax", price:12.74, color:"black"},
    {title:"Total Amount", price:180.69, color:"amber.700"},
]

const PlaceOrderModel = () => {
    const navigation = useNavigation();
    const [showModel, setShowModel] = useState(false)
  return(
    <Center>
        <Button onPress={()=> setShowModel(true)} bg="black" mb={10} color="white" mt={5}>SHOW TOTAL</Button>
        <Modal isOpen={showModel} onClose={()=> setShowModel(false)} size="lg">
            <Modal.Content maxWidth={350}><Modal.CloseButton /><Modal.Header>Order</Modal.Header>
            <Modal.Body>
                <VStack space={7}>
                    {OrdersInfos.map((i,index)=> (
                        <HStack key={index} alignItems="center" justifyContent="space-between">
                            <Text fontWeight="medium">{i.title}</Text>
                            <Text color={i.color === "#090" ? "#946222" : "#000"}
                            bold fontWeight={14}>${i.price}</Text>
                        </HStack>
                    ))}
                </VStack>
            </Modal.Body>
            <Modal.Footer>
                <Button flex={1} bg="amber.400" h={45} _text={{color:"white"}}
                onPress={()=> {navigation.navigate("order"); setShowModel=(false);}} _pressed={{bg:"blue.200"}}>PLACE AN ORDER</Button>
            </Modal.Footer>
            </Modal.Content>
        </Modal>
    </Center>
  );
}

export default PlaceOrderModel