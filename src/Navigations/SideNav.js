import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Settings from '../Screens/Settings';
import HomeScreen from '../Screens/HomeScreen';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';


const Drawer = createDrawerNavigator();

const SideNav = () => {
  return (
    <NavigationContainer>
        <Drawer.Navigator drawerType="front" initialRouteName="Profile" drawerContentOptions={{activeTintColor: '#e91e63',itemStyle: { marginVertical: 10 },}}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Settings" component={Settings} />
        </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default SideNav