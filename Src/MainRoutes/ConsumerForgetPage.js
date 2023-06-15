

import React, { Component, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity,
     Keyboard, ScrollView, Dimensions, TextInput, ActivityIndicator } from 'react-native'
const Height=Dimensions.get('window').height;
const Width=Dimensions.get('window').width;
import { useTranslation } from "react-i18next";
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { S3_Icon } from '../../assets/index';
import Toast from 'react-native-simple-toast';
import { ForgetPassword } from '../Service/LoginService';

const ConsumerForgetPage=({navigation})=>{
    const [emailAddress, setemailAddress] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { t, i18n } = useTranslation();

    const ForgetPwdNew = () => {
        Keyboard.dismiss();
        console.log("Forget")
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        setIsLoading(true)
        if( emailAddress == "" ){
            Toast.show('Please Enter Your EmailAddress', Toast.LONG);
            setIsLoading(false)
        } else if( reg.test(emailAddress) == false){
            Toast.show('Invalid Email Address', Toast.LONG);
            setIsLoading(false)
        } else {
            setIsLoading(true)
            let inputJson = {
                email: emailAddress
              };
              console.log("inputJson === > ", JSON.stringify(inputJson))
              ForgetPassword(inputJson).then((result) => {
                setIsLoading(false)
                let responseJson = result;
                console.log("Success response Forget ==> ", JSON.stringify(responseJson.data))
                if( responseJson.data.status == 200 ){
                    navigation.navigate('OTP', { emailcheck : emailAddress });
                    Toast.show(responseJson.data.message, Toast.LONG);
                } 
                // else if(responseJson.data.success == false){
                //     Toast.show(responseJson.data.message, Toast.LONG);
                // }
              }).catch((error) => {
                console.log("false",error)
                let responseJson = error;
                console.log("Error1", responseJson)
                if(responseJson.status == 400){
                    setIsLoading(false)
                    Toast.show(responseJson.message, Toast.LONG);
                } else {
                    setIsLoading(false)
                    Toast.show(responseJson.message, Toast.LONG);
                }
              });
        }

    }
    return(
        <SafeAreaView>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
            <View style={{height:Height,width:Width,flex:1,backgroundColor:"#FFFFFF",}}>
                <View style={{height:"7%",width:Width,marginLeft:20,flexDirection:"row"}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}
                     style={{flex:0.15,alignItems:"center",justifyContent:'center'}}>
                        <View style={{borderColor:'#D3D3D3',borderWidth:0.5,height:"70%",
                        width:"70%",borderRadius:8,alignItems:"center",justifyContent:"center"}}>
                            <Ionicons 
                            size={30}
                            color="black"
                            name="chevron-back"  
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={{flex:0.5,justifyContent:'center',paddingLeft:10}}>
                            <S3_Icon width={40} height={40} />
                    </View>
                    <View style={{ flex: 0.3, alignItems: 'center', flexDirection: 'row-reverse', height: '100%', paddingLeft: '3%' }}>

                            <Ionicons size={30} name="location-outline" />
                        </View>
                    

                </View>
                <View style={{height:'93%',margin:20}}>
                    <View style={{height:'5%',width:"100%",}}>
                        <Text style={{fontSize:25,color:'black',fontWeight:"bold"}}>{t('common:Fortgotpwd')}</Text>
                    </View>

                    <View style={{height:'10%',width:"100%",
                justifyContent : 'center'}}>
                        <Text style={{fontSize:17,color:'black'}}>{t('common:Fortgot_msg')}</Text>
                    </View>

                    <View style={{height:"8%",marginTop:20,margin:5,}}>
                        <TextInput  
                        style={{height:"100%",width:"100%",backgroundColor:"#f9f9f9",
                        borderRadius:5,borderColor:"#ededed",borderWidth:1,paddingLeft:10}}
                        placeholder='     Enter your email'
                        onChangeText={emailAddress => setemailAddress(emailAddress)} 
                        value={emailAddress}
                        />
                    </View>

                    <View>
                    <TouchableOpacity onPress={()=>ForgetPwdNew()}
                    style={{height:58,alignItems:"center",justifyContent:"center",backgroundColor:"#ED9121",borderRadius:8,marginTop:20}}>
                    <Text style={{color:"#FFFF",fontWeight:'bold',fontSize:16}}>{t('common:Sendcode')}</Text>
                    </TouchableOpacity>
                    </View>

                    
                    <View style={{height:"7%",marginTop:30,alignItems:"center",justifyContent:"center"}}>
                        <Text>
                            <Text style={{fontSize:16,color:'black'}}>{t('common:Rememberpwd')}</Text>
                            <Text onPress={() => navigation.navigate('Login')}
                            style={{fontSize:16,color:'#ED9121'}}> {t('common:loginclick')}</Text>

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
export default ConsumerForgetPage;