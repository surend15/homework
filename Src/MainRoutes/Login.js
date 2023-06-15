import React, { Component, useState, useEffect } from 'react'
import {
    View, Text, DeviceEventEmitter, Image, SafeAreaView, TouchableOpacity,
    ActivityIndicator, Share, ScrollView, Dimensions, TextInput, Keyboard, Pressable, StyleSheet,BackHandler
} from 'react-native'
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Login1 } from '../Service/LoginService';
import Toast from 'react-native-simple-toast';
import { S3_Icon } from '../../assets/index';
import { useTranslation } from "react-i18next";

const LANGUAGES = [
    { code: "en", label: "English" },
    { code: "tamil", label: "தமிழ்" },
];


// #ED9121

const Login = ({ navigation }) => {

    const { t, i18n } = useTranslation();
    const selectedLanguageCode = i18n.language;

    const [emailAddress, setemailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [consumerClick, setconsumerClick] = useState(true);
    const [techClick, settechClick] = useState(false);
    const [FirstLaunch, setFirstLaunch] = useState("");
    const[visible,setvisible]=useState(true);

    const setLanguage = (code) => {
        return i18n.changeLanguage(code);
    };

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        // const isFirstLaunch = await AsyncStorage.getItem('alreadyLaunched');
        // console.log('App already launched ====>', isFirstLaunch);
        // setFirstLaunch(isFirstLaunch)
        try {
            const isFirstLaunch = await AsyncStorage.getItem('alreadyLaunched');
            if (isFirstLaunch === null) {
              // First launch detected
              await AsyncStorage.setItem('alreadyLaunched', 'true');
              console.log('First launch detected! ==> ', isFirstLaunch);
              setFirstLaunch(isFirstLaunch)
            } else {
              console.log('App already launched ==> ', isFirstLaunch);
              setFirstLaunch(isFirstLaunch)
            }
          } catch (error) {
            console.log(error);
          }
    }

    const Loginfunction = () => {
        Keyboard.dismiss();
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        setIsLoading(true);

        if (emailAddress == "") {
            Toast.show('Please Enter Your EmailAddress', Toast.LONG);
            setIsLoading(false)
        } else if (reg.test(emailAddress) == false) {
            Toast.show('Invalid Email Address', Toast.LONG);
            setIsLoading(false)
        } else if (password == "") {
            Toast.show('Please Enter Your Password', Toast.LONG);
            setIsLoading(false)
        } else {
            let inputJson = {
                username: emailAddress,
                password: password
            };
            Login1(inputJson).then(async(result) => {
                setIsLoading(false)
                let responseJson = result;
                console.log("Success response login ==> ", JSON.stringify(responseJson.data))
                if (responseJson.data.success == true) {
                    console.log("200")
                    if (responseJson.data.data[0].role == 1) {
                        setemailAddress('');
                        setPassword('');
                        await AsyncStorage.setItem('LoginStatus', 'true');
                        await AsyncStorage.setItem('LoginStatus', 'false');
                        await AsyncStorage.setItem('Customer', true + '');
                        await AsyncStorage.setItem('UserIdConsumer', responseJson.data.data[0].id + '')
                        await AsyncStorage.setItem('UserToken', responseJson.data.data[0].token)
                        await AsyncStorage.setItem('ConsumerName', responseJson.data.data[0].fullname)
                        navigation.replace('CustomerTabs');
                    } else if (responseJson.data.data[0].role == 2) {
                        setemailAddress('');
                        setPassword('');
                        await AsyncStorage.setItem('LoginStatus', 'false');
                        await AsyncStorage.setItem('LoginStatus1', 'true');
                        await AsyncStorage.setItem('UserIdTechnician', responseJson.data.data[0].id + '')
                        await AsyncStorage.setItem('UserToken', responseJson.data.data[0].token)
                        await AsyncStorage.setItem('TechnicianName', responseJson.data.data[0].fullname)
                        await AsyncStorage.setItem('Technician', true + '');
                        navigation.replace('TechnicianTabs');
                    }
                    Toast.show(responseJson.data.message, Toast.LONG);
                }
                // else if (responseJson.data.success == false) {
                //     console.log("400")
                //     Toast.show(responseJson.data.message, Toast.LONG);
                // }
            }).catch((error) => {
                console.log("false----->", error)
                let responseJson = error;
                console.log("Error1----->", responseJson)
                if (responseJson.status == 400) {
                    setIsLoading(false)
                    Toast.show(responseJson.message, Toast.LONG);
                } else {
                    setIsLoading(false)
                    Toast.show(responseJson.message, Toast.LONG);
                }
            });
        }
    }

    const AsConsumer = () => {
        setconsumerClick(true)
        settechClick(false)
    }

    const AsTechnician = () => {
        settechClick(true)
        setconsumerClick(false)
    }

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
                                <Ionicons onPress={()=>navigation.pop()}
                                    size={30}
                                    color="black"
                                    name="chevron-back"
                                />
                            </View>
                        </View>
                        <View style={{ flex: 0.5, justifyContent: 'center', paddingLeft: 10 }}>
                            <S3_Icon width={40} height={40} />
                        </View>
                        <View style={{ flex: 0.3, alignItems: 'center', flexDirection: 'row-reverse', height: '100%', justifyContent: 'space-evenly' }}>
                    
                        <Ionicons size={30} name="location-outline" />
                    </View>
                    </View>


                    <View style={{ flexDirection: 'row',marginLeft: '50%'}}>
                        {/* <Text style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: "black",
                            paddingVertical: 4, marginLeft: 20,width : '40%'
                        }}>{t('common:selectlanguage')} : </Text> */}
                        {LANGUAGES.map((language) => {
                            const selectedLanguage = language.code === selectedLanguageCode;
                            return (
                                <View style={{
                                    marginLeft: 5,
                                    width: '40%', justifyContent: 'center',
                                    alignItems: 'center', borderWidth: 1, borderColor: 'black'
                                }}>
                                    <Pressable
                                        key={language.code}
                                        style={styles.buttonContainer}
                                        disabled={selectedLanguage}
                                        onPress={() => setLanguage(language.code)}

                                    >
                                        <Text
                                            style={[selectedLanguage ? styles.selectedText : styles.text]}
                                        >
                                            {language.label}
                                        </Text>
                                    </Pressable>
                                </View>
                            );
                        })}
                    </View>


                    <View style={{ height: '93%', margin: 20 }}>
                        <View style={{ height: '5%' }}>
                            { FirstLaunch ?
                            <Text style={{ fontSize: 23, color: 'black', fontWeight: "bold" }}>
                                {t('common:welcome')}</Text>
                                :
                                <Text style={{ fontSize: 23, color: 'black', fontWeight: "bold" }}>
                                Welcome!</Text>
                                }
                        </View>

                        <View style={{
                            height: "5%", marginTop: 10, width: Width,
                            marginLeft: -20, flexDirection: 'row',
                        }}>
                            <TouchableOpacity style={{
                                width: '50%', height: '100%',
                                justifyContent: 'center', alignItems: 'center', borderRightColor: '#000000',
                                borderRightWidth: 0.5, borderBottomColor: consumerClick == true ? '#FA9B09' : '#000000',
                                borderBottomWidth: 0.8
                            }} onPress={() => AsConsumer()}>
                                <Text style={{ fontSize: 15, color: consumerClick == true ? '#FA9B09' : '#1E232C' }}>
                                {t('common:selectconsumer')}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                width: '50%', height: '100%',
                                justifyContent: 'center', alignItems: 'center', borderRightColor: '#000000',
                                borderRightWidth: 0.5, borderBottomColor: techClick == true ? '#FA9B09' : '#000000',
                                borderBottomWidth: 0.8
                            }} onPress={() => AsTechnician()}>
                                <Text style={{ fontSize: 15, color: techClick == true ? '#FA9B09' : '#1E232C' }}>
                                {t('common:selecttech')}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: "8%", marginTop: 20, margin: 5, }}>
                            {consumerClick == true ?
                                <TextInput
                                    style={{ height: "100%", width: "100%", backgroundColor: "#f9f9f9", borderRadius: 5, borderColor: "#ededed", borderWidth: 1, paddingLeft: 10 }}
                                    placeholder='     Enter your email'
                                    onChangeText={emailAddress => setemailAddress(emailAddress)}
                                    value={emailAddress}
                                />
                                :
                                <TextInput
                                    style={{ height: "100%", width: "100%", backgroundColor: "#f9f9f9", borderRadius: 5, borderColor: "#ededed", borderWidth: 1, paddingLeft: 10 }}
                                    placeholder='     Enter your Technician ID'
                                    onChangeText={emailAddress => setemailAddress(emailAddress)}
                                    value={emailAddress}
                                />
                            }
                        </View>
                        <View style={{ height: "8%", marginTop: 10, margin: 5, flexDirection: 'row' }}>
                            <TextInput
                                style={{ height: "100%", width: "100%", backgroundColor: "#f9f9f9", borderRadius: 5, borderColor: "#ededed", borderWidth: 1, paddingLeft: 10 }}
                                placeholder='     Enter your password'
                                onChangeText={password => setPassword(password)}
                                value={password}
                                secureTextEntry={visible}
                                
                            />
                            <View style={{ position: "absolute", right: 7, top: 20 }}>
                                <Ionicons onPress={()=>setvisible(!visible)}
                                    name={visible ? "eye-off-outline" :"eye-outline" }
                                    size={24}
                                />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('ConsumerForgetPage')}
                            style={{
                                flexDirection: 'row-reverse', height: "5%", alignItems: "center",
                            }}>
                            <Text style={{ color: 'grey', fontWeight: "bold", fontSize: 16 }}>{t('common:forgetpwd')}?</Text>
                        </TouchableOpacity>

                        <View>
                            <TouchableOpacity onPress={() =>
                                Loginfunction()
                                // navigation.navigate('CustomerTabs')
                            }
                                style={{
                                    height: 58, alignItems: "center", justifyContent: "center",
                                    backgroundColor: "#ED9121", borderRadius: 8, marginTop: 5
                                }}>
                                <Text style={{ color: "#FFFF", fontWeight: 'bold', fontSize: 16 }}>{t('common:loginclick')}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ height: "12%", flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: "35%", borderWidth: 0.5, borderColor: "#D3D3D3" }} />
                            <Text style={{ color: 'black', width: '30%', textAlign: "center" }}>{t('common:orloginwith')}</Text>
                            <View style={{ width: "35%", borderWidth: 0.5, borderColor: "#D3D3D3" }} />
                        </View>
                        <View style={{
                            flexDirection: "row", justifyContent: 'space-between', height: "7%",
                            marginTop: -20
                        }}>
                            <View style={{ flex: 0.47, borderWidth: 0.5, borderColor: "#D3D3D3", borderRadius: 8, alignItems: "center", justifyContent: "center" }}>
                                <Image
                                    style={{ height: "50%", width: "40%" }}
                                    resizeMode='contain'
                                    source={require('../../assets/facebook.png')}
                                />
                            </View>
                            <View style={{ flex: 0.47, borderWidth: 0.5, borderColor: "#D3D3D3", borderRadius: 8, alignItems: "center", justifyContent: "center" }}>
                                <Image
                                    style={{ height: "50%", width: "40%" }}
                                    resizeMode='contain'
                                    source={require('../../assets/Google.png')}
                                />
                            </View>

                        </View>
                        <View
                            style={{
                                height: "7%", marginTop: 10,
                                alignItems: "center", justifyContent: "center", flexDirection: 'row'
                            }}>

                            <Text style={{ fontSize: 15, color: 'black' }}>{t('common:dontacc')} </Text>
                            <TouchableOpacity onPress={() => {
                                setemailAddress(''),
                                setPassword(''),
                                navigation.navigate('Registration')
                                }}>
                                <Text style={{ fontSize: 15, color: '#ED9121', }}>
                                {t('common:regsnow')}</Text>
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
export default Login;


const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        color: "#000",
        paddingVertical: 4,
    },
    selectedText: {
        fontSize: 18,
        fontWeight: "600",
        color: "tomato",
        paddingVertical: 4,
    },
});