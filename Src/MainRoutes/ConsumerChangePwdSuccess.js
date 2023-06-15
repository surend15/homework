

import React, { Component } from 'react'
import { View, Text, DeviceEventEmitter, Image, SafeAreaView, TouchableOpacity, Platform, TouchableNativeFeedback, FlatList, Keyboard, RefreshControl, ActivityIndicator, Share, ScrollView, Dimensions, TextInput } from 'react-native'
const Height=Dimensions.get('window').height;
const Width=Dimensions.get('window').width;
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { Success_Icom } from '../../assets';
import { useTranslation } from "react-i18next";

// #ED9121

const ConsumerChangePwdSuccess=({navigation})=>{

    const { t, i18n } = useTranslation();

    return(
        <SafeAreaView>
        <ScrollView>
            <View style={{height:Height,width:Width,flex:1,backgroundColor:"#FFFFFF"
            ,justifyContent : 'center',
        alignItems : 'center'}}>
              {/* <Success_Icom width={100} height={100} /> */}
              <Success_Icom width={100} height={100} />

              <Text style={{fontSize:23,color:'black',fontWeight:"bold", marginTop : 20}}>{t('common:pending')}!</Text>

              <View style={{height:'10%',width:"100%",
                justifyContent : 'center', alignItems : 'center'}}>
                        <Text style={{fontSize:17,color:'black'}}>
                        {t('common:pending1')}</Text>
                            <Text style={{fontSize:17,color:'black'}}>
                            {t('common:pending2')}.</Text>
                    </View>

                    <View>
                    <TouchableOpacity onPress={()=>navigation.navigate('Login')}
                    style={{width:Width / 1.2, height:58,alignItems:"center",justifyContent:"center",backgroundColor:"#ED9121",
                    borderRadius:8,marginTop:20}}>
                    <Text style={{color:"#FFFF",fontWeight:'bold',fontSize:16}}>{t('common:back_to_login')}</Text>
                    </TouchableOpacity>
</View>
            </View>
        </ScrollView>
        </SafeAreaView>

    );

}
export default ConsumerChangePwdSuccess;