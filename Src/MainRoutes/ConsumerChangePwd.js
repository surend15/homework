import React, { Component, useState, useEffect } from 'react'
import {
    View, Text, DeviceEventEmitter, Image, SafeAreaView,
    TouchableOpacity, Keyboard, ScrollView, Dimensions, TextInput, ActivityIndicator
} from 'react-native'
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
import { useTranslation } from "react-i18next";
import { changePasswordConsumerNew } from '../Service/LoginService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Toast from 'react-native-simple-toast';
import { S3_Icon } from '../../assets/index';
// #ED9121

const ConsumerChangePwd = ({ navigation, props, route }) => {
    const [newpassword, setNewPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [Emailnew, setEmailnew] = useState(route.params?.emailcheck);
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setvisible] = useState(true);
    const [visible1, setvisible1] = useState(true);
    const { t, i18n } = useTranslation()

    useEffect(() => {
        console.log("Change Pwd check ==> ", Emailnew)
    }, []);

    const changePasswordConsumer = () => {
        Keyboard.dismiss();
        console.log("hi");
        setIsLoading(true)
        if (newpassword == "") {
            Toast.show("Please Enter Your Newpassword", Toast.LONG);
            setIsLoading(false)
        } else if (confirmpassword == "") {
            Toast.show("Please Enter Your Confirmpassword", Toast.LONG);
            setIsLoading(false)
        } else if (newpassword != confirmpassword) {
            Toast.show("Password Wrong", Toast.LONG);
            setIsLoading(false)
        }
        else {
            setIsLoading(true)
            let inputJson = {
                "email": Emailnew,
                "password": newpassword,
                "confirmpassword": confirmpassword
            }
            changePasswordConsumerNew(inputJson).then((result) => {
                setIsLoading(false)
                let responseJson = result;
                console.log("Success response login ==> ", JSON.stringify(responseJson.data))
                if (responseJson.data.success == true) {
                    setIsLoading(false)
                    navigation.replace('ConsumerChangePwdSuccess');
                    Toast.show(responseJson.data.message, Toast.LONG);
                } else {
                    setIsLoading(false)
                    Toast.show(responseJson.data.message, Toast.LONG);
                }
            })
        }
    }
    return (
        <SafeAreaView>
            <ScrollView keyboardShouldPersistTaps={'handled'}>
                <View style={{ height: Height, width: Width, flex: 1, backgroundColor: "#FFFFFF", }}>
                    <View style={{ height: "7%", width: Width, marginLeft: 20, flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}
                            style={{ flex: 0.15, alignItems: "center", justifyContent: 'center' }}>
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
                        </TouchableOpacity>
                        <View style={{ flex: 0.5, justifyContent: 'center', paddingLeft: 10 }}>
                            <S3_Icon width={40} height={40} />
                        </View>
                    </View>

                    <View style={{ height: '93%', margin: 20 }}>
                        <View style={{ height: '5%', width: "100%", }}>
                            <Text style={{ fontSize: 25, color: 'black', fontWeight: "bold" }}>{t('common:Createnew')}</Text>
                        </View>

                        <View style={{
                            height: '10%', width: "100%",
                            justifyContent: 'center'
                        }}>
                            <Text style={{ fontSize: 17, color: 'black' }}>{t('common:Create_msg')}</Text>
                        </View>

                        <View style={{ height: "8%", marginTop: 20, margin: 5, }}>
                            <TextInput
                                style={{ height: "100%", width: "100%", backgroundColor: "#f9f9f9", borderRadius: 5, borderColor: "#ededed", borderWidth: 1, paddingLeft: 10 }}
                                placeholder='     New Password'
                                onChangeText={(e) => setNewPassword(e)}
                                value={newpassword}
                                secureTextEntry={visible}
                            />
                            <View style={{ position: "absolute", right: 7, top: 20 }}>
                                <Ionicons onPress={() => setvisible(!visible)}
                                    name={visible ? "eye-off-outline" : "eye-outline"}
                                    size={24}
                                />
                            </View>
                        </View>

                        <View style={{ height: "8%", marginTop: 10, margin: 5, }}>
                            <TextInput
                                style={{ height: "100%", width: "100%", backgroundColor: "#f9f9f9", borderRadius: 5, borderColor: "#ededed", borderWidth: 1, paddingLeft: 10 }}
                                placeholder='     Confirm Password'
                                onChangeText={(e) => setConfirmPassword(e)}
                                value={confirmpassword}
                                secureTextEntry={visible1}
                            />
                            <View style={{ position: "absolute", right: 7, top: 20 }}>
                                <Ionicons onPress={() => setvisible1(!visible1)}
                                    name={visible1 ? "eye-off-outline" : "eye-outline"}
                                    size={24}
                                />
                            </View>
                        </View>

                        <View>
                            <TouchableOpacity
                                onPress={() => changePasswordConsumer()}
                                style={{ height: 58, alignItems: "center", justifyContent: "center", backgroundColor: "#ED9121", borderRadius: 8, marginTop: 20 }}>
                                <Text style={{ color: "#FFFF", fontWeight: 'bold', fontSize: 16 }}>{t('common:Resetpwd')}</Text>
                            </TouchableOpacity>
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
                        backgroundColor: 'transparent',
                        top: 50
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
export default ConsumerChangePwd;