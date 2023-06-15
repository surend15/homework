import React, { Component } from 'react'
import { View, Text, DeviceEventEmitter, Image, SafeAreaView, TouchableOpacity, Platform, TouchableNativeFeedback, FlatList, Keyboard, RefreshControl, ActivityIndicator, Share, ScrollView, Dimensions, TextInput } from 'react-native'
import { S3FullLogo } from '../../assets';
const Height=Dimensions.get('window').height;
const Width=Dimensions.get('window').width;
const WelcomeLandingPage=({navigation})=>{
    return(
        <View style={{height:Height,width:Width,flex:1,backgroundColor:"white"}}>
            <View style={{height:"45%",width:Width}}>
                <Image
                style={{width:"100%",height:"100%"}}
                resizeMode='stretch'
                source={require('../../assets/initial.png')}
                />

            </View>
            <View style={{height:"20%",alignItems:"center",justifyContent:"center",}}>
                <S3FullLogo />
            </View>
            <View style={{height:"30%",margin:20}}>
                <TouchableOpacity onPress={()=>navigation.navigate('Login')}
                style={{height:58,alignItems:"center",justifyContent:"center",backgroundColor:"#ED9121",borderRadius:8}}>
                    <Text style={{color:"#FFFF",fontWeight:'bold',fontSize:16}}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>navigation.navigate('Registration')}
                style={{height:58,alignItems:"center",justifyContent:"center",borderColor:"#ED9121",borderRadius:8,borderWidth:0.5,marginTop:10}}>
                    <Text style={{color:"black",fontWeight:'500',fontSize:16}}>Register</Text>
                </TouchableOpacity>
                <Text style={{textDecorationLine:'underline',textAlign:"center",color:"#ED9121",marginTop:16,fontSize:16}}>Try Guest Login?</Text>
            </View>

        </View>

    );

}
export default WelcomeLandingPage;