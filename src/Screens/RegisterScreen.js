import React from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import  axios from 'axios'
import {NetworkInfo} from 'react-native-network-info';
// import { useTheme } from 'react-native-paper';

// import { AuthContext } from '../context';

// import Users from '../loginUser';

const SignInScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });
    const register=(event)=>{
        event.preventDefault()
        // NetworkInfo.getIPAddress().then(ipAddress => {
        //     console.log(ipAddress);
        // });
        // NetworkInfo.getIPV4Address().then(ipv4Address => {
        //   console.log(ipv4Address);
        // });
        console.log(data)
        if(data.password===data.confirm_password&&data.password.length>4&&data.username.length>4){
            axios.post('http://192.168.100.78:3001/InsertInfo',{
                Username:data.username,
                password:data.password
            }).then((result)=>{
                alert(result)
               alert('Registered')
            }).catch((error)=>{
                console.log(error)
                alert(error)
                alert('Invalid information')})
        }
    }

    const textInputChange = (val) => {
        console.log(val)
        if( val.length !== 0&&val.length>4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.length !== 0&&val.length>4 ) {
        setData({
            ...data,
            password: val
        });
    }
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#38A1C4' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
            <FontAwesome 
                    name="lock"
                    color="black"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                   <Feather 
                   name="eye-off"
                   color="grey"
                   size={20}
               />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Confirm Password</Text>
            <View style={styles.action}>
            <FontAwesome 
                    name="lock"
                    color="black"
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={register}
                >
                <LinearGradient
                    colors={['#5DCBEF', '#38A1C4']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign Up</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.signIn, {
                        borderColor: '#38A1C4',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#38A1C4'
                    }]}>Sign In</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#38A1C4'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
  });

// import React from "react";
// import { View, Text, Box, Heading, VStack, Input, Button, Pressable } from "native-base";
// import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
// function RegisterScreen({navigation}) {
//     return(
//         <Box flex={1} bg={"#ffff"}>
//             <Box w="full" h="full" position="absolute" top="0" alignItems={"center"} justifyContent="center">
//                 <Heading>Sign Up</Heading>
//                 <VStack space={5} pt="6">
//                     <Input InputLeftElement={<FontAwesome name="user" size={24} color="black" />} pl={2} variant="underlined" placeholder="username" type="text" w="70%" color="#fff000"/>
//                     <Input InputLeftElement={<MaterialIcons name="email" size={24} color="black" />} pl={2} variant="underlined" placeholder="user@gmail.com" type="text" w="70%" color="#fff000"/>
//                     <Input InputLeftElement={<Ionicons name="eye" size={24} color="black" />} pl={2} variant="underlined" placeholder="*********" type="password" w="70%" color="#fff000"/>
//                 </VStack>
//                 <Button my={30} w="40%" rounded={50} onPress={()=> navigation.navigate("Bottom")} >Sign Up</Button>
//                 <Pressable onPress={()=> navigation.navigate("Login")}>
//                     <Text color={"grey"}>Login</Text>
//                 </Pressable>
//             </Box>
            
//         </Box>
//     );
// }


// export default RegisterScreen;
