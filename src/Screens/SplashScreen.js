import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Animated,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

const SplashScreen=({navigation}) =>{
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image 
        animation={"bounceInLeft"}
        duration={2200}
        source={require('../assests/pics/logo1.png')}
        style={styles.logo}
        resizeMode='stretch'
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>Stay connected with Everyone!</Text>
        <Text style={styles.text}> Sign in with account </Text>
       
        <View style={styles.button}>
          <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
            <LinearGradient  colors={['#5DCBEF' , '#38A1C4']} style={styles.singin}>
              <Text style={styles.textSign}>Get Started</Text>
              <AntDesign name="right" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
  )
};
export default SplashScreen;

const {height}=Dimensions.get("screen");
const height_logo=height * 0.28;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#38A1C4'

  },
  header: {
   flex:2,
   justifyContent:"center",
   alignItems:'center',
  },
  footer:
  {
    flex:1,
    backgroundColor:'#fff',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    paddingVertical:50,
    paddingHorizontal:30,

  },
  textStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    padding: 7,
  },
  logo:{
    width: height_logo,
    height:height_logo,
  },
  title:{
    color:'#05375a',
    fontSize:30,
    fontWeight:'bold',
  },
  text:{
    color:'grey',
    marginTop:5,
  },
  textSign:
  {
    color:'white',
    fontWeight:'bold',
  },
  singin:
  {
    width:150,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:50,
    flexDirection:'row',
  },
  button:
  {
    alignItems:'flex-end',
    marginTop:30,

  },
});