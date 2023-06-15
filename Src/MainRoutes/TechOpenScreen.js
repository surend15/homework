import React, { Component, useState } from 'react'
import {
    View, Text, DeviceEventEmitter, Image, SafeAreaView, TouchableOpacity,
    ActivityIndicator, Share, ScrollView, Dimensions, TextInput, Keyboard
} from 'react-native'
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Login1 } from '../Service/LoginService';
import Toast from 'react-native-simple-toast';
import { S3_Icon } from '../../assets/index';

// #ED9121

const TechOpenScreen = ({ navigation }) => {

    
    return (
        <SafeAreaView>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View style={{ height: Height, width: Width, flex: 1, backgroundColor: "#FFFFFF", }}>
                    <View style={{ height: "7%", width: Width, marginLeft: 20, flexDirection: "row" }}>
                        <View style={{ flex: 0.15, alignItems: "center", justifyContent: 'center' }}>
                            <View style={{
                                borderColor: '#D3D3D3', borderWidth: 0.5, height: "70%",
                                width: "70%", borderRadius: 8, alignItems: "center", justifyContent: "center"
                            }}>
                                <Ionicons
                                    size={30}
                                    color="black"
                                    name="chevron-back"
                                />
                            </View>
                        </View>
                        <View style={{ flex: 0.5, justifyContent: 'center', paddingLeft: 10 }}>
                            {/* <Text style={{fontSize:20,fontWeight:"bold",color:"black"}}>LOGO</Text> */}
                            <S3_Icon width={40} height={40} />
                        </View>
                        <View style={{ flex: 0.3, alignItems: 'center', flexDirection: 'row-reverse', height: '100%', justifyContent: 'space-evenly' }}>
                        <Ionicons size={30} name="notifications-outline" />
                        <Ionicons size={30} name="location-outline" />
                    </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );

}
export default TechOpenScreen;