import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { UserInfo } from "../features/slice/userManagement";
import { useTheme } from "react-native-paper";
import Axios from "axios";
import { DrawerLayoutAndroid } from "react-native";
// import { AuthContext } from '../context';
import { AuthContext } from "../../Helper/Auth";

// import Users from '../data/LoginUser.js';

const SignInScreen = ({ navigation }) => {
  const { Login } = React.useContext(AuthContext);
  const dispatch = useDispatch();
  const [data, setData] = React.useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { colors } = useTheme();

  const LoginFunc = async (event) => {
    event.preventDefault();
    if (data.password.length < 8) {
      return;
    }
    Axios.get(
      "http://192.168.100.78:3001/login?Username=" +
        data.username +
        "&" +
        "password=" +
        data.password
    )
      .then((result) => {
        alert("Successfully Login");
        dispatch(
          UserInfo({
            Name: result.data.data.Username,
            token: result.data.token,
          })
        );
        Login({
          _id: result.data.data._id,
          token: result.data.token,
          Name: result.data.data.Username,
          Phone: result.data.data?.Phone,
        });
        navigation.navigate("Bottom");
      })
      .catch((error) => {
        alert(error);
        alert("invalid information");
      });
  };
  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = (userName, password) => {
    const foundUser = Users.filter((item) => {
      return userName == item.username && password == item.password;
    });

    if (data.username.length == 0 || data.password.length == 0) {
      Alert.alert(
        "Wrong Input!",
        "Username or password field cannot be empty.",
        [{ text: "Okay" }]
      );
      return;
    }

    if (foundUser.length == 0) {
      Alert.alert("Invalid User!", "Username or password is incorrect.", [
        { text: "Okay" },
      ]);
      return;
    }
    signIn(foundUser);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={["#5DCBEF", "#38A1C4"]}
        barStyle="light-content"
      />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <Text style={[styles.text_footer, { color: colors.text }]}>
          Username
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Username"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters long.
            </Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              marginTop: 35,
            },
          ]}
        >
          Password
        </Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}

        <TouchableOpacity>
          <Text style={{ color: "#009387", marginTop: 15 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={LoginFunc} //{loginHandle( data.username, data.password )}
          >
            <LinearGradient
              colors={["#5DCBEF", "#38A1C4"]}
              style={styles.signIn}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Sign In
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={[
              styles.signIn,
              {
                borderColor: "#38A1C4",
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#38A1C4",
                },
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#38A1C4",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

// import React from "react";
// import { View, Text, Box, Heading, VStack, Input, Button, Pressable } from "native-base";
// import { MaterialIcons } from '@expo/vector-icons';
// import { Ionicons } from '@expo/vector-icons';

// function LoginScreen({navigation}) {
//     return(
//         <Box flex={1} bg={"#fff"}>
//             <Box w="full" h="full" position="absolute" top="0" alignItems={"center"} justifyContent="center">
//                 <Heading>Login</Heading>
//                 <VStack space={5} pt="6">
//                     <Input InputLeftElement={<MaterialIcons name="email" size={24} color="black" />} pl={2} variant="underlined" placeholder="user@gmail.com" w="70%" color="#fff000"/>
//                     <Input InputLeftElement={<Ionicons name="eye" size={24} color="black" />} pl={2} variant="underlined" placeholder="*********" w="70%" color="#fff000"/>
//                 </VStack>
//                 <Button my={30} w="40%" rounded={50} onPress={()=> navigation.navigate("Bottom")} >Login</Button>
//                 <Pressable onPress={()=> navigation.navigate("Register")} >
//                     <Text color={"grey"} >Sign Up</Text>
//                 </Pressable>
//             </Box>

//         </Box>
//     );
// }

// export default LoginScreen;

// // import React, {useState} from 'react';
// // import {
// //   SafeAreaView,
// //   StyleSheet,
// //   View,
// //   Image,
// //   Animated,
// //   Text,
// //   TouchableOpacity,
// //   Dimensions,
// // } from 'react-native';
// // import { LinearGradient } from 'react-native-svg';
// // import { AntDesign } from '@expo/vector-icons';

// // function App() {
// //   return(
// //     <View style={styles.container}>
// //       <View style={styles.header}>
// //         <Image source={require("../assests/pics/logo.png")}/>

// //       </View>
// //       <Animated.View style={styles.footer}>
// //         <Text style={styles.title}>Stay connected with Everyone!</Text>
// //         <Text style={styles.text}> Sign in with account </Text>

// //         <View style={styles.button}>
// //           <TouchableOpacity onpress={()=>alert('click')}>
// //             <LinearGradient  colors={['#5DCBEF' , '#01ab9d']} style={styles.singin}>
// //               <Text style={styles.textSign}>Get Started</Text>
// //               <AntDesign name="right" size={20} color="white" />
// //             </LinearGradient>
// //           </TouchableOpacity>
// //           </View>
// //         </Animated.View>
// //       </View>
// //   )
// // };
// // export default App;

// // const {height}=Dimensions.get("screen");
// // const height_logo=height * 0.28;

// // const styles = StyleSheet.create({
// //   container:{
// //     flex:1,
// //     backgroundColor:'#5DCBEF'

// //   },
// //   header: {
// //    flex:2,
// //    justifyContent:"center",
// //    alignItems:'center',
// //   },
// //   footer:
// //   {
// //     flex:1,
// //     backgroundColor:'#fff',
// //     borderTopLeftRadius:30,
// //     borderTopRightRadius:30,
// //     paddingVertical:50,
// //     paddingHorizontal:30,

// //   },
// //   textStyle: {
// //     textAlign: 'center',
// //     color: '#fff',
// //     fontSize: 18,
// //     padding: 7,
// //   },
// //   logo:{
// //     width: height_logo,
// //     height:height_logo,
// //   },
// //   title:{
// //     color:'#05375a',
// //     fontSize:30,
// //     fontWeight:'bold',
// //   },
// //   text:{
// //     color:'grey',
// //     marginTop:5,
// //   },
// //   textSign:
// //   {
// //     color:'white',
// //     fontWeight:'bold',
// //   },
// //   singin:
// //   {
// //     width:150,
// //     height:40,
// //     justifyContent:'center',
// //     alignItems:'center',
// //     borderRadius:50,
// //     flexDirection:'row',
// //   },
// //   button:
// //   {
// //     alignItems:'flex-end',
// //     marginTop:30,

// //   },
// // });
