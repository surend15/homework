import React, { Component, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity,
      Keyboard,ScrollView, Dimensions, TextInput, TouchableHighlight, ActivityIndicator } from 'react-native'
const Height=Dimensions.get('window').height;
const Width=Dimensions.get('window').width;
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { S3Icon } from '../../assets/images/S3Icon.svg';
import Toast from 'react-native-simple-toast';

import { Login}from '../Service/LoginService'


const Register=({navigation})=>{
    const [username, setusername] = useState("");
    const [emailAddress, setemailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setrepassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const RegisterNew = () => {
        Keyboard.dismiss();
        console.log("Register")
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        setIsLoading(true)
        if( username == "" ){
            console.log("username")
            Toast.show('Please Enter Your Username', Toast.LONG);
            setIsLoading(false)
        } else if( emailAddress == "" ){
            Toast.show('Please Enter Your EmailAddress', Toast.LONG);
            setIsLoading(false)
        } else if( reg.test(emailAddress) == false){
            Toast.show('Invalid Email Address', Toast.LONG);
            setIsLoading(false)
        } else if( password == "" ){
            Toast.show('Please Enter Your Password', Toast.LONG);
            setIsLoading(false)
        } else if( repassword == "" ){
            Toast.show('Please Enter Your Repassword', Toast.LONG);
            setIsLoading(false)
        } else if( password != repassword ){
            Toast.show('Your Password is Incorrect', Toast.LONG);
            setIsLoading(false)
        } else {
            setIsLoading(true)
            let inputJson = {
                role:1,
                name: username,
                email: emailAddress,
                password: password,
                confirm_password: repassword
              };
              Login(inputJson).then((result) => {
                setIsLoading(false)
                let responseJson = result;
                console.log("Success response login ==> ", JSON.stringify(responseJson.data))
                if( responseJson.data.status == "200" ){
                    Toast.show(responseJson.data.message, Toast.LONG);

                } else if(responseJson.data.status == "400"){
                    Toast.show(responseJson.data.message, Toast.LONG);
                } else {
                    Toast.show(responseJson.data.message, Toast.LONG);
                }
              })
        }
    }
    return(
        <SafeAreaView>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
            <View style={{height:Height,width:Width,flex:1,backgroundColor:"#FFFFFF",}}>
                {/* {Header} */}
                <View style={{height:"7%",width:Width,marginLeft:20,flexDirection:"row"}}>
                    <View style={{flex:0.15,alignItems:"center",justifyContent:'center'}}>
                        <View style={{borderColor:'#D3D3D3',borderWidth:0.5,height:"70%",
                        width:"70%",borderRadius:8,alignItems:"center",justifyContent:"center"}}>
                            <Ionicons 
                            size={30}
                            color="black"
                            name="chevron-back"  
                            />
                        </View>
                    </View>
                    <View style={{flex:0.5,justifyContent:'center',paddingLeft:10}}>
                            <S3Icon width={40} height={40} />
                    </View>
                    <View style={{ flex: 0.3, alignItems: 'center', flexDirection: 'row-reverse', height: '100%', paddingLeft: '3%' }}>
                            <Ionicons size={30} name="location-outline" />
                        </View>
                </View>
            {/* TextInput Area */}
                <View style={{height:'93%',margin:20,}}>
                    <View style={{height:'5%',width:"100%"}}>
                        <Text style={{fontSize:25,color:'black',fontWeight:"bold"}}>Hello! Register to get started</Text>
                    </View>
                    <View style={{height:"8%",marginTop:20,margin:5,}}>
                        <TextInput  
                        style={{height:"100%",width:"100%",backgroundColor:"#f9f9f9",
                        borderRadius:5,borderColor:"#ededed",borderWidth:1,paddingLeft:10}}
                        placeholder='     Username'
                        onChangeText={username => setusername(username)} 
                        value={username}
                        />
                    </View>
                    <View style={{height:"8%",marginTop:20,margin:5,flexDirection:'row'}}>
                        <TextInput  
                        style={{height:"100%",width:"100%",backgroundColor:"#f9f9f9",
                        borderRadius:5,borderColor:"#ededed",borderWidth:1,paddingLeft:10}}
                        placeholder='     Email'
                        onChangeText={emailAddress => setemailAddress(emailAddress)} 
                        value={emailAddress}
                        />
                    </View>
                    <View style={{height:"8%",marginTop:20,margin:5,}}>
                        <TextInput  
                        style={{height:"100%",width:"100%",backgroundColor:"#f9f9f9",
                        borderRadius:5,borderColor:"#ededed",borderWidth:1,paddingLeft:10}}
                        placeholder='     Password'
                        onChangeText={password => setPassword(password)} 
                        value={password}
                        />
                    </View>
                    <View style={{height:"8%",marginTop:20,margin:5,}}>
                        <TextInput  
                        style={{height:"100%",width:"100%",backgroundColor:"#f9f9f9",
                        borderRadius:5,borderColor:"#ededed",borderWidth:1,paddingLeft:10}}
                        placeholder='     Confirm password'
                        onChangeText={repassword => setrepassword(repassword)} 
                        value={repassword}
                        />
                    </View>
                   

                    <View>
                {/* Register Button */}
                    <TouchableHighlight onPress={()=>RegisterNew()}
                    style={{height:58,alignItems:"center",justifyContent:"center",backgroundColor:"#ED9121",borderRadius:8,marginTop:20}}>
                    <Text style={{color:"#FFFF",fontWeight:'bold',fontSize:16}}>Register</Text>
                    </TouchableHighlight>
                    </View>

                    <View style={{height:"15%",flexDirection:"row",alignItems:"center"}}>
                        <View style={{width:"35%",borderWidth:0.5,borderColor:"#D3D3D3"}}/>
                        <Text style={{color:'black',width:'30%',textAlign:"center"}}>Or Register with</Text>
                        <View style={{width:"35%",borderWidth:0.5,borderColor:"#D3D3D3"}}/>
                    </View>
                {/* Social Login Area */}
                    {/* <View style={{flexDirection:"row",justifyContent:'space-between',height:"7%"}}>
                        <View style={{flex:0.47,borderWidth:0.5,borderColor:"#D3D3D3",borderRadius:8,alignItems:"center",justifyContent:"center"}}>
                            <Image 
                            style={{height:"50%",width:"40%"}}
                            resizeMode='contain' 
                            source={require('../../assets/facebook.png')}
                            />
                        </View>
                        <View style={{flex:0.47,borderWidth:0.5,borderColor:"#D3D3D3",borderRadius:8,alignItems:"center",justifyContent:"center"}}>
                        <Image 
                            style={{height:"50%",width:"40%"}}
                            resizeMode='contain' 
                            source={require('../../assets/Google.png')}
                            />
                        </View>

                    </View> */}
                    <View style={{height:"7%",marginTop:10,alignItems:"center",justifyContent:"center"}}>
                        <Text>
                            <Text style={{fontSize:16,color:'black'}}>Already have an account?</Text>
                            <Text style={{fontSize:16,color:'#ED9121'}}> Login Now</Text>

                        </Text>

                    </View>

                </View>

            </View>
        </ScrollView>
        {isLoading ? (
          <View
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              justifyContent: "center",
              alignSelf: "center",
              backgroundColor:'transparent'
            }}
          >
            <ActivityIndicator
              size={40}
              color={"orange"}
              backgroundColor={"transparent"}
            />
          </View>
        ) : null}
        </SafeAreaView>

    );

}
export default Register;