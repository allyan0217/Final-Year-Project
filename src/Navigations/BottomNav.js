import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Center, Pressable } from "native-base";
import {
  Entypo,
  AntDesign,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ProfileScreen from "../Screens/ProfileScreen";
import CartScreen from "../Screens/CartScreen.js";
import Settings from "../Screens/Settings";
import { Ionicons } from "@expo/vector-icons";
import StackNav from "./StackNav";
import UploadProduct from "../Screens/UploadProduct";
import VendorProductsList from "../Screens/VendorProducts";
import { ArrowUpTrayIcon } from "react-native-heroicons/solid";
import ShippingScreen from "../Screens/ShippingScreen";
const Tab = createBottomTabNavigator();
const CustomTab = ({ children, onPress }) => (
  <Pressable
    onPress={onPress}
    h={70}
    w={70}
    rounded="full"
    bg="green.400"
    top={-30}
    _pressed={{ bg: "black" }}
    shadow={2}
  >
    {children}
  </Pressable>
);

const BottomNav = () => {
  return (
    <Tab.Navigator
      backBehavior="Main"
      initialRouteName="Main"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { ...styles.tab },
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Main"
        component={StackNav}
        options={{
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <Entypo name="home" size={24} color="amber.900" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              )}
            </Center>
          ),
        }}
      />
      {/* CART */}
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarButton: (props) => <CustomTab {...props} />,
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <FontAwesome5 name="shopping-basket" size={24} color="white" />
              ) : (
                <MaterialCommunityIcons
                  name="shopping-outline"
                  size={24}
                  color="white"
                />
              )}
            </Center>
          ),
        }}
      />
      {/* PROFILE */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <FontAwesome name="user" size={24} color="amber.400" />
              ) : (
                <AntDesign name="user" size={24} color="black" />
              )}
            </Center>
          ),
        }}
      />
      {/* PROFILE */}
      {/* <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <Ionicons name="settings-sharp" size={24} color="black" />
              ) : (
                <Ionicons name="settings-outline" size={24} color="black" />
              )}
            </Center>
          ),
        }}
      /> */}
      <Tab.Screen
        name="Upload"
        component={VendorProductsList}
        options={{
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <ArrowUpTrayIcon color="black" size={20} />
              ) : (
                <ArrowUpTrayIcon color="black" size={20} />
              )}
            </Center>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tab: {
    elevation: 0,
    backgroundColor: "white",
    height: 60,
  },
});

export default BottomNav;
