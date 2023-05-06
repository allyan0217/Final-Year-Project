import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, StatusBar, Text } from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/Screens/LoginScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import OrderScreen from "./src/Screens/OrderScreen";
import BottomNav from "./src/Navigations/BottomNav";
import SplashScreen from "./src/Screens/SplashScreen";
import { Provider } from "react-redux";
import SideNav from "./src/Navigations/SideNav";
import { store } from "./src/features/store";
import "react-native-gesture-handler";
import Chatscreen from "./src/Screens/Chatscreen";
import ShippingScreen from "./src/Screens/ShippingScreen";
import UploadProduct from "./src/Screens/UploadProduct";
import { AuthProvider, AuthContext } from "./Helper/Auth";
import React from "react";
const Stack = createNativeStackNavigator();

function AppInside() {
  const { userInfo, isLoading } = React.useContext(AuthContext);

  if (isLoading) {
    return (
      <NativeBaseProvider>
        <Text>Loading...</Text>
      </NativeBaseProvider>
    );
  }
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <StatusBar hidden={true} />
          <Stack.Navigator
            initialRouteName="Bottom"
            screenOptions={{ headerShown: false }}
          >
            {userInfo !== null ? (
              <>
                <Stack.Screen name="order" component={OrderScreen} />
                <Stack.Screen name="Bottom" component={BottomNav} />
                <Stack.Screen name="Chat" component={Chatscreen} />
                <Stack.Screen name="Shipping" component={ShippingScreen} />
                <Stack.Screen name="UploadProduct" component={UploadProduct} />
              </>
            ) : (
              <>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInside />
    </AuthProvider>
  );
}
