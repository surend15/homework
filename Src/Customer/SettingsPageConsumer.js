
import React, { useState, useEffect } from "react";
import {
    View, Text, ScrollView, Dimensions,
    ImageBackground, TouchableOpacity, Alert, BackHandler
} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/EvilIcons';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import { useTranslation } from "react-i18next";

const SettingsPageConsumer = ({ navigation }) => {

    const { t, i18n } = useTranslation();
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton1);
        return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton1)
    }, []);

    const handleBackButton1 = () => {
        navigation.navigate('Home', { screen: 'HomePageConsumer' });
        return true;
    }

    const logoutConfirmation = async () => {
        Alert.alert(
            "Confirmation",
            "Are you sure want to logout?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => logoutUser() }
            ]
        );

    }

    const logoutUser = async () => {
        console.log("Logout Pressed")
        AsyncStorage.clear();
        Toast.show('You have logged out successfully', Toast.LONG);
        await AsyncStorage.setItem('alreadyLaunched', 'true');
        // await AsyncStorage.setItem('LoginStatus', 'false');
        // await AsyncStorage.setItem('LoginStatus1', 'false');
        navigation.replace('Login');
    }

    return (
        <ScrollView>
            <View style={{ height: Height-50, width: Width, flex: 1, backgroundColor: "white" }}>
                <View style={{
                    height: "8%", width: Width, flexDirection: "row",
                    borderBottomWidth: 1, borderBottomColor: 'gray',

                }}>
                    <View style={{
                        flex: 0.15, alignItems: "center", justifyContent: 'center',
                        marginLeft: 10
                    }}>
                        <View style={{
                            height: "70%",
                            width: "70%", alignItems: "center", justifyContent: "center"
                        }}>
                            <Ionicons
                                size={30}
                                color="black"
                                name="chevron-back-outline"
                            />
                        </View>
                    </View>
                    <View style={{ flex: 0.5, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Settings</Text>
                    </View>
                    <View style={{ flex: 0.3, alignItems: 'center', flexDirection: 'row-reverse', height: '100%', justifyContent: 'space-evenly' }}>
                        <Ionicons size={30} name="notifications-outline" />
                        <Ionicons size={30} name="location-outline" />
                    </View>
                </View>



                <View style={{ height: "6%", width: "100%", justifyContent: "center" }}>
                    <Text style={{ color: "gray", fontSize: 20, marginLeft: 35 }}>{t('common:general')}</Text>
                </View>
                <View style={{ height: "6%", width: "100%", flexDirection: "row" }}>
                    <View style={{ height: "100%", width: "85%", justifyContent: "flex-start" }}>
                        <Text style={{ color: "black", fontSize: 18, marginLeft: 35 }}>{t('common:profile')}</Text>
                    </View>
                    <View style={{ height: "100%", width: "15%", justifyContent: "flex-start" }}>
                        <Icon name="right" size={18} color="black" />
                    </View>
                </View>
                <View style={{ height: "6%", width: "100%", flexDirection: "row" }}>
                    <View style={{ height: "100%", width: "85%", justifyContent: "flex-start" }}>
                        <Text style={{ color: "black", fontSize: 18, marginLeft: 35 }}>{t('common:reset_password')}</Text>
                    </View>
                    <View style={{ height: "100%", width: "15%", justifyContent: "flex-start" }}>
                        <Icon name="right" size={18} color="black" />
                    </View>
                </View>
                <View style={{ height: "8%", width: "100%", justifyContent: "center" }}>
                    <Text style={{ color: "gray", fontSize: 20, marginLeft: 35 }}>{t('common:security')}</Text>
                </View>
                <View style={{ height: "8%", width: "100%", flexDirection: "row" }}>
                    <View style={{ height: "100%", width: "85%", marginTop: 10 }}>
                        <Text style={{ color: "black", fontSize: 18, marginLeft: 35 }}>{t('common:privarcy_policy')}</Text>
                    </View>
                    <View style={{ height: "100%", width: "15%", marginTop: 10 }}>
                        <Icon name="right" size={18} color="black" />
                    </View>
                </View>
                <View style={{ height: "8%", width: "100%" }}>
                    <Text style={{ color: "gray", fontSize: 15, marginLeft: 35 }}>{t('common:choose_data_with_us')}</Text>
                </View>

                <TouchableOpacity onPress={() => logoutConfirmation()}
                    style={{
                        height: 58, alignItems: "center", justifyContent: "center",
                        backgroundColor: "#ED9121", borderRadius: 8, marginTop: 20, marginHorizontal: 24
                    }}>
                    <Text style={{ color: "#FFFF", fontWeight: 'bold', fontSize: 16 }}>{t('common:log_out')}</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}
export default SettingsPageConsumer;